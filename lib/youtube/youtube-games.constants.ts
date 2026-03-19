export const GAMES_SCAN_LIMIT = 500
export const CATALOG_CONFIDENCE_THRESHOLD = 0.72

/**
 * Canonical name map.
 * Keys:   lowercase normalized (output of normalizeName())
 * Values: exact canonical display name
 *
 * Any extracted candidate that normalizes to a key here gets remapped
 * before catalog lookup — this is what prevents duplicates.
 */
export const GAME_NAME_ALIASES: Record<string, string> = {
    // ── Grand Theft Auto V ───────────────────────────────────────────────────
    'gta 5':                                'Grand Theft Auto V',
    'gta5':                                 'Grand Theft Auto V',
    'gtav':                                 'Grand Theft Auto V',
    'gta v':                                'Grand Theft Auto V',
    'gta v online':                         'Grand Theft Auto V',
    'gta online':                           'Grand Theft Auto V',
    'grand theft auto':                     'Grand Theft Auto V',
    'grand theft auto online':              'Grand Theft Auto V',
    'grand theft auto v online':            'Grand Theft Auto V',

    // ── GTA Vice City ────────────────────────────────────────────────────────
    'gta vice city':                        'Grand Theft Auto: Vice City',
    'vice city':                            'Grand Theft Auto: Vice City',
    'grand theft auto vice city':           'Grand Theft Auto: Vice City',

    // ── GTA IV ───────────────────────────────────────────────────────────────
    'gta iv':                               'Grand Theft Auto IV',
    'gta 4':                                'Grand Theft Auto IV',
    'grand theft auto 4':                   'Grand Theft Auto IV',

    // ── Call of Duty ─────────────────────────────────────────────────────────
    'warzone':                              'Call of Duty: Warzone',
    'cod warzone':                          'Call of Duty: Warzone',
    'call of duty warzone 2':               'Call of Duty: Warzone',
    'warzone 2':                            'Call of Duty: Warzone',
    'cod mobile':                           'Call of Duty: Mobile',
    'call of duty mobile':                  'Call of Duty: Mobile',
    'black ops 7':                          'Call of Duty: Black Ops 7',
    'cod black ops 7':                      'Call of Duty: Black Ops 7',
    'bo7':                                  'Call of Duty: Black Ops 7',

    // ── Counter-Strike ───────────────────────────────────────────────────────
    'cs2':                                  'Counter-Strike 2',
    'cs go':                                'Counter-Strike 2',
    'csgo':                                 'Counter-Strike 2',
    'counter strike':                       'Counter-Strike 2',
    'counter strike 2':                     'Counter-Strike 2',

    // ── Fortnite ─────────────────────────────────────────────────────────────
    // "Fortnite Battle Royale" is a mode name, not a separate game
    'fortnite battle royale':               'Fortnite',
    'fortnite br':                          'Fortnite',

    // ── Spider-Man ───────────────────────────────────────────────────────────
    // Miles Morales and Remastered are separate games — normalize naming only
    'spider man miles morales':             "Marvel's Spider-Man: Miles Morales",
    'miles morales':                        "Marvel's Spider-Man: Miles Morales",
    'spiderman miles morales':              "Marvel's Spider-Man: Miles Morales",
    // SPIDER-MAN | Miles Morales is how PS5 share labels it
    'spider man miles':                     "Marvel's Spider-Man: Miles Morales",

    'marvels spider man':                   "Marvel's Spider-Man Remastered",
    'spider man remastered':                "Marvel's Spider-Man Remastered",
    'spider man':                           "Marvel's Spider-Man Remastered",
    'spiderman':                            "Marvel's Spider-Man Remastered",

    // ── Watch Dogs ───────────────────────────────────────────────────────────
    'watch dogs legion':                    'Watch Dogs: Legion',
    'watchdogs legion':                     'Watch Dogs: Legion',
    // bare "Watch Dogs" without a subtitle is ambiguous — map to Legion (most recent)
    'watch dogs':                           'Watch Dogs: Legion',
    'watchdogs':                            'Watch Dogs: Legion',

    // ── Yakuza ───────────────────────────────────────────────────────────────
    'yakuza':                               'Yakuza: Like a Dragon',
    'yakuza like a dragon':                 'Yakuza: Like a Dragon',
    'like a dragon':                        'Yakuza: Like a Dragon',
    'iad':                                  'Like a Dragon: Ishin',

    // ── Session ──────────────────────────────────────────────────────────────
    'session':                              'Session: Skate Sim',
    'session skate sim':                    'Session: Skate Sim',
    'skate sim':                            'Session: Skate Sim',

    // ── Lawn Mowing ──────────────────────────────────────────────────────────
    'mowing simulator':                     'Lawn Mowing Simulator',
    'mowing simulator lawn mower':          'Lawn Mowing Simulator',
    'lawn mowing':                          'Lawn Mowing Simulator',

    // ── Need for Speed ───────────────────────────────────────────────────────
    // Bare "Need for Speed" is too generic — map to the title Josh plays most
    'need for speed':                       'Need for Speed Heat',
    'nfs':                                  'Need for Speed Heat',
    'nfs heat':                             'Need for Speed Heat',

    // ── A Quiet Place ────────────────────────────────────────────────────────
    'a quiet place':                        'A Quiet Place: The Road Ahead',

    // ── Forza ────────────────────────────────────────────────────────────────
    'forza':                                'Forza Horizon 5',
    'forza horizon':                        'Forza Horizon 5',
    'fh5':                                  'Forza Horizon 5',
}

/**
 * Individual words that are never valid game candidates.
 * ALL entries must be lowercase — checked against already-normalized strings.
 */
export const GAME_CANDIDATE_BLACKLIST = new Set([
    // Creator / channel noise
    'josh', 'joshua', 'reaction', 'reactions', 'live', 'stream', 'streams',
    'shorts', 'video', 'episode', 'vlog', 'setup', 'channel', 'official',
    'subscribe', 'subscribers', 'like', 'likes', 'comment', 'comments',
    'share', 'youtube', 'sub',

    // Generic gameplay descriptors
    'gaming', 'gameplay', 'playthrough', 'walkthrough', 'highlights',
    'update', 'new', 'today', 'game', 'games', 'play',

    // Platform noise
    'ps5', 'ps5live', 'ps5share', 'playstation', 'sony',
    'interactive', 'entertainment',

    // Words that appeared as false positives
    'road', 'ahead', 'online', 'mowing', 'skate',
    'legion', 'miles', 'kids', 'funny',
    'untitled', 'cev', 'reality', 'marathon',

    // Single-letter / short noise
    'bit', 'hit', 'hd',

    // Months
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
])

/**
 * Multi-word phrases that are never valid game candidates.
 * ALL entries must be lowercase.
 */
export const GAME_CANDIDATE_PHRASE_BLACKLIST = new Set([
    // Platform strings
    'sony interactive entertainment',
    'playstation 5',
    'ps5 live',
    'ps5live',
    'ps5share',

    // Generic terms
    'game play',
    'level up',

    // "Call of Duty" alone is too generic — only specific sub-titles are valid
    'call of duty',

    // Confirmed false positives from observed output
    'please state your name',
    'running out of space time',
    'subscriber clicker',
    'sub sub sub',
    'sub sub sub 2 sub sub sub sub',
    'look at me',
    'funky punch free style',
    'gta vice city big mission pack',
    'youtubers life',
    'where winds meet',
    'capture',
    'sniper vs sniper online multiplayer',
    'look at me itch',
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
    'fortnite': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172620/library_600x900_2x.jpg',
    },
    'grand theft auto vice city': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/12110/library_600x900_2x.jpg',
    },
    'need for speed heat': {
        posterUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222680/library_600x900_2x.jpg',
    },
}