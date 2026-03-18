export interface LiveStreamData {
    isLive: boolean
    videoId: string | null
    title: string | null
    thumbnail: string | null
    startedAt: string | null
    watchUrl: string | null
    concurrentViewers: string | null
}