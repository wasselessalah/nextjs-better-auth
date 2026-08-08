"use client";

import { signIn } from "@/lib/auth/auth-client";

interface EmailSignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface EmailSignInResult {
  redirectTo: string;
}

export async function emailSignIn({
  email,
  password,
  rememberMe,
}: EmailSignInPayload): Promise<EmailSignInResult> {
  const result = await signIn.email({
    email,
    password,
    rememberMe,
  });

  if (result.error) {
    throw new Error(
      result.error.message || "Invalid email or password."
    );
  }

  // Check if 2FA is required
  if ((result.data as any)?.twoFactorRedirect) {
    return {
      redirectTo: "/verify-2fa",
    };
  }

  const user = result.data?.user;

  if (!user) {
    throw new Error("Unable to retrieve user session.");
  }

  if (!user.emailVerified) {
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(
        data.message || "Failed to send verification email."
      );
    }

    return {
      redirectTo: `/verify-email?email=${encodeURIComponent(
        user.email
      )}`,
    };
  }

  return {
    redirectTo: "/dashboard",
  };
}