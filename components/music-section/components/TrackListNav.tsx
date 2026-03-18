'use client'

type TrackListNavProps = {
    direction: 'up' | 'down'
    onClickAction: () => void
    disabled: boolean
}

export function TrackListNav({
                                 direction,
                                 onClickAction,
                                 disabled,
                             }: TrackListNavProps) {
    return (
        <button
            onClick={onClickAction}
            disabled={disabled}
            style={{
                height: 42,
                width: '100%',
                border: 'none',
                borderBottom: direction === 'up' ? '1px solid rgba(255,255,255,0.04)' : undefined,
                borderTop: direction === 'down' ? '1px solid rgba(255,255,255,0.04)' : undefined,
                background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                color: disabled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
            }}
            aria-label={direction === 'up' ? 'Show previous tracks' : 'Show next tracks'}
        >
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                    transform: direction === 'down' ? 'rotate(180deg)' : 'none',
                }}
            >
                <path
                    d="M2 8L6 4L10 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}