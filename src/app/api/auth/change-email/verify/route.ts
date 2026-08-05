import { NextRequest, NextResponse } from "next/server";
import { hashOTP } from "@/lib/auth/generateOtp";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { sendEmailChangeNotification } from "@/lib/email/notify-old-email";

const db = await connectDB();

export async function POST(req: NextRequest) {
  try {
    // 1. Require an authenticated session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 }
      );
    }

    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json(
        { success: false, message: "Verification code is required." },
        { status: 400 }
      );
    }

    const users = db.collection("user");

    const user = await users.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // 2. Ensure there is a pending change
    if (!user.pendingEmail || !user.changeEmailOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "No pending email change found. Please start over.",
        },
        { status: 400 }
      );
    }

    // 3. Check expiry
    if (
      user.changeEmailOtpExpires &&
      new Date(user.changeEmailOtpExpires) < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code has expired. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // 4. Validate OTP
    const hashedOtp = hashOTP(otp);

    if (hashedOtp !== user.changeEmailOtp) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code." },
        { status: 400 }
      );
    }

    const newEmail = user.pendingEmail as string;

    // 5. Guard: the new email must still be free (race condition)
    const alreadyTaken = await users.findOne({
      email: newEmail,
      _id: { $ne: user._id },
    });
    if (alreadyTaken) {
      return NextResponse.json(
        { success: false, message: "That email address is no longer available." },
        { status: 409 }
      );
    }

    // 6. Apply the email change
    await users.updateOne(
      { _id: user._id },
      {
        $set: { email: newEmail },
        $unset: {
          pendingEmail: "",
          changeEmailOtp: "",
          changeEmailOtpExpires: "",
        },
      }
    );

    // 7. Notify the old email address about the change
    try {
      await sendEmailChangeNotification(user.email, newEmail);
    } catch (emailError) {
      console.error("Failed to send email change notification:", emailError);
    }

    // 8. Log to security activity (non-critical)
    try {
      await db.collection("securityActivity").insertOne({
        userId: session.user.id,
        type: "email_change",
        ipAddress: session.session.ipAddress ?? null,
        userAgent: session.session.userAgent ?? null,
        createdAt: new Date(),
      });
    } catch (logError) {
      console.error("securityActivity email_change insert failed:", logError);
    }

    return NextResponse.json({
      success: true,
      message: "Your email address has been updated successfully.",
    });
  } catch (error) {
    console.error("[change-email/verify]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
