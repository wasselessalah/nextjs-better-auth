"use server";

import { headers, cookies } from "next/headers";

export interface DeleteAccountState {
  success: boolean;
  message: string;
}

export async function deleteAccount(
  currentPassword: string
): Promise<DeleteAccountState> {
  try {
    const reqHeaders = await headers();
    const cookie = reqHeaders.get("cookie") || "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/delete-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
        },
        body: JSON.stringify({ currentPassword }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (response.ok) {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      allCookies.forEach((c) => {
        if (c.name.includes("better-auth")) {
          cookieStore.delete(c.name);
        }
      });
    }

    return {
      success: response.ok,
      message:
        data.message ??
        (response.ok
          ? "Account deleted successfully."
          : "Account deletion failed."),
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
