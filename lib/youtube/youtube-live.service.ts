import {
    DEFAULT_YOUTUBE_HANDLE,
    YOUTUBE_API_BASE_URL,
    YoutubeLiveStream,
    YoutubeSearchResponse,
    YoutubeVideosListResponse,
} from './youtube.types'
import { assertEnv, buildYoutubeWatchUrl, pickBestThumbnail } from './youtube.utils'
import { fetchYoutube, getChannelInfo } from './youtube.service'

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
export async function getLiveStream(
    params: GetLiveStreamParams = {}
): Promise<YoutubeLiveStream> {
    const apiKey = assertEnv(process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY')
    const handle = params.handle ?? DEFAULT_YOUTUBE_HANDLE

    // 1. Resolve the stable channel ID (UCxxxxxxxx)
    const { channelId } = await getChannelInfo({ apiKey, handle })

    // 2. Search for an active live broadcast on this channel
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
        return notLive()
    }

    const videoId = liveItem.id.videoId

    // 3. Fetch live streaming details (viewer count, actual start time)
    const detailsUrl = new URL(`${YOUTUBE_API_BASE_URL}/videos`)
    detailsUrl.searchParams.set('part', 'liveStreamingDetails,snippet')
    detailsUrl.searchParams.set('id', videoId)
    detailsUrl.searchParams.set('key', apiKey)

    const detailsResponse = await fetchYoutube<YoutubeVideosListResponse>(detailsUrl.toString())
    const details = detailsResponse.items?.[0]

    const concurrentViewers =
        details?.liveStreamingDetails?.concurrentViewers ?? null

    return {
        isLive: true,
        videoId,
        title: liveItem.snippet?.title ?? null,
        thumbnail: pickBestThumbnail(liveItem.snippet?.thumbnails, videoId),
        startedAt: details?.liveStreamingDetails?.actualStartTime ?? null,
        watchUrl: buildYoutubeWatchUrl(videoId),
        concurrentViewers,
    }
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
