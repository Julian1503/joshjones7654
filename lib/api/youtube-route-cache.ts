import { NextResponse } from 'next/server'

export const QUOTA_COOLDOWN_MS = 15 * 60 * 1000

export type TimedPayload<T> = {
    payload: T
    cachedAt: number
}

export function isQuotaExceededError(error: unknown): boolean {
    return error instanceof Error && /quota/i.test(error.message)
}

export function jsonOkWithCacheControl<T>(payload: T, cacheControl: string): NextResponse {
    return NextResponse.json(payload, {
        status: 200,
        headers: {
            'Cache-Control': cacheControl,
        },
    })
}

export function getFreshCachedPayload<T>({
    cache,
    maxAgeMs,
    primaryKey,
    predicate,
}: {
    cache: Map<string, TimedPayload<T>>
    maxAgeMs: number
    primaryKey?: string
    predicate?: (key: string, value: TimedPayload<T>) => boolean
}): T | null {
    const now = Date.now()

    if (primaryKey) {
        const primary = cache.get(primaryKey)
        if (primary && now - primary.cachedAt <= maxAgeMs) {
            return primary.payload
        }
    }

    if (!predicate) {
        return null
    }

    for (const [key, value] of cache.entries()) {
        if (!predicate(key, value)) continue
        if (now - value.cachedAt > maxAgeMs) continue
        return value.payload
    }

    return null
}

