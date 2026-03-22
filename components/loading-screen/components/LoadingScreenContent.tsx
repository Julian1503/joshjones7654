'use client'

import { LOADING_SCREEN_COPY } from '@/components/loading-screen/constants'

type LoadingScreenContentProps = {
    nameRef: React.RefObject<HTMLDivElement | null>
    nameFillRef: React.RefObject<HTMLDivElement | null>
    scanLineRef: React.RefObject<HTMLDivElement | null>
    labelRef: React.RefObject<HTMLParagraphElement | null>
    dots: string
    isMobile: boolean
}

export function LoadingScreenContent({
                                         nameRef,
                                         nameFillRef,
                                         scanLineRef,
                                         labelRef,
                                         dots,
                                         isMobile,
                                     }: LoadingScreenContentProps) {
    const fontSize = isMobile
        ? 'clamp(4rem, 22vw, 7rem)'
        : 'clamp(4.5rem, 20vw, 18rem)'

    const sharedNameStyle: React.CSSProperties = {
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize,
        lineHeight: 0.88,
        letterSpacing: '0.06em',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
    }

    return (
        <div
            style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(1rem, 2.5vw, 1.8rem)',
                textAlign: 'center',
            }}
        >
            <div
                ref={nameRef}
                style={{
                    position: 'relative',
                    opacity: 0,
                    filter: 'drop-shadow(0 0 60px rgba(255,69,69,0.15))',
                }}
            >
                <div
                    aria-hidden
                    style={{
                        ...sharedNameStyle,
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255,69,69,0.6)',
                        letterSpacing: '0.18em',
                        fontSize: isMobile
                            ? 'clamp(1.6rem, 9vw, 2.8rem)'
                            : 'clamp(1.8rem, 8vw, 7.2rem)',
                    }}
                >
                    {LOADING_SCREEN_COPY.titleBackground}
                </div>

                <div
                    aria-hidden
                    style={{
                        ...sharedNameStyle,
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255,255,255,0.10)',
                    }}
                >
                    {LOADING_SCREEN_COPY.title}
                </div>

                <div
                    ref={nameFillRef}
                    aria-hidden
                    style={{
                        ...sharedNameStyle,
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,180,180,0.88) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        clipPath: 'inset(0% 0% 100% 0%)',
                        textShadow: 'none',
                        filter: 'drop-shadow(0 0 28px rgba(255,69,69,0.35))',
                    }}
                >
                    {LOADING_SCREEN_COPY.title}
                </div>

                <div
                    ref={scanLineRef}
                    aria-hidden
                    style={{
                        position: 'absolute',
                        left: '-4%',
                        right: '-4%',
                        top: 0,
                        height: 2,
                        background:
                            'linear-gradient(90deg, transparent, #cc0000 20%, #ff4545 50%, #cc0000 80%, transparent)',
                        boxShadow: '0 0 18px 2px rgba(255,45,45,0.7), 0 0 6px 1px rgba(255,45,45,0.9)',
                        borderRadius: 2,
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <p
                ref={labelRef}
                aria-hidden
                style={{ display: 'none' }}
            />
        </div>
    )
}