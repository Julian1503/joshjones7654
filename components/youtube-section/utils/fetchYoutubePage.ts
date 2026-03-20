import { PAGE_SIZE, YOUTUBE_HANDLE, type YoutubeLatestResponse } from '@/components/youtube-section/types'
import { fetchJson } from '@/lib/api/fetch-json'

export async function fetchYoutubePage(
    pageToken?: string
): Promise<YoutubeLatestResponse> {
    const params = new URLSearchParams({
        handle: YOUTUBE_HANDLE,
        maxResults: String(PAGE_SIZE),
    })

    if (pageToken) {
        params.set('pageToken', pageToken)
    }

    return fetchJson<YoutubeLatestResponse>(
        `/api/youtube/latest?${params.toString()}`,
        'Failed to fetch YouTube videos'
    )
}