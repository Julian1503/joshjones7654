import { BRAND_COLORS } from '@/lib/theme/colors'

export const SECTION_HEIGHT = '220vh'

export const PARALLAX_TRAVEL = {
    desktop: {
        background: -90,
        monitors: -58,
        person: -28,
        table: -10,
        text: -36,
    },
    tablet: {
        background: -60,
        monitors: -38,
        person: -18,
        table: -6,
        text: -20,
    },
    mobile: {
        background: -34,
        monitors: -20,
        person: -10,
        table: -4,
        text: -10,
    },
} as const

export const DEPTH_BREATHING = {
    background: { from: 1.1, to: 1.02 },
    monitors: { from: 1.05, to: 1.01 },
    person: { from: 1.02, to: 1.005 },
    table: { from: 1.015, to: 1 },
} as const

export const COLORS = {
    background: BRAND_COLORS.background,
    accent: BRAND_COLORS.accent,
    titleStroke: 'rgba(255,255,255,0.08)',
    ghostStroke: 'rgba(255,255,255,0.10)',
} as const

export const ROLE_TAGS = ['GAMER', 'CREATOR', 'YOUTUBER'] as const

export const FLICKER_KEYFRAMES = `
  @keyframes flicker {
    0%, 88%, 90%, 93%, 100% { opacity: 1; }
    89% { opacity: .6; }
    92% { opacity: .82; }
  }
`