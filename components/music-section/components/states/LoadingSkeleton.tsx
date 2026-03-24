'use client'

export function LoadingSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    className='music-skeleton-row'
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: 56,
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.04)',
                    }}
                >
                    <div className='music-skeleton-shimmer' />
                </div>
            ))}
        </div>
    )
}