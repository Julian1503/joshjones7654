import { NextRequest, NextResponse } from 'next/server'
import { getDetectedGamesFromYoutube } from '@/lib/youtube/youtube-games.service'
import {
    DEFAULT_YOUTUBE_HANDLE,
    type YoutubeGamesResponse,
} from '@/lib/youtube/youtube.types'
import {
    getFreshCachedPayload,
    isQuotaExceededError,
    jsonOkWithCacheControl,
    QUOTA_COOLDOWN_MS,
} from '@/lib/api/youtube-route-cache'

export const revalidate = 1800

const FALLBACK_MAX_AGE_MS = 3 * 60 * 60 * 1000

const gamesCache = new Map<string, { payload: YoutubeGamesResponse; cachedAt: number }>()
const quotaCooldownByHandle = new Map<string, number>()

export async function GET(request: NextRequest) {
    const handle = request.nextUrl.searchParams.get('handle') ?? DEFAULT_YOUTUBE_HANDLE
    const now = Date.now()

    const cooldownUntil = quotaCooldownByHandle.get(handle) ?? 0
    if (cooldownUntil > now) {
        const fallback = getFreshFallback(handle)
        if (fallback) {
            return jsonOk({
                ...fallback,
                isDegraded: true,
                degradedReason: 'quotaExceeded',
                message: 'Showing cached game insights while YouTube quota resets.',
            })
        }
    }

    try {
        const payload = await getDetectedGamesFromYoutube({ handle })
        gamesCache.set(handle, { payload, cachedAt: now })
        quotaCooldownByHandle.delete(handle)

        return jsonOk(payload)
    } catch (error) {
        if (isQuotaExceededError(error)) {
            quotaCooldownByHandle.set(handle, now + QUOTA_COOLDOWN_MS)

            const fallback = getFreshFallback(handle)
            if (fallback) {
                return jsonOk({
                    ...fallback,
                    isDegraded: true,
                    degradedReason: 'quotaExceeded',
                    message: 'Showing cached game insights while YouTube quota resets.',
                })
            }

            return jsonOk({
                channelHandle: handle,
                generatedAt: new Date().toISOString(),
                games: [],
                isDegraded: true,
                degradedReason: 'quotaExceeded',
                message: 'YouTube quota reached. Game insights will return after reset.',
            })
        }

        const fallback = getFreshFallback(handle)
        if (fallback) {
            return jsonOk({
                ...fallback,
                isDegraded: true,
                degradedReason: 'upstreamError',
                message: 'Showing cached game insights due to a temporary YouTube error.',
            })
        }

        const message =
            error instanceof Error
                ? error.message
                : 'Unexpected error while loading detected games'

        return NextResponse.json({ message }, { status: 500 })
    }
}

function getFreshFallback(handle: string): YoutubeGamesResponse | null {
    return getFreshCachedPayload({
        cache: gamesCache,
        maxAgeMs: FALLBACK_MAX_AGE_MS,
        primaryKey: handle,
    })
}

function jsonOk(payload: YoutubeGamesResponse) {
    return jsonOkWithCacheControl(payload, 'public, s-maxage=120, stale-while-revalidate=600')
}

