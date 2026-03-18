'use client'

import type { ReactNode } from 'react'
import { COLORS, ROLE_TAGS } from '@/components/parallax-hero/constants'
import type { HeroViewport } from '@/components/parallax-hero/types'

type RoleTagsProps = {
    viewport: HeroViewport
}

export function RoleTags({ viewport }: RoleTagsProps) {
    const isMobile = viewport === 'mobile'

    return (
        <>
            {ROLE_TAGS.flatMap((tag) => {
                const dot: ReactNode[] = [
                    <span
                        key={`dot-${tag}`}
                        style={{
                            display: 'inline-block',
                            width: isMobile ? 3 : 3,
                            height: isMobile ? 3 : 3,
                            borderRadius: '50%',
                            background: COLORS.accent,
                            boxShadow: `0 0 6px ${COLORS.accent}`,
                            flexShrink: 0,
                        }}
                    />,
                ]

                dot.push(
                    <span
                        key={tag}
                        style={{
                            fontSize: isMobile ? '0.62rem' : undefined,
                            letterSpacing: isMobile ? '0.18em' : undefined,
                            color: 'rgba(255,255,255,0.55)',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                            padding: isMobile ? '2px 6px' : undefined,
                            borderRadius: isMobile ? 4 : undefined,
                            border: isMobile ? '1px solid rgba(255,255,255,0.1)' : undefined,
                            background: isMobile ? 'rgba(255,255,255,0.04)' : undefined,
                        }}
                    >
                        {tag}
                    </span>
                )

                return dot
            })}
        </>
    )
}