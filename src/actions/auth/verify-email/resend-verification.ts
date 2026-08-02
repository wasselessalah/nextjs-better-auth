"use server";

export interface ResendVerificationState {
  success: boolean;
  message: string;
}

export async function resendVerification(
  email: string
): Promise<ResendVerificationState> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/resend-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
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
          ? "Verification code sent."
          : "Failed to resend code."),
    };
  } catch {
    return {
      success: false,
      message: "Unable to resend code.",
    };
  }
}