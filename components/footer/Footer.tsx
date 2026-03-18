'use client'

import { useRef } from 'react'
import { FOOTER_NAV_GROUPS } from '@/components/footer/data/navLinks'
import { FOOTER_COLORS } from '@/components/footer/constants'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { useFooterAnimations } from '@/components/footer/hooks/useFooterAnimations'
import { FooterHero } from '@/components/footer/components/FooterHero'
import { FooterNavGrid } from '@/components/footer/components/FooterNavGrid'
import { FooterBottomBar } from '@/components/footer/components/FooterBottomBar'

export function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const wordOneRef = useRef<HTMLDivElement>(null)
    const wordTwoRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    const { isMobile, isTablet } = useResponsiveSection()

    useFooterAnimations({
        footerRef,
        wordOneRef,
        wordTwoRef,
        ctaRef,
        gridRef,
        bottomRef,
        scanRef,
        glowRef,
        isMobile,
    })

    return (
        <footer
            ref={footerRef}
            style={{
                position: 'relative',
                background: FOOTER_COLORS.background,
                overflow: 'hidden',
                borderTop: `1px solid ${FOOTER_COLORS.border}`,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.025,
                }}
            />

            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '-5%',
                    width: isMobile ? '80vw' : 'min(55vw, 650px)',
                    height: isMobile ? '80vw' : 'min(55vw, 650px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(180,0,0,0.2) 0%, transparent 68%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0.35,
                }}
            />

            <div
                ref={scanRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                        'linear-gradient(90deg, transparent, #cc0000 25%, #ff4545 50%, #cc0000 75%, transparent)',
                    zIndex: 10,
                    boxShadow: '0 0 28px rgba(255,45,45,0.65)',
                }}
            />

            <FooterHero
                wordOneRef={wordOneRef}
                wordTwoRef={wordTwoRef}
                ctaRef={ctaRef}
                isMobile={isMobile}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    margin: 'clamp(3rem, 5vw, 5rem) clamp(1.4rem, 4vw, 3.5rem) 0',
                    height: 1,
                    background:
                        'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,69,69,0.12) 40%, transparent 100%)',
                }}
            />

            <FooterNavGrid
                groups={FOOTER_NAV_GROUPS}
                gridRef={gridRef}
                isMobile={isMobile}
                isTablet={isTablet}
            />

            <FooterBottomBar
                bottomRef={bottomRef}
                isMobile={isMobile}
            />
        </footer>
    )
}