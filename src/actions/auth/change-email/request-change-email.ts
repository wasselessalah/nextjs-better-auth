"use server";

import { headers } from "next/headers";

export interface RequestChangeEmailState {
  success: boolean;
  message: string;
}

export async function requestChangeEmail(
  newEmail: string,
  currentPassword: string
): Promise<RequestChangeEmailState> {
  try {
    const reqHeaders = await headers();
    const cookie = reqHeaders.get("cookie") || "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/change-email/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
        },
        body: JSON.stringify({ newEmail, currentPassword }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      message:
        data.message ??
        (response.ok
          ? "Verification code sent to your new email."
          : "Failed to send verification code."),
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
