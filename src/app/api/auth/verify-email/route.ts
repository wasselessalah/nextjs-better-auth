import { NextRequest, NextResponse } from "next/server";
import { hashOTP } from "@/lib/auth/generateOtp";


import { connectDB } from "@/lib/db";

const db = await connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        {
          status: 400,
        }
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
        {
          status: 404,
        }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already verified",
        },
        {
          status: 400,
        }
      );
    }

    if (!user.verificationOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "No verification code found",
        },
        {
          status: 400,
        }
      );
    }

    if (
      user.verificationOtpExpires &&
      new Date(user.verificationOtpExpires) < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code expired",
        },
        {
          status: 400,
        }
      );
    }

    const hashedOtp = hashOTP(otp);

    if (hashedOtp !== user.verificationOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        {
          status: 400,
        }
      );
    }

    await users.updateOne(
      {
        email,
      },
      {
        $set: {
          emailVerified: true,
        },
        $unset: {
          verificationOtp: "",
          verificationOtpExpires: "",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
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