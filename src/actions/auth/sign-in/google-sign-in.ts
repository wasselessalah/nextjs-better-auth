"use client";

import { signIn } from "@/lib/auth/auth-client";

export async function googleSignIn() {
  await signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
}