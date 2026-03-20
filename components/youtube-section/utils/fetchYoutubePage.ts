import { PAGE_SIZE, YOUTUBE_HANDLE, type YoutubeLatestResponse } from '@/components/youtube-section/types'

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

    const response = await fetch(`/api/youtube/latest?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store',
    })

    const payload = (await response.json()) as YoutubeLatestResponse | { message?: string }

    if (!response.ok) {
        throw new Error(payload.message ?? 'Failed to fetch YouTube videos')
    }

    return payload as YoutubeLatestResponse
}