import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and new password are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    }

    await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to reset password.",
      },
      {
        status: 500,
      }
    );
  }
}