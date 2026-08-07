import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // 1. Require an authenticated session
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 }
      );
    }

    const { currentPassword } = await req.json();

    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: "Current password is required." },
        { status: 400 }
      );
    }

    // 2. Verify current password by attempting a sign-in check via Better Auth
    try {
      const mutableHeaders = new Headers(reqHeaders);
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
        { success: false, message: "Incorrect password." },
        { status: 401 }
      );
    }

    // 3. Delete user data from all collections
    const db = await connectDB();
    const userId = session.user.id;

    // Remove from all related collections
    // Note: the `user` collection uses ObjectId as _id; the rest store userId as a plain string.
    await Promise.all([
      db.collection("user").deleteOne({ _id: new ObjectId(userId) }),
      db.collection("account").deleteMany({ userId: userId }),
      db.collection("session").deleteMany({ userId: userId }),
      db.collection("loginHistory").deleteMany({ userId: userId }),
      db.collection("securityActivity").deleteMany({ userId: userId }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("Delete account API Error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
