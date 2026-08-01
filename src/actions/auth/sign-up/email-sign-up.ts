"use client";

import { signUp } from "@/lib/auth/auth-client";

interface EmailSignUpPayload {
  name: string;
  email: string;
  password: string;
}

interface EmailSignUpResult {
  redirectTo: string;
}

export async function emailSignUp({
  name,
  email,
  password,
}: EmailSignUpPayload): Promise<EmailSignUpResult> {
  const result = await signUp.email({
    name,
    email,
    password,
  });

  if (result.error) {
    throw new Error(result.error.message || "Failed to sign up.");
  }

  const response = await fetch("/api/auth/resend-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to send verification email."
    );
  }

  return {
    redirectTo: `/verify-email?email=${encodeURIComponent(email)}`,
  };
}