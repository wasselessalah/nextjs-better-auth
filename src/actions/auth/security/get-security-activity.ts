"use server";

import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db";

export type ActivityType = "sign_in" | "sign_out" | "password_change";

export interface SecurityActivityEntry {
  id: string;
  type: ActivityType;
  browser: string;
  os: string;
  device: "desktop" | "mobile" | "tablet";
  ip: string;
  createdAt: string;
  rawDate: string; // ISO string for grouping
}

export interface SecurityActivityResult {
  success: boolean;
  activities: SecurityActivityEntry[];
  total: number;
  signInCount: number;
  signOutCount: number;
  passwordChangeCount: number;
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
function parseActivity(doc: any): SecurityActivityEntry {
  const ua = new UAParser(doc.userAgent ?? "");

  const browserName = ua.getBrowser().name ?? "Unknown";
  const browserVersion = ua.getBrowser().version ?? "";
  const browser =
    doc.type === "password_change"
      ? "—"
      : browserVersion
      ? `${browserName} ${browserVersion.split(".")[0]}`
      : browserName;

  const osName = ua.getOS().name ?? "Unknown";
  const osVersion = ua.getOS().version ?? "";
  const os =
    doc.type === "password_change"
      ? "—"
      : osVersion
      ? `${osName} ${osVersion}`
      : osName;

  const deviceType = ua.getDevice().type ?? "desktop";
  const device = (
    ["mobile", "tablet"].includes(deviceType) ? deviceType : "desktop"
  ) as "desktop" | "mobile" | "tablet";

  const createdAt =
    doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt);

  return {
    id: doc._id?.toString() ?? doc.id,
    type: doc.type as ActivityType,
    browser,
    os,
    device,
    ip: doc.ipAddress || "Unknown",
    createdAt: formatDate(createdAt),
    rawDate: createdAt.toISOString(),
  };
}

export async function getSecurityActivity(): Promise<SecurityActivityResult> {
  try {
    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession) {
      return {
        success: false,
        activities: [],
        total: 0,
        signInCount: 0,
        signOutCount: 0,
        passwordChangeCount: 0,
      };
    }

    const db = await connectDB();

    const docs = await db
      .collection("securityActivity")
      .find({ userId: currentSession.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    const activities = docs.map(parseActivity);

    return {
      success: true,
      activities,
      total: activities.length,
      signInCount: activities.filter((a) => a.type === "sign_in").length,
      signOutCount: activities.filter((a) => a.type === "sign_out").length,
      passwordChangeCount: activities.filter(
        (a) => a.type === "password_change"
      ).length,
    };
  } catch (error) {
    console.error("getSecurityActivity error:", error);
    return {
      success: false,
      activities: [],
      total: 0,
      signInCount: 0,
      signOutCount: 0,
      passwordChangeCount: 0,
    };
  }
}
