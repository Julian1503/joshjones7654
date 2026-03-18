export const PAGE_SIZE = 6
export const YOUTUBE_HANDLE = '@JoshJones-t4q'

export type VideoCategory = 'Gaming' | 'Personal' | 'Reaction' | 'Setup' | 'Other'

export interface YoutubeVideo {
    id: string
    title: string
    views: string
    duration: string
    date: string
    category: VideoCategory
    thumbnail: string
    url: string
}

export interface YoutubeLatestResponse {
    channelHandle: string
    count: number
    totalVideoCount: number
    nextPageToken: string | null
    videos: YoutubeVideo[]
}