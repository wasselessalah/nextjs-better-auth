"use client";

import { signIn } from "@/lib/auth/auth-client";

export async function githubSignIn() {
  await signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
}