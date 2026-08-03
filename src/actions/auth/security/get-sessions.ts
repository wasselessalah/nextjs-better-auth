"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function getSessions() {
  try {
    const result = await auth.api.listSessions({
      headers: await headers(),
    });

    console.log("===== SESSIONS =====");
    console.dir(result, { depth: null });
    console.log("====================");

    return {
      success: true,
      sessions: result,
    };
  } catch (error) {
    console.error("listSessions error:", error);

    return {
      success: false,
      sessions: [],
    };
  }
}