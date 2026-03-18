'use client'

import { useRef } from 'react'
import { ABOUT_JOSHUA_CHAPTERS } from '@/components/about-joshua/data/chapters'
import { ABOUT_JOSHUA_COLORS, ABOUT_JOSHUA_SECTION_ID } from '@/components/about-joshua/constants'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { useAboutJoshuaAnimations } from '@/components/about-joshua/hooks/useAboutJoshuaAnimations'
import { ParticleCanvas } from '@/components/about-joshua/components/ParticleCanvas'
import { SectionHeader } from '@/components/about-joshua/components/SectionHeader'
import { Chapter } from '@/components/about-joshua/components/Chapter'
import { PullQuote } from '@/components/about-joshua/components/PullQuote'
import { SectionClosing } from '@/components/about-joshua/components/SectionClosing'

export default function AboutJoshuaSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const dividerRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)
    const closingRef = useRef<HTMLDivElement>(null)
    const chapterRefs = useRef<HTMLDivElement[]>([])

    const setChapterRef = (index: number) => (element: HTMLDivElement | null) => {
        if (element) {
            chapterRefs.current[index] = element
        }
    }

    const { isMobile, isTablet } = useResponsiveSection()

    useAboutJoshuaAnimations({
        sectionRef,
        headerRef,
        dividerRef,
        quoteRef,
        closingRef,
        chapterRefs,
        isMobile,
    })

    return (
        <section
            id={ABOUT_JOSHUA_SECTION_ID}
            ref={sectionRef}
            style={{
                position: 'relative',
                background: ABOUT_JOSHUA_COLORS.background,
                padding: 'clamp(6rem, 10vw, 10rem) 0',
                overflow: 'hidden',
            }}
        >
            <ParticleCanvas />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at center, transparent 28%, rgba(6,8,9,0.68) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            <div
                style={{
                    width: isMobile ? 'calc(100% - 2rem)' : 'min(1100px, calc(100% - 3rem))',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <SectionHeader headerRef={headerRef} isMobile={isMobile} />

                <div
                    ref={dividerRef}
                    style={{
                        height: 1,
                        background:
                            'linear-gradient(90deg, rgba(255,69,69,0.64), rgba(255,69,69,0.2) 40%, transparent)',
                        marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'clamp(3.5rem, 7vw, 6.5rem)',
                    }}
                >
                    {ABOUT_JOSHUA_CHAPTERS.map((chapter, index) => (
                        <Chapter
                            key={chapter.num}
                            num={chapter.num}
                            title={chapter.title}
                            body={chapter.body}
                            align={chapter.align}
                            chapterRef={setChapterRef(index)}
                            platform={chapter.platform}
                            isMobile={isMobile}
                            isTablet={isTablet}
                        />
                    ))}
                </div>

                <PullQuote quoteRef={quoteRef} isMobile={isMobile} />

                <SectionClosing closingRef={closingRef} isMobile={isMobile} />
            </div>
        </section>
    )
}