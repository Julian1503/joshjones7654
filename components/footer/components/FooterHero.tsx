'use client'

import { SubscribeButton } from '@/components/footer/components/SubscribeButton'

type FooterHeroProps = {
    wordOneRef: React.RefObject<HTMLDivElement | null>
    wordTwoRef: React.RefObject<HTMLDivElement | null>
    ctaRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function FooterHero({
                               wordOneRef,
                               wordTwoRef,
                               ctaRef,
                               isMobile,
                           }: FooterHeroProps) {
    return (
        <div
            style={{
                position: 'relative',
                zIndex: 2,
                padding: 'clamp(4rem, 8vw, 8rem) clamp(1.4rem, 4vw, 3.5rem) 0',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 'clamp(1.2rem, 2vw, 2rem)',
                }}
            >
                <div
                    style={{
                        width: 28,
                        height: 1,
                        background: 'linear-gradient(90deg, #cc0000, transparent)',
                    }}
                />
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.58rem' : 'clamp(0.52rem, 0.8vw, 0.62rem)',
                        letterSpacing: isMobile ? '0.2em' : '0.32em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,69,69,0.7)',
                    }}
                >
          Don&apos;t miss a moment
        </span>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: '-0.05em' }}>
                <div
                    ref={wordOneRef}
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? 'clamp(3.5rem, 18vw, 5.6rem)' : 'clamp(4.5rem, 13vw, 12rem)',
                        letterSpacing: '0.03em',
                        lineHeight: 0.88,
                        color: 'rgba(255,255,255,0.92)',
                        userSelect: 'none',
                    }}
                >
                    FOLLOW
                </div>
            </div>

            <div style={{ overflow: 'hidden' }}>
                <div
                    ref={wordTwoRef}
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? 'clamp(3.5rem, 18vw, 5.6rem)' : 'clamp(4.5rem, 13vw, 12rem)',
                        letterSpacing: '0.03em',
                        lineHeight: 0.88,
                        color: '#cc0000',
                        textShadow: '0 0 90px rgba(200,0,0,0.45)',
                        userSelect: 'none',
                    }}
                >
                    JOSHUA
                </div>
            </div>

            <div
                ref={ctaRef}
                style={{
                    display: 'flex',
                    alignItems: isMobile ? 'stretch' : 'flex-start',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 'clamp(1.2rem, 4vw, 3rem)',
                    marginTop: 'clamp(2rem, 4vw, 3.5rem)',
                    flexWrap: 'wrap',
                }}
            >
                <SubscribeButton isMobile={isMobile} />

                <p
                    style={{
                        margin: 0,
                        maxWidth: isMobile ? '100%' : 380,
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.68rem' : 'clamp(0.62rem, 0.9vw, 0.72rem)',
                        lineHeight: 1.75,
                        letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.6)',
                        paddingTop: isMobile ? 0 : 4,
                    }}
                >
                    Joshua is a creator with his own energy, humour, and presence. He shows up fully, every day.
                    Subscribe to catch every reaction, every gaming session, and every real moment captured through The Better Day.
                </p>
            </div>
        </div>
    )
}