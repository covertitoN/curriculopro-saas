interface RateLimitEntry { count: number; resetAt: number }
const store = new Map<string, RateLimitEntry>()
if (typeof setInterval !== "undefined") {
  setInterval(() => { const now = Date.now(); for (const [k, e] of store.entries()) { if (e.resetAt < now) store.delete(k) } }, 5 * 60 * 1000)
}
export interface RateLimitConfig { limit: number; window: number }
export const RATE_LIMITS = {
  anonymous: { limit: 3, window: 60 * 60 * 1000 },
  free: { limit: 5, window: 60 * 60 * 1000 },
  pro: { limit: 50, window: 60 * 60 * 1000 },
}
export function rateLimit(identifier: string, config: RateLimitConfig): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const key = `rl:${identifier}`
  const entry = store.get(key)
  if (!entry || entry.resetAt < now) {
    const newEntry: RateLimitEntry = { count: 1, resetAt: now + config.window }
    store.set(key, newEntry)
    return { success: true, remaining: config.limit - 1, resetAt: newEntry.resetAt }
  }
  if (entry.count >= config.limit) return { success: false, remaining: 0, resetAt: entry.resetAt }
  entry.count += 1
  return { success: true, remaining: config.limit - entry.count, resetAt: entry.resetAt }
}
export function getIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  return forwarded ? forwarded.split(",")[0].trim() : "unknown"
}
