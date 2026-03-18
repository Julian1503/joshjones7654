'use client'

type GridSkeletonProps = {
    isMobile: boolean
    isTablet: boolean
}

export function GridSkeleton({ isMobile, isTablet }: GridSkeletonProps) {
    const shimmer = `
    @keyframes shimmer {
      0%   { background-position: -600px 0 }
      100% { background-position: 600px 0 }
    }
  `

    const skeletonBackground = {
        background:
            'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
        backgroundSize: '600px 100%',
        animation: 'shimmer 1.6s infinite linear',
    }

    if (isMobile) {
        return (
            <>
                <style>{shimmer}</style>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} style={{ borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{ ...skeletonBackground, aspectRatio: '16/9', borderRadius: 16 }} />
                            <div style={{ padding: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ ...skeletonBackground, height: 16, borderRadius: 5, width: '82%' }} />
                                <div style={{ ...skeletonBackground, height: 12, borderRadius: 5, width: '42%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    if (isTablet) {
        return (
            <>
                <style>{shimmer}</style>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} style={{ borderRadius: 18, overflow: 'hidden' }}>
                            <div style={{ ...skeletonBackground, aspectRatio: '16/9', borderRadius: 18 }} />
                            <div style={{ padding: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ ...skeletonBackground, height: 16, borderRadius: 5, width: '80%' }} />
                                <div style={{ ...skeletonBackground, height: 12, borderRadius: 5, width: '40%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <style>{shimmer}</style>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'auto auto auto',
                    gap: 'clamp(0.75rem, 1.5vw, 1.2rem)',
                }}
            >
                <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ ...skeletonBackground, aspectRatio: '16/9', borderRadius: 20 }} />
                    <div style={{ padding: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ ...skeletonBackground, height: 20, borderRadius: 6, width: '80%' }} />
                        <div style={{ ...skeletonBackground, height: 14, borderRadius: 6, width: '40%' }} />
                    </div>
                </div>

                {[0, 1].map((index) => (
                    <div
                        key={index}
                        style={{ gridColumn: '3', gridRow: `${index + 1}`, borderRadius: 14, overflow: 'hidden' }}
                    >
                        <div style={{ ...skeletonBackground, aspectRatio: '16/9', borderRadius: 14 }} />
                        <div style={{ padding: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ ...skeletonBackground, height: 16, borderRadius: 5, width: '85%' }} />
                            <div style={{ ...skeletonBackground, height: 12, borderRadius: 5, width: '45%' }} />
                        </div>
                    </div>
                ))}

                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        style={{ gridColumn: `${index + 1}`, gridRow: '3', borderRadius: 14, overflow: 'hidden' }}
                    >
                        <div style={{ ...skeletonBackground, aspectRatio: '16/9', borderRadius: 14 }} />
                        <div style={{ padding: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <div style={{ ...skeletonBackground, height: 14, borderRadius: 5, width: '80%' }} />
                            <div style={{ ...skeletonBackground, height: 10, borderRadius: 5, width: '40%' }} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}