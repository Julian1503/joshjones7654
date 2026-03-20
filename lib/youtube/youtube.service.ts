import {
    DEFAULT_MAX_RESULTS,
    DEFAULT_YOUTUBE_HANDLE,
    YOUTUBE_API_BASE_URL,
    YoutubeApiErrorResponse,
    YoutubeChannelListResponse,
    YoutubePlaylistItemsResponse,
    YoutubeVideo,
    YoutubeVideosListResponse,
    YoutubeVideosPage,
} from '@/lib/youtube/youtube.types'
import {
    assertEnv,
    buildYoutubeWatchUrl,
    formatRelativeDate,
    formatViews,
    formatYoutubeDuration,
    inferVideoCategory,
    pickBestThumbnail,
} from '@/lib/youtube/youtube.utils'

interface GetLatestYoutubeVideosParams {
    handle?: string
    maxResults?: number
    pageToken?: string
}

export async function getLatestYoutubeVideos(
    params: GetLatestYoutubeVideosParams = {}
): Promise<YoutubeVideosPage> {
    const apiKey = assertEnv(process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY')
    const handle = params.handle ?? DEFAULT_YOUTUBE_HANDLE
    const maxResults = params.maxResults ?? DEFAULT_MAX_RESULTS

    const { uploadsPlaylistId, totalVideoCount } = await getChannelInfo({ apiKey, handle })

    const { items: playlistItems, nextPageToken } = await getPlaylistItems({
        apiKey,
        playlistId: uploadsPlaylistId,
        maxResults,
        pageToken: params.pageToken,
    })

    const videoIds = playlistItems
        .map((item) => item.contentDetails?.videoId)
        .filter((id): id is string => Boolean(id))

    const videos: YoutubeVideo[] =
        videoIds.length === 0
            ? []
            : await buildVideos({ apiKey, videoIds, playlistItems })

    return { videos, nextPageToken, totalVideoCount }
}

// ─── Shared channel info (also used by live service) ─────────────────────────

export async function getChannelInfo({
    apiKey,
    handle,
}: {
    apiKey: string
    handle: string
}): Promise<{ channelId: string; uploadsPlaylistId: string; totalVideoCount: number }> {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/channels`)
    url.searchParams.set('part', 'id,contentDetails,statistics')
    url.searchParams.set('forHandle', handle)
    url.searchParams.set('key', apiKey)

    const response = await fetchYoutube<YoutubeChannelListResponse>(url.toString())
    const item = response.items?.[0]

    const channelId = item?.id
    const uploadsPlaylistId = item?.contentDetails?.relatedPlaylists?.uploads

    if (!channelId || !uploadsPlaylistId) {
        throw new Error(`Could not resolve channel info for handle: ${handle}`)
    }

    return {
        channelId,
        uploadsPlaylistId,
        totalVideoCount: Number(item?.statistics?.videoCount ?? 0),
    }
}

// ─── Internals ────────────────────────────────────────────────────────────────

async function getPlaylistItems({
    apiKey,
    playlistId,
    maxResults,
    pageToken,
}: {
    apiKey: string
    playlistId: string
    maxResults: number
    pageToken?: string
}): Promise<{
    items: NonNullable<YoutubePlaylistItemsResponse['items']>
    nextPageToken: string | undefined
}> {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/playlistItems`)
    url.searchParams.set('part', 'snippet,contentDetails')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', String(maxResults))
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const response = await fetchYoutube<YoutubePlaylistItemsResponse>(url.toString())

    return {
        items: response.items ?? [],
        nextPageToken: response.nextPageToken ?? undefined,
    }
}

async function buildVideos({
    apiKey,
    videoIds,
    playlistItems,
}: {
    apiKey: string
    videoIds: string[]
    playlistItems: NonNullable<YoutubePlaylistItemsResponse['items']>
}): Promise<YoutubeVideo[]> {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/videos`)
    url.searchParams.set('part', 'contentDetails,statistics')
    url.searchParams.set('id', videoIds.join(','))
    url.searchParams.set('key', apiKey)

    const response = await fetchYoutube<YoutubeVideosListResponse>(url.toString())
    const items = response.items ?? []

    const videosById = new Map(
        items
            .filter((item): item is NonNullable<typeof item> & { id: string } => Boolean(item?.id))
            .map((item) => [item.id, item])
    )

    return playlistItems.flatMap((item) => {
        const videoId = item.contentDetails?.videoId
        const title = item.snippet?.title
        const publishedAt = item.snippet?.publishedAt
        if (!videoId || !title) return []

        const details = videosById.get(videoId)
        return [{
            id: videoId,
            title,
            views: formatViews(details?.statistics?.viewCount),
            duration: formatYoutubeDuration(details?.contentDetails?.duration),
            date: formatRelativeDate(publishedAt),
            category: inferVideoCategory(title),
            thumbnail: pickBestThumbnail(item.snippet?.thumbnails, videoId),
            url: buildYoutubeWatchUrl(videoId),
        }]
    })
}

export async function fetchYoutube<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        next: { revalidate: 600 },
    })
    if (response.ok) return (await response.json()) as T

    const errorBody = (await response.json().catch(() => ({}))) as YoutubeApiErrorResponse
    const message =
        errorBody.error?.message ??
        `YouTube API request failed with status ${response.status}`
    throw new Error(message)
}
