import { NextRequest, NextResponse } from 'next/server'
import { getLatestYoutubeVideos } from '@/lib/youtube/youtube.service'
import {
    DEFAULT_MAX_RESULTS,
    DEFAULT_YOUTUBE_HANDLE,
    YOUTUBE_REVALIDATE_SECONDS,
} from '@/lib/youtube/youtube.types'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl

        const handle = searchParams.get('handle') ?? DEFAULT_YOUTUBE_HANDLE
        const maxResults = parseMaxResults(searchParams.get('maxResults'))
        // undefined means "first page"; any non-empty string is a real YouTube page token
        const pageToken = searchParams.get('pageToken') ?? undefined

        const { videos, nextPageToken, totalVideoCount } = await getLatestYoutubeVideos({
            handle,
            maxResults,
            pageToken,
        })

        return NextResponse.json(
            {
                channelHandle: handle,
                count: videos.length,
                totalVideoCount,
                nextPageToken: nextPageToken ?? null,
                videos,
            },
            { status: 200 }
        )
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unexpected error while loading YouTube videos'

        return NextResponse.json({ message }, { status: 500 })
    }
}

function parseMaxResults(value: string | null): number {
    const parsed = Number(value)
    if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_MAX_RESULTS
    return Math.min(parsed, 20)
}
