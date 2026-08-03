"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function revokeSession(token: string) {
  try {
    await auth.api.revokeSession({
      headers: await headers(),
      body: {
        token,
      },
    });

    revalidatePath("/settings/security");

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
}