import { maskEmail } from "../../../utils/mask-email";
interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export async function forgotPassword(
  email: string
): Promise<ForgotPasswordResult> {
  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          data.message || "Failed to send verification code.",
      };
    }

    return {
      success: true,
      message: `We've sent a 6-digit verification code to ${maskEmail(
        email
      )}. Please check your inbox and spam folder.`,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}