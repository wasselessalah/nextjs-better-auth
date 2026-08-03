"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function revokeAllSessions() {
  try {
    await auth.api.revokeOtherSessions({
      headers: await headers(),
    });

    revalidatePath("/settings/security");

    return {
      success: true,
      message: "Signed out from all other devices.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to sign out from other devices.",
    };
  }
}