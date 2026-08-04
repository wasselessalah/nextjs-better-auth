"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";

export interface UpdatePasswordState {
  success: boolean;
  message: string;
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
): Promise<UpdatePasswordState> {
  try {
    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      return { success: false, message: "Not authenticated." };
    }

    // Change password — keep current session active
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      },
    });

    // Explicitly log the password change in security activity
    try {
      const db = await connectDB();
      await db.collection("securityActivity").insertOne({
        userId: currentSession.user.id,
        type: "password_change",
        ipAddress: currentSession.session.ipAddress ?? null,
        userAgent: currentSession.session.userAgent ?? null,
        createdAt: new Date(),
      });
    } catch (logError) {
      // Non-critical — never block the response
      console.error("securityActivity password_change insert failed:", logError);
    }

    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update password.",
    };
  }
}