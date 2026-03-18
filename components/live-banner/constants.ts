export const BANNER_COLORS = {
    live: '#ff2020',
    liveHover: '#ff3a3a',
    liveSoft: '#ff4545',
    background: 'rgba(8,9,10,0.92)',
    border: 'rgba(255,30,30,0.25)',
    borderSoft: 'rgba(255,30,30,0.08)',
    textPrimary: 'rgba(255,255,255,0.9)',
    textSecondary: 'rgba(255,255,255,0.4)',
    textMuted: 'rgba(255,255,255,0.3)',
    whiteSoft: 'rgba(255,255,255,0.05)',
    whiteBorder: 'rgba(255,255,255,0.08)',
} as const

export const BANNER_SIZES = {
    desktopWidth: '380px',
    tabletWidth: '360px',
    mobileOffset: '1rem',
    desktopOffset: 'clamp(1.2rem, 3vw, 2rem)',
} as const