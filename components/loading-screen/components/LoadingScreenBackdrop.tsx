'use client'

type LoadingScreenBackdropProps = {
    glowRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function LoadingScreenBackdrop({
                                          glowRef,
                                          scanRef,
                                          isMobile,
                                      }: LoadingScreenBackdropProps) {
    return (
        <>
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.028,
                    zIndex: 0,
                }}
            />

            <div
                ref={glowRef}
                aria-hidden
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '84vw' : 'min(70vw, 700px)',
                    height: isMobile ? '84vw' : 'min(70vw, 700px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(180,0,0,0.22) 0%, transparent 68%)',
                    filter: 'blur(80px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0,
                }}
            />

            <div
                ref={scanRef}
                aria-hidden
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                        'linear-gradient(90deg, transparent, #cc0000 25%, #ff4545 50%, #cc0000 75%, transparent)',
                    boxShadow: '0 0 28px rgba(255,45,45,0.65)',
                    zIndex: 1,
                }}
            />

            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                        'linear-gradient(90deg, transparent, rgba(255,69,69,0.2) 40%, transparent)',
                    zIndex: 1,
                }}
            />
        </>
    )
}