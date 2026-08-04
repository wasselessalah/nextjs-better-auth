"use server";

import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db";

export interface LoginHistoryEntry {
  id: string;
  browser: string;
  os: string;
  device: "desktop" | "mobile" | "tablet";
  ip: string;
  location: string;
  createdAt: string;
  isCurrent: boolean;
}

export interface LoginHistoryResult {
  success: boolean;
  history: LoginHistoryEntry[];
  total: number;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (diffDays === 0) return `Today • ${time}`;
  if (diffDays === 1) return `Yesterday • ${time}`;

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month} • ${time}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEntry(doc: any, currentToken: string | undefined): LoginHistoryEntry {
  const ua = new UAParser(doc.userAgent ?? "");

  const browserName = ua.getBrowser().name ?? "Unknown";
  const browserVersion = ua.getBrowser().version ?? "";
  const browser = browserVersion
    ? `${browserName} ${browserVersion.split(".")[0]}`
    : browserName;

  const osName = ua.getOS().name ?? "Unknown";
  const osVersion = ua.getOS().version ?? "";
  const os = osVersion ? `${osName} ${osVersion}` : osName;

  const deviceType = ua.getDevice().type ?? "desktop";
  const device = (["mobile", "tablet"].includes(deviceType)
    ? deviceType
    : "desktop") as "desktop" | "mobile" | "tablet";

  const createdAt =
    doc.createdAt instanceof Date
      ? doc.createdAt
      : new Date(doc.createdAt);

  return {
    id: doc._id?.toString() ?? doc.id,
    browser,
    os,
    device,
    ip: doc.ipAddress || "Unknown",
    location: "",
    createdAt: formatDate(createdAt),
    isCurrent: currentToken === doc.sessionToken,
  };
}

export async function getLoginHistory(): Promise<LoginHistoryResult> {
  try {
    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      return { success: false, history: [], total: 0 };
    }

    const db = await connectDB();

    // loginHistory stores userId as a plain string — no ObjectId issue
    const docs = await db
      .collection("loginHistory")
      .find({ userId: currentSession.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    const history = docs.map((doc) =>
      parseEntry(doc, currentSession.session.token)
    );

    return { success: true, history, total: history.length };
  } catch (error) {
    console.error("getLoginHistory error:", error);
    return { success: false, history: [], total: 0 };
  }
}
