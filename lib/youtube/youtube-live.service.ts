import {
    DEFAULT_YOUTUBE_HANDLE,
    YOUTUBE_API_BASE_URL,
    YoutubeLiveStream,
    YoutubeSearchResponse,
    YoutubeVideosListResponse,
} from '@/lib/youtube/youtube.types'
import { assertEnv, buildYoutubeWatchUrl, pickBestThumbnail } from '@/lib/youtube/youtube.utils'
import { fetchYoutube, getChannelInfo } from '@/lib/youtube/youtube.service'

interface GetLiveStreamParams {
    handle?: string
}

/**
 * Checks whether the given channel is currently broadcasting live.
 * Uses 2 API quota units:
 *   1 × search.list (eventType=live)   — 100 units
 *   1 × videos.list (liveStreamingDetails) — 1 unit   (only if live)
 *
 * The route sets revalidate=60 so Next.js caches the response for 60 s,
 * keeping quota usage reasonable even with many visitors.
 */

const OFFLINE_TTL_MS = 15 * 60 * 1000
const LIVE_TTL_MS = 60 * 1000
const CHANNEL_TTL_MS = 24 * 60 * 60 * 1000

const liveCache = new Map<
    string,
    {
        data: YoutubeLiveStream
        checkedAt: number
    }
>()

const channelCache = new Map<
    string,
    {
        channelId: string
        uploadsPlaylistId: string
        totalVideoCount: number
        cachedAt: number
    }
>()

export async function getLiveStream(
    params: GetLiveStreamParams = {}
): Promise<YoutubeLiveStream> {
    const apiKey = assertEnv(process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY')
    const handle = params.handle ?? DEFAULT_YOUTUBE_HANDLE

    const cachedLive = liveCache.get(handle)
    if (cachedLive) {
        const ttl = cachedLive.data.isLive ? LIVE_TTL_MS : OFFLINE_TTL_MS
        if (Date.now() - cachedLive.checkedAt < ttl) {
            return cachedLive.data
        }
    }

    try {
        const channelInfo = await getCachedChannelInfo({ apiKey, handle })
        const { channelId } = channelInfo

        const searchUrl = new URL(`${YOUTUBE_API_BASE_URL}/search`)
        searchUrl.searchParams.set('part', 'id,snippet')
        searchUrl.searchParams.set('channelId', channelId)
        searchUrl.searchParams.set('eventType', 'live')
        searchUrl.searchParams.set('type', 'video')
        searchUrl.searchParams.set('maxResults', '1')
        searchUrl.searchParams.set('key', apiKey)

        const searchResponse = await fetchYoutube<YoutubeSearchResponse>(searchUrl.toString())
        const liveItem = searchResponse.items?.[0]

        if (!liveItem?.id?.videoId || liveItem.snippet?.liveBroadcastContent !== 'live') {
            const result = notLive()
            liveCache.set(handle, { data: result, checkedAt: Date.now() })
            return result
        }

        const videoId = liveItem.id.videoId

        const detailsUrl = new URL(`${YOUTUBE_API_BASE_URL}/videos`)
        detailsUrl.searchParams.set('part', 'liveStreamingDetails,snippet')
        detailsUrl.searchParams.set('id', videoId)
        detailsUrl.searchParams.set('key', apiKey)

        const detailsResponse = await fetchYoutube<YoutubeVideosListResponse>(detailsUrl.toString())
        const details = detailsResponse.items?.[0]

        const result: YoutubeLiveStream = {
            isLive: true,
            videoId,
            title: liveItem.snippet?.title ?? null,
            thumbnail: pickBestThumbnail(liveItem.snippet?.thumbnails, videoId),
            startedAt: details?.liveStreamingDetails?.actualStartTime ?? null,
            watchUrl: buildYoutubeWatchUrl(videoId),
            concurrentViewers: details?.liveStreamingDetails?.concurrentViewers ?? null,
        }

        liveCache.set(handle, { data: result, checkedAt: Date.now() })
        return result
    } catch (error) {
        if (isQuotaExceededError(error)) {
            const fallback = liveCache.get(handle)?.data ?? notLive()
            return fallback
        }

        throw error
    }
}

async function getCachedChannelInfo({
                                        apiKey,
                                        handle,
                                    }: {
    apiKey: string
    handle: string
}) {
    const cached = channelCache.get(handle)

    if (cached && Date.now() - cached.cachedAt < CHANNEL_TTL_MS) {
        return cached
    }

    const fresh = await getChannelInfo({ apiKey, handle })

    const value = {
        ...fresh,
        cachedAt: Date.now(),
    }

    channelCache.set(handle, value)
    return value
}

function isQuotaExceededError(error: unknown): boolean {
    return (
        error instanceof Error &&
        /quota/i.test(error.message)
    )
}

function notLive(): YoutubeLiveStream {
    return {
        isLive: false,
        videoId: null,
        title: null,
        thumbnail: null,
        startedAt: null,
        watchUrl: null,
        concurrentViewers: null,
    }
}