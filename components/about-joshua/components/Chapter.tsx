'use client'

import { useCallback, useRef } from 'react'
import { ABOUT_JOSHUA_COLORS } from '@/components/about-joshua/constants'
import { PlatformReveal } from '@/components/about-joshua/components/PlatformReveal'
import type { PlatformType } from '@/components/about-joshua/types'

type ChapterProps = {
    num: string
    title: string
    body: React.ReactNode
    align?: 'left' | 'right'
    chapterRef?: React.RefCallback<HTMLDivElement>
    platform?: PlatformType
    isMobile: boolean
    isTablet: boolean
}

export function Chapter({
                            num,
                            title,
                            body,
                            align = 'left',
                            chapterRef,
                            platform,
                            isMobile,
                            isTablet,
                        }: ChapterProps) {
    const isRightAligned = align === 'right'
    const innerRef = useRef<HTMLDivElement>(null)

    const combinedRef = useCallback(
        (element: HTMLDivElement | null) => {
            innerRef.current = element
            chapterRef?.(element)
        },
        [chapterRef]
    )

    const platformSide = isMobile? 'right' : isRightAligned ? 'left' : 'right';

    return (
        <div
            ref={combinedRef}
            style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '0.8rem' : 'clamp(1rem, 3vw, 3rem)',
                alignItems: 'start',
                paddingLeft: isMobile ? 0 : isRightAligned ? '8%' : 0,
                paddingRight: isMobile ? 0 : isRightAligned ? 0 : '8%',
                position: 'relative',
            }}
        >
            {platform && (
                <PlatformReveal
                    platform={platform}
                    side={platformSide}
                    trigger={innerRef}
                    isMobile={isMobile}
                    isTablet={isTablet}
                />
            )}

            <div
                style={{
                    order: isMobile ? 1 : isRightAligned ? 2 : 1,
                    textAlign: isMobile ? 'left' : isRightAligned ? 'right' : 'left',
                }}
            >
                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.56rem' : 'clamp(0.52rem, 0.8vw, 0.68rem)',
                        letterSpacing: isMobile ? '0.22em' : '0.4em',
                        color: ABOUT_JOSHUA_COLORS.textMuted,
                        textTransform: 'uppercase',
                        marginBottom: 8,
                    }}
                >
                    Chapter
                </div>

                <div
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile
                            ? 'clamp(3.6rem, 16vw, 5rem)'
                            : 'clamp(5rem, 10vw, 9rem)',
                        lineHeight: 0.85,
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(77,227,255,0.2)',
                        userSelect: 'none',
                    }}
                >
                    {num}
                </div>
            </div>

            <div
                style={{
                    order: isMobile ? 2 : isRightAligned ? 1 : 2,
                    paddingTop: isMobile ? 0 : 'clamp(0.5rem, 2vw, 2rem)',
                }}
            >
                <h3
                    style={{
                        margin: '0 0 clamp(0.7rem, 1.5vw, 1.1rem)',
                        color: ABOUT_JOSHUA_COLORS.text,
                        fontSize: isMobile
                            ? 'clamp(1.2rem, 6vw, 1.6rem)'
                            : 'clamp(1.35rem, 2.4vw, 2.1rem)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                        maxWidth: isMobile ? '100%' : '18ch',
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        margin: 0,
                        color: ABOUT_JOSHUA_COLORS.textSoft,
                        fontSize: isMobile ? '0.98rem' : 'clamp(0.96rem, 1.1vw, 1.05rem)',
                        lineHeight: isMobile ? 1.72 : 1.82,
                    }}
                >
                    {body}
                </p>
            </div>
        </div>
    )
}