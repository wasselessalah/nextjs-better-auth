import { auth } from "@/lib/auth/auth";
import { rateLimit } from "@/lib/rate-limiter";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMITED_PATHS = [
  "/api/auth/sign-in/email",
  "/api/auth/two-factor/verify-totp",
  "/api/auth/two-factor/verify-backup-code",
];

/** 5 attempts per IP per 15 minutes */
const RATE_LIMIT_CONFIG = {
  limit: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

const { GET, POST: betterAuthPOST } = toNextJsHandler(auth);

async function POST(req: NextRequest) {
  const url = new URL(req.url);

  if (RATE_LIMITED_PATHS.includes(url.pathname)) {
    // Prefer the real client IP forwarded by proxies, fall back to direct IP.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    // Use a separate rate limit bucket for 2FA
    const limitKey = url.pathname.includes("two-factor") 
      ? `2fa:${ip}` 
      : `login:${ip}`;

    const { allowed, remaining, resetAt } = rateLimit(
      limitKey,
      RATE_LIMIT_CONFIG
    );

    if (!allowed) {
      const retryAfterSeconds = Math.ceil((resetAt - Date.now()) / 1000);

      return NextResponse.json(
        {
          error: "Too many attempts. Please try again later.",
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
            "X-RateLimit-Limit": String(RATE_LIMIT_CONFIG.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
          },
        }
      );
    }

    // Attach remaining count as a header even when the request is allowed.
    const response = await betterAuthPOST(req);
    response.headers.set("X-RateLimit-Limit", String(RATE_LIMIT_CONFIG.limit));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set(
      "X-RateLimit-Reset",
      String(Math.ceil(resetAt / 1000))
    );
    return response;
  }

  return betterAuthPOST(req);
}

export { GET, POST };