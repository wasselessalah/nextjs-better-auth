/**
 * In-memory sliding-window rate limiter.
 *
 * Works per Node.js process — suitable for single-instance deployments.
 * For multi-instance / serverless, swap the store for Redis / Upstash.
 */

interface RateLimitEntry {
  timestamps: number[];
}

// Global store — persists across requests within the same process.
const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  /** Max number of requests allowed in the window. */
  limit: number;
  /** Window duration in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Remaining requests in the current window. */
  remaining: number;
  /** When the oldest entry expires (ms since epoch). Used for Retry-After. */
  resetAt: number;
}

export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const entry = store.get(key) ?? { timestamps: [] };

  // Evict timestamps outside the current window (sliding window)
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  const allowed = entry.timestamps.length < config.limit;

  if (allowed) {
    entry.timestamps.push(now);
    store.set(key, entry);
  }

  const oldest = entry.timestamps[0] ?? now;
  const resetAt = oldest + config.windowMs;
  const remaining = Math.max(0, config.limit - entry.timestamps.length);

  return { allowed, remaining, resetAt };
}
