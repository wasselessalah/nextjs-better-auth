import { NextRequest, NextResponse } from "next/server";
import { generateOTP, hashOTP } from "@/lib/auth/generateOtp";
import { sendChangeEmailOtp } from "@/lib/email/change-email";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

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

    const { newEmail, currentPassword } = await req.json();

    if (!newEmail || !currentPassword) {
      return NextResponse.json(
        { success: false, message: "Missing fields." },
        { status: 400 }
      );
    }

    const users = db.collection("user");

    // 2. Guard: new email must not already be in use
    const existingUser = await users.findOne({ email: newEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "That email address is already in use." },
        { status: 409 }
      );
    }

    // 3. Guard: new email must be different from current
    if (newEmail.toLowerCase() === session.user.email.toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          message: "The new email must be different from your current one.",
        },
        { status: 400 }
      );
    }

    // 4. Verify current password by attempting a sign-in check via Better Auth
    try {
      // Create a mutable copy of headers so BetterAuth can set cookies on it without throwing
      const mutableHeaders = new Headers(await headers());
      await auth.api.signInEmail({
        body: {
          email: session.user.email,
          password: currentPassword,
        },
        headers: mutableHeaders,
        asResponse: false,
      });
    } catch {
      return NextResponse.json(
        { success: false, message: "Incorrect current password." },
        { status: 401 }
      );
    }

    // 5. Generate OTP and store it (hashed) on the user document
    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);

    await users.updateOne(
      { _id: (await users.findOne({ email: session.user.email }))!._id },
      {
        $set: {
          pendingEmail: newEmail,
          changeEmailOtp: hashedOtp,
          changeEmailOtpExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      }
    );

    // 6. Send OTP to the new email address
    await sendChangeEmailOtp(newEmail, otp);

    return NextResponse.json({
      success: true,
      message: "A verification code has been sent to your new email address.",
    });
  } catch (error) {
    console.error("[change-email/request]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
