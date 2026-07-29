import { NextRequest, NextResponse } from "next/server";
import { generateOTP, hashOTP } from "@/lib/auth/generateOtp";
import { sendVerificationEmail } from "@/lib/email/send-verification";

import { connectDB } from "@/lib/db";

const db = await connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const users = db.collection("user");

    const user = await users.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already verified",
        },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    const hashedOtp = hashOTP(otp);

    await users.updateOne(
      {
        email,
      },
      {
        $set: {
          verificationOtp: hashedOtp,
          verificationOtpExpires: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      }
    );

    await sendVerificationEmail(email, otp);

    return NextResponse.json({
      success: true,
      message: "Verification email sent.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}