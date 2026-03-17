'use client'

import { useRef } from 'react'
import { PILLARS } from './data/pillars'
import { ProgressTrack } from './components/ProgressTrack'
import { IntroPanel } from './components/IntroPanel'
import { PillarPanel } from './components/PillarPanel'
import { OutroPanel } from './components/OutroPanel'
import { useTheBetterDayAnimations } from './hooks/useTheBetterDayAnimations'

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

    const wrapperHeight = `${(1 + PILLARS.length + 1) * 100}vh`

    return (
        <div
            ref={wrapperRef}
            style={{
                position: 'relative',
                height: wrapperHeight,
                background: '#07090a',
            }}
        >
            <ProgressTrack
                pillars={PILLARS}
                trackRef={trackRef}
                fillRef={fillRef}
                dotRefs={dotRefs}
            />

            <div
                ref={stickyRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    background: '#07090a',
                }}
            >
                <IntroPanel
                    pillars={PILLARS}
                    introRef={introRef}
                    logoWrapRef={logoWrapRef}
                    introCopyRef={introCopyRef}
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
                    />
                ))}

                <OutroPanel pillars={PILLARS} outroRef={outroRef} ctaRef={ctaRef} />
            </div>
        </div>
    )
}