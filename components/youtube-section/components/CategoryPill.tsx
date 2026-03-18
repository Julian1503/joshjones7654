'use client'

const CATEGORY_COLORS: Record<string, { background: string; text: string }> = {
    Gaming: {
        background: 'rgba(77,227,255,0.12)',
        text: '#4de3ff',
    },
    Personal: {
        background: 'rgba(255,69,69,0.14)',
        text: '#ff6b6b',
    },
    Reaction: {
        background: 'rgba(255,200,60,0.12)',
        text: '#ffc83c',
    },
    Setup: {
        background: 'rgba(160,130,255,0.14)',
        text: '#b89fff',
    },
    Other: {
        background: 'rgba(255,255,255,0.08)',
        text: 'rgba(255,255,255,0.5)',
    },
}

export function CategoryPill({ label }: { label: string }) {
    const colors = CATEGORY_COLORS[label] ?? CATEGORY_COLORS.Other

    return (
        <span
            style={{
                display: 'inline-block',
                padding: '3px 9px',
                borderRadius: 100,
                background: colors.background,
                color: colors.text,
                fontFamily: 'monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
            }}
        >
      {label}
    </span>
    )
}