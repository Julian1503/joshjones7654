'use client'

import { useRef } from 'react'
import { PILLARS } from '@/components/the-better-day/data/pillars'
import { ProgressTrack } from '@/components/the-better-day/components/ProgressTrack'
import { IntroPanel } from '@/components/the-better-day/components/IntroPanel'
import { PillarPanel } from '@/components/the-better-day/components/PillarPanel'
import { OutroPanel } from '@/components/the-better-day/components/OutroPanel'
import { useTheBetterDayAnimations } from '@/components/the-better-day/hooks/useTheBetterDayAnimations'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import {THE_BETTER_DAY_SECTION} from "@/components/the-better-day/constants";

export default function TheBetterDaySection() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)
    const dotRefs = useRef<(HTMLDivElement | null)[]>([])

    const panelRefs = useRef<(HTMLDivElement | null)[]>([])
    const bgRefs = useRef<(HTMLDivElement | null)[]>([])
    const wordRefs = useRef<(HTMLDivElement | null)[]>([])
    const numRefs = useRef<(HTMLDivElement | null)[]>([])
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
    const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
    const bodyRefs = useRef<(HTMLParagraphElement | null)[]>([])

    const introRef = useRef<HTMLDivElement>(null)
    const logoWrapRef = useRef<HTMLDivElement>(null)
    const introCopyRef = useRef<HTMLDivElement>(null)

    const outroRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)

    const { isMobile, isTablet, isDesktop } = useResponsiveSection()

    useTheBetterDayAnimations({
        pillars: PILLARS,
        wrapperRef,
        trackRef,
        fillRef,
        dotRefs,
        panelRefs,
        bgRefs,
        wordRefs,
        numRefs,
        labelRefs,
        titleRefs,
        bodyRefs,
        introRef,
        outroRef,
        ctaRef,
    })

    const wrapperHeight = `${(1 + PILLARS.length + 2) * 100}vh`

    return (
        <div
            ref={wrapperRef}
            id={THE_BETTER_DAY_SECTION}
            data-floating-social="false"
            style={{
                position: 'relative',
                height: wrapperHeight,
                background: 'var(--bg-base)',
            }}
        >
            <ProgressTrack
                pillars={PILLARS}
                trackRef={trackRef}
                fillRef={fillRef}
                dotRefs={dotRefs}
                isMobile={isMobile}
                isTablet={isTablet}
            />

            <div
                ref={stickyRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    background: 'var(--bg-base)',
                }}
            >
                <IntroPanel
                    pillars={PILLARS}
                    introRef={introRef}
                    logoWrapRef={logoWrapRef}
                    introCopyRef={introCopyRef}
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />

                {PILLARS.map((pillar, index) => (
                    <PillarPanel
                        key={pillar.index}
                        pillar={pillar}
                        index={index}
                        panelRefs={panelRefs}
                        bgRefs={bgRefs}
                        wordRefs={wordRefs}
                        numRefs={numRefs}
                        labelRefs={labelRefs}
                        titleRefs={titleRefs}
                        bodyRefs={bodyRefs}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                ))}

                <OutroPanel
                    pillars={PILLARS}
                    outroRef={outroRef}
                    ctaRef={ctaRef}
                    isMobile={isMobile}
                    isTablet={isTablet}
                />
            </div>
        </div>
    )
}