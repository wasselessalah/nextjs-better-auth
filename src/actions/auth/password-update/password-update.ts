"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export interface UpdatePasswordState {
  success: boolean;
  message: string;
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
): Promise<UpdatePasswordState> {
  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
    });

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