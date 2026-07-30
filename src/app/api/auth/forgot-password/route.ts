import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Your code here

    return NextResponse.json({
      success: true,
      message: "Reset email sent.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}