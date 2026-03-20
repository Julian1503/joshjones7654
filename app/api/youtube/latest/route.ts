import { NextRequest, NextResponse } from 'next/server'
import { getLatestYoutubeVideos } from '@/lib/youtube/youtube.service'
import type { YoutubeLatestResponse } from '@/components/youtube-section/types'
import {
    DEFAULT_MAX_RESULTS,
    DEFAULT_YOUTUBE_HANDLE,
} from '@/lib/youtube/youtube.types'

export const revalidate = 600

const QUOTA_COOLDOWN_MS = 15 * 60 * 1000
const FALLBACK_MAX_AGE_MS = 90 * 60 * 1000

const latestCache = new Map<string, { payload: YoutubeLatestResponse; cachedAt: number }>()
const quotaCooldownByHandle = new Map<string, number>()

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl

    const handle = searchParams.get('handle') ?? DEFAULT_YOUTUBE_HANDLE
    const maxResults = parseMaxResults(searchParams.get('maxResults'))
    // undefined means "first page"; any non-empty string is a real YouTube page token
    const pageToken = searchParams.get('pageToken') ?? undefined
    const cacheKey = buildCacheKey({ handle, maxResults, pageToken })

    const now = Date.now()
    const cooldownUntil = quotaCooldownByHandle.get(handle) ?? 0

    if (cooldownUntil > now) {
        const fallback = getFallbackPayload({ handle, cacheKey })
        if (fallback) {
            return jsonOk({
                ...fallback,
                isDegraded: true,
                degradedReason: 'quotaExceeded',
                message: 'Showing cached videos while YouTube quota resets.',
            })
        }
    }

    try {
        const { videos, nextPageToken, totalVideoCount } = await getLatestYoutubeVideos({
            handle,
            maxResults,
            pageToken,
        })

        const payload: YoutubeLatestResponse = {
            channelHandle: handle,
            count: videos.length,
            totalVideoCount,
            nextPageToken: nextPageToken ?? null,
            videos,
            isDegraded: false,
        }

        latestCache.set(cacheKey, { payload, cachedAt: now })
        quotaCooldownByHandle.delete(handle)

        return jsonOk(payload)
    } catch (error) {
        if (isQuotaExceededError(error)) {
            quotaCooldownByHandle.set(handle, now + QUOTA_COOLDOWN_MS)

            const fallback = getFallbackPayload({ handle, cacheKey })
            if (fallback) {
                return jsonOk({
                    ...fallback,
                    isDegraded: true,
                    degradedReason: 'quotaExceeded',
                    message: 'Showing cached videos while YouTube quota resets.',
                })
            }

            // Keep the section alive even if this is the very first request and quota is exhausted.
            return jsonOk({
                channelHandle: handle,
                count: 0,
                totalVideoCount: 0,
                nextPageToken: null,
                videos: [],
                isDegraded: true,
                degradedReason: 'quotaExceeded',
                message: 'YouTube quota reached. Videos will appear again after reset.',
            })
        }

        const fallback = getFallbackPayload({ handle, cacheKey })
        if (fallback) {
            return jsonOk({
                ...fallback,
                isDegraded: true,
                degradedReason: 'upstreamError',
                message: 'Showing cached videos due to a temporary YouTube error.',
            })
        }

        const message =
            error instanceof Error
                ? error.message
                : 'Unexpected error while loading YouTube videos'

        return NextResponse.json({ message }, { status: 500 })
    }
}

function buildCacheKey({
    handle,
    maxResults,
    pageToken,
}: {
    handle: string
    maxResults: number
    pageToken?: string
}): string {
    return `${handle}:${maxResults}:${pageToken ?? 'first'}`
}

function getFallbackPayload({
    handle,
    cacheKey,
}: {
    handle: string
    cacheKey: string
}): YoutubeLatestResponse | null {
    const now = Date.now()

    const primary = latestCache.get(cacheKey)
    if (primary && now - primary.cachedAt <= FALLBACK_MAX_AGE_MS) {
        return primary.payload
    }

    for (const [key, value] of latestCache.entries()) {
        if (!key.startsWith(`${handle}:`)) continue
        if (now - value.cachedAt > FALLBACK_MAX_AGE_MS) continue
        return value.payload
    }

    return null
}

function jsonOk(payload: YoutubeLatestResponse) {
    return NextResponse.json(payload, {
        status: 200,
        headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=300',
        },
    })
}

function isQuotaExceededError(error: unknown): boolean {
    return error instanceof Error && /quota/i.test(error.message)
}

function parseMaxResults(value: string | null): number {
    const parsed = Number(value)
    if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_MAX_RESULTS
    return Math.min(parsed, 20)
}
