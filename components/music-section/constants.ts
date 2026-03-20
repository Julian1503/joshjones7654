export const MUSIC_SECTION_COLORS = {
    background: '#000',
    accent: '#ff4545',
    accentDark: '#cc0000',
    text: 'rgba(255,255,255,0.93)',
    textSoft: 'rgba(255,255,255,0.7)',
    textMuted: 'rgba(255,255,255,0.22)',
    border: 'rgba(255,255,255,0.06)',
} as const

export const MUSIC_SECTION_ID = 'music'

export const MUSIC_WAVEFORM_BAR_COUNT = 52
export const MUSIC_VISIBLE_TRACKS = 4

export const MUSIC_REST_HEIGHTS = Array.from(
    { length: MUSIC_WAVEFORM_BAR_COUNT },
    (_, index) => {
        const t = index / MUSIC_WAVEFORM_BAR_COUNT
        return 0.12 + 0.22 * Math.abs(Math.sin(t * Math.PI * 3.5 + 0.8))
    }
)

