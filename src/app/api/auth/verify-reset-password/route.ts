import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { hashOTP } from "@/lib/auth/generateOtp";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    console.log("Email:", email);
    console.log("OTP:", otp);

    const db = await connectDB();

    const passwordReset = await db
      .collection("passwordResets")
      .findOne({ email });

    console.log("Document:", passwordReset);

    if (!passwordReset) {
      return NextResponse.json(
        { message: "No reset record found." },
        { status: 400 }
      );
    }

    console.log("Stored OTP:", passwordReset.otp);
    console.log("Hashed entered OTP:", hashOTP(otp));
    console.log("Expires:", passwordReset.expiresAt);
    console.log("Now:", new Date());

    if (passwordReset.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "OTP expired." },
        { status: 400 }
      );
    }

    if (passwordReset.otp !== hashOTP(otp)) {
      return NextResponse.json(
        { message: "OTP does not match." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}