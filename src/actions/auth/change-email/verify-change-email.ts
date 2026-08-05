"use server";

import { headers } from "next/headers";

export interface VerifyChangeEmailState {
  success: boolean;
  message: string;
}

export async function verifyChangeEmail(
  otp: string
): Promise<VerifyChangeEmailState> {
  try {
    const reqHeaders = await headers();
    const cookie = reqHeaders.get("cookie") || "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/change-email/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
        },
        body: JSON.stringify({ otp }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      message:
        data.message ??
        (response.ok
          ? "Email updated successfully."
          : "Verification failed."),
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
