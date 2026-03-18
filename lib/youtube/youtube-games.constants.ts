export const GAMES_SCAN_LIMIT = 30
export const CATALOG_CONFIDENCE_THRESHOLD = 0.72

export const GAME_NAME_ALIASES: Record<string, string> = {
    'gta 5': 'Grand Theft Auto V',
    gta5: 'Grand Theft Auto V',
    'Gtav': 'Grand Theft Auto V',
    'Gta V': 'Grand Theft Auto V',
    'gta v': 'Grand Theft Auto V',
    warzone: 'Call of Duty: Warzone',
    'cod warzone': 'Call of Duty: Warzone',
    cs2: 'Counter-Strike 2',
    'cs go': 'Counter-Strike 2',
    csgo: 'Counter-Strike 2',
    'A Quiet Place': 'A Quiet Place: The Road Ahead'
}

export const GAME_CANDIDATE_BLACKLIST = new Set([
    'josh',
    'joshua',
    'reaction',
    'reactions',
    'live',
    'stream',
    'streams',
    'shorts',
    'video',
    'episode',
    'vlog',
    'setup',
    'gaming',
    'gameplay',
    'playthrough',
    'walkthrough',
    'highlights',
    'update',
    'new',
    'today',
    'ps5',
    'ps5live',
    'Ps5share',
    'playstation',
    'sony',
    'interactive',
    'entertainment',
    'like',
    'likes',
    'comment',
    'comments',
    'share',
    'subscribe',
    'subscribers',
    'official',
    'channel',
    'road',
    'ahead',
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
])

export const GAME_CANDIDATE_PHRASE_BLACKLIST = new Set([
    'sony interactive entertainment',
    'playstation 5',
    'ps5 live',
    'ps5live',
    'Ps5share'
])

export const MANUAL_GAME_OVERRIDES: Record<string, { posterUrl: string | null }> = {
    'grand theft auto v': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900_2x.jpg',
    },
    'call of duty warzone': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1962663/library_600x900_2x.jpg',
    },
    'counter strike 2': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/library_600x900_2x.jpg',
    },
}
