import { NextRequest, NextResponse } from 'next/server'
import { getLiveStream } from '@/lib/youtube/youtube-live.service'
import { DEFAULT_YOUTUBE_HANDLE } from '@/lib/youtube/youtube.types'

/**
 * Cache for 60 s — balances freshness with YouTube API quota.
 * The search.list endpoint costs 100 quota units per call, so caching
 * at the CDN/Next.js layer is important.
 */
export const revalidate = 60

export async function GET(request: NextRequest) {
    try {
        const handle =
            request.nextUrl.searchParams.get('handle') ?? DEFAULT_YOUTUBE_HANDLE

        const liveStream = await getLiveStream({ handle })

        return NextResponse.json(liveStream, {
            status: 200,
            headers: {
                // Also set Cache-Control so browsers/CDNs respect it
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            },
        })
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unexpected error while checking live status'

        return NextResponse.json({ message }, { status: 500 })
    }
}