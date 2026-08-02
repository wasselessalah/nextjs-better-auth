"use server";

export interface VerifyEmailState {
  success: boolean;
  message: string;
}

export async function verifyEmail(
  email: string,
  otp: string
): Promise<VerifyEmailState> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      message:
        data.message ??
        (response.ok
          ? "Email verified successfully."
          : "Verification failed."),
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}