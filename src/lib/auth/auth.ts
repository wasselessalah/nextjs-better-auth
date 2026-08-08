import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { twoFactor, admin } from "better-auth/plugins";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UAParser } from "ua-parser-js";

import { connectDB } from "@/lib/db";
import { sendResetPasswordEmail } from "../email/reset-password";
import { sendNewDeviceLoginEmail } from "../email/new-device-login";

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
            const now = new Date();
            const currentUserAgent = session.userAgent ?? null;

            // Check if this device (userAgent) has logged in before
            const existingDevice = currentUserAgent
              ? await database.collection("loginHistory").findOne({
                  userId: session.userId,
                  userAgent: currentUserAgent,
                })
              : null;

            // Persist login history
            await database.collection("loginHistory").insertOne({
              userId: session.userId,
              sessionToken: session.token,
              ipAddress: session.ipAddress ?? null,
              userAgent: currentUserAgent,
              createdAt: session.createdAt ?? now,
            });

            // Persist security activity
            await database.collection("securityActivity").insertOne({
              userId: session.userId,
              type: "sign_in",
              ipAddress: session.ipAddress ?? null,
              userAgent: currentUserAgent,
              createdAt: session.createdAt ?? now,
            });

            // Send new device alert email if this is an unrecognised device
            if (!existingDevice && currentUserAgent) {
              try {
                const userDoc = await database
                  .collection("user")
                  .findOne({ id: session.userId });

                if (userDoc?.email) {
                  const ua = new UAParser(currentUserAgent);
                  const browserName = ua.getBrowser().name ?? "Unknown";
                  const browserVersion = ua.getBrowser().version ?? "";
                  const browser = browserVersion
                    ? `${browserName} ${browserVersion.split(".")[0]}`
                    : browserName;

                  const osName = ua.getOS().name ?? "Unknown";
                  const osVersion = ua.getOS().version ?? "";
                  const os = osVersion ? `${osName} ${osVersion}` : osName;

                  await sendNewDeviceLoginEmail({
                    email: userDoc.email as string,
                    browser,
                    os,
                    ipAddress: session.ipAddress ?? "Unknown",
                    loginAt: session.createdAt ?? now,
                  });
                }
              } catch (emailError) {
                console.error("New device login email failed:", emailError);
              }
            }
          } catch (error) {
            console.error("loginHistory/securityActivity insert failed:", error);
          }
        },
      },
      delete: {
        after: async (session) => {
          try {
            const database = await connectDB();
            await database.collection("securityActivity").insertOne({
              userId: session.userId,
              type: "sign_out",
              ipAddress: session.ipAddress ?? null,
              userAgent: session.userAgent ?? null,
              createdAt: new Date(),
            });
          } catch (error) {
            console.error("securityActivity sign_out insert failed:", error);
          }
        },
      },
    },

  },
  plugins: [
    twoFactor({
      issuer: "better-auth nextjs",
    }),
    admin(),
  ],
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