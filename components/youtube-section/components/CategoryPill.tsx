'use client'

const CATEGORY_COLORS: Record<string, { background: string; text: string }> = {
    Gaming: {
        background: 'rgba(255,69,69,0.14)',
        text: '#ff6b6b',
    },
    Personal: {
        background: 'rgba(255,85,69,0.14)',
        text: '#ff8a6b',
    },
    Reaction: {
        background: 'rgba(255,176,59,0.14)',
        text: '#ffbf54',
    },
    Setup: {
        background: 'rgba(255,122,80,0.14)',
        text: '#ff936d',
    },
    Other: {
        background: 'rgba(255,255,255,0.08)',
        text: 'rgba(255,255,255,0.56)',
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