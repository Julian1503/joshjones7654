export type GamesDataDegradedReason = 'quotaExceeded' | 'upstreamError'

export type GameMention = {
    videoId: string
    videoTitle: string
    videoDate: string
    videoUrl: string
    thumbnail: string
    matchedAlias: string
}

export type JoshGame = {
    id: string
    gameName: string
    mentionCount: number
    posterUrl: string | null
    posterSource: 'catalog' | 'fallback' | 'none'
    latestMention: GameMention | null
    mentions: GameMention[]
}

export type GamesJoshPlaysResponse = {
    channelHandle: string
    generatedAt: string
    games: JoshGame[]
    isDegraded?: boolean
    degradedReason?: GamesDataDegradedReason
    message?: string
}

