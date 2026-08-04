import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db";
import { sendResetPasswordEmail } from "../email/reset-password";

const db = await connectDB();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendResetPasswordEmail(user.email, url);
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          try {
            const database = await connectDB();
            await database.collection("loginHistory").insertOne({
              userId: session.userId,
              sessionToken: session.token,
              ipAddress: session.ipAddress ?? null,
              userAgent: session.userAgent ?? null,
              createdAt: session.createdAt ?? new Date(),
            });
          } catch (error) {
            // Non-critical — never block sign-in
            console.error("loginHistory insert failed:", error);
          }
        },
      },
    },
  },
});

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function SignOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}