'use client'

type GamesSkeletonProps = {
    isMobile: boolean
    isTablet: boolean
}

const shimmerStyle = `
@keyframes games-shimmer {
    0%   { background-position: -600px 0 }
    100% { background-position:  600px 0 }
}
`

const shimmerBase = {
    background:
        'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
    backgroundSize: '600px 100%',
    animation: 'games-shimmer 1.6s infinite linear',
} as const

export function GamesSkeleton({ isMobile, isTablet }: GamesSkeletonProps) {
    const columns = isMobile ? 1 : isTablet ? 2 : 3
    const count = columns * 2

    return (
        <>
            <style>{shimmerStyle}</style>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                }}
            >
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.08)',
                            minHeight: isMobile ? 280 : 360,
                            position: 'relative',
                        }}
                    >
                        {/* poster area */}
                        <div
                            style={{
                                ...shimmerBase,
                                position: 'absolute',
                                inset: 0,
                            }}
                        />

                        {/* bottom content overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                        >
                            {/* badge */}
                            <div
                                style={{
                                    ...shimmerBase,
                                    height: 22,
                                    width: 90,
                                    borderRadius: 999,
                                }}
                            />
                            {/* title */}
                            <div
                                style={{
                                    ...shimmerBase,
                                    height: 20,
                                    width: '75%',
                                    borderRadius: 6,
                                }}
                            />
                            {/* date */}
                            <div
                                style={{
                                    ...shimmerBase,
                                    height: 12,
                                    width: '45%',
                                    borderRadius: 4,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}