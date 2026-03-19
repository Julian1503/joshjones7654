import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { YoutubeDetectedGame } from '@/lib/youtube/youtube.types'
import {
    GAME_NAME_ALIASES,
    GAME_CANDIDATE_BLACKLIST,
    GAME_CANDIDATE_PHRASE_BLACKLIST,
    MANUAL_GAME_OVERRIDES,
} from '@/lib/youtube/youtube-games.constants'

const SCAN_STATE_PATH = path.join(process.cwd(), 'data', 'games-scan-state.json')

export type AccumulatedGameEntry = {
    id: string
    gameName: string
    mentionCount: number
    posterUrl: string | null
    posterSource: 'catalog' | 'fallback' | 'none'
    latestMention: YoutubeDetectedGame['latestMention']
    mentions: YoutubeDetectedGame['mentions']
}

export type ScanState = {
    checkpointVideoId: string | null
    checkpointScannedAt: string | null
    // Schema version — bumped when a migration runs so it only runs once
    schemaVersion: number
    games: Record<string, AccumulatedGameEntry>
}

const CURRENT_SCHEMA_VERSION = 2

export class ScanStateRepository {
    private cached: ScanState | null = null

    async load(): Promise<ScanState> {
        if (this.cached) return this.cached

        try {
            const raw = await fs.readFile(SCAN_STATE_PATH, 'utf8')
            const parsed = JSON.parse(raw) as Partial<ScanState>

            let state: ScanState = {
                checkpointVideoId: parsed.checkpointVideoId ?? null,
                checkpointScannedAt: parsed.checkpointScannedAt ?? null,
                schemaVersion: parsed.schemaVersion ?? 1,
                games: parsed.games && typeof parsed.games === 'object' ? parsed.games : {},
            }

            // Run migrations if the stored schema is behind the current version.
            // Each migration is additive — the version guard ensures it only runs once.
            if (state.schemaVersion < CURRENT_SCHEMA_VERSION) {
                state = migrateState(state)
                // Persist immediately so the migration doesn't re-run next boot
                await this.persist(state)
            }

            this.cached = state
            return this.cached
        } catch {
            this.cached = {
                checkpointVideoId: null,
                checkpointScannedAt: null,
                schemaVersion: CURRENT_SCHEMA_VERSION,
                games: {},
            }
            return this.cached
        }
    }

    async save(state: ScanState): Promise<void> {
        this.cached = state
        await this.persist(state)
    }

    private async persist(state: ScanState): Promise<void> {
        await fs.mkdir(path.dirname(SCAN_STATE_PATH), { recursive: true })
        await fs.writeFile(SCAN_STATE_PATH, JSON.stringify(state, null, 2), 'utf8')
    }

    static merge(
        accumulated: Record<string, AccumulatedGameEntry>,
        incoming: YoutubeDetectedGame[]
    ): Record<string, AccumulatedGameEntry> {
        const result: Record<string, AccumulatedGameEntry> = { ...accumulated }

        for (const game of incoming) {
            const existing = result[game.id]

            if (!existing) {
                result[game.id] = {
                    id: game.id,
                    gameName: game.gameName,
                    mentionCount: game.mentionCount,
                    posterUrl: game.posterUrl,
                    posterSource: game.posterSource,
                    latestMention: game.latestMention,
                    mentions: game.mentions,
                }
                continue
            }

            const existingVideoIds = new Set(existing.mentions.map((m) => m.videoId))
            const newMentions = game.mentions.filter((m) => !existingVideoIds.has(m.videoId))

            result[game.id] = {
                ...existing,
                mentionCount: existing.mentionCount + newMentions.length,
                posterUrl: existing.posterSource === 'catalog' ? existing.posterUrl : game.posterUrl,
                posterSource: existing.posterSource === 'catalog' ? 'catalog' : game.posterSource,
                latestMention: newMentions[0] ?? existing.latestMention,
                mentions: [...newMentions, ...existing.mentions],
            }
        }

        return result
    }
}

// ─── Migration ────────────────────────────────────────────────────────────────
// Runs automatically inside load() when schemaVersion is behind.
// Adding a future migration = increment CURRENT_SCHEMA_VERSION and add an
// `if (state.schemaVersion < N)` block below.

function migrateState(state: ScanState): ScanState {
    let games = state.games

    // v1 → v2: re-apply aliases + blacklists, merge duplicates
    if (state.schemaVersion < 2) {
        games = reapplyAliasesAndDeduplicate(games)
    }

    return { ...state, games, schemaVersion: CURRENT_SCHEMA_VERSION }
}

function reapplyAliasesAndDeduplicate(
    games: Record<string, AccumulatedGameEntry>
): Record<string, AccumulatedGameEntry> {
    const canonical = new Map<string, AccumulatedGameEntry>()

    for (const entry of Object.values(games)) {
        const normalized = normalizeName(entry.gameName)

        if (isNoise(normalized)) continue

        const canonicalKey = resolveCanonicalKey(normalized)
        const canonicalDisplayName = resolveDisplayName(normalized, entry.gameName)
        const existing = canonical.get(canonicalKey)

        if (!existing) {
            canonical.set(canonicalKey, {
                ...entry,
                id: canonicalKey.replace(/\s+/g, '-'),
                gameName: canonicalDisplayName,
                posterUrl: pickBestPoster(entry.posterUrl, canonicalKey),
            })
            continue
        }

        // Merge duplicate into the existing canonical entry
        const existingVideoIds = new Set(existing.mentions.map((m) => m.videoId))
        const uniqueNewMentions = entry.mentions.filter((m) => !existingVideoIds.has(m.videoId))

        canonical.set(canonicalKey, {
            ...existing,
            mentionCount: existing.mentionCount + uniqueNewMentions.length,
            posterUrl: pickBestPoster(existing.posterUrl ?? entry.posterUrl, canonicalKey),
            posterSource: existing.posterSource === 'catalog' ? 'catalog' : entry.posterSource,
            mentions: [...uniqueNewMentions, ...existing.mentions],
            latestMention: uniqueNewMentions[0] ?? existing.latestMention,
        })
    }

    const result: Record<string, AccumulatedGameEntry> = {}
    for (const [key, entry] of canonical) {
        result[key] = entry
    }
    return result
}

// ─── Helpers (mirrors logic in normalizer.ts / constants.ts) ─────────────────

function normalizeName(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function resolveCanonicalKey(normalized: string): string {
    const alias = GAME_NAME_ALIASES[normalized]
    return alias ? normalizeName(alias) : normalized
}

function resolveDisplayName(normalized: string, fallback: string): string {
    return GAME_NAME_ALIASES[normalized] ?? fallback
}

function pickBestPoster(current: string | null, canonicalKey: string): string | null {
    return MANUAL_GAME_OVERRIDES[canonicalKey]?.posterUrl ?? current
}

function isNoise(normalized: string): boolean {
    if (/^\d+$/.test(normalized.replace(/\s+/g, ''))) return true

    const words = normalized.split(' ')
    if (words.every((w) => GAME_CANDIDATE_BLACKLIST.has(w))) return true

    if (GAME_CANDIDATE_PHRASE_BLACKLIST.has(normalized)) return true
    for (const phrase of GAME_CANDIDATE_PHRASE_BLACKLIST) {
        if (normalized.includes(phrase)) return true
    }

    return false
}