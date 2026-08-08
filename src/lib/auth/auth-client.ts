import { createAuthClient } from "better-auth/react";
import { twoFactorClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  plugins: [
    twoFactorClient({
      twoFactorPage: "/verify-2fa",
    }),
    adminClient(),
  ],
});

export const { signIn, signUp, signOut, useSession, twoFactor } = authClient;