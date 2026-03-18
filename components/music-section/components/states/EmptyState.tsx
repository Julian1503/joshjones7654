'use client'

export function EmptyState() {
    return (
        <div
            style={{
                padding: '2rem',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.2)',
                textAlign: 'center',
            }}
        >
            No tracks found yet.
        </div>
    )
}