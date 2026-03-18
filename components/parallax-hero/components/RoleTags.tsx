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
            {ROLE_TAGS.flatMap((tag, index, allTags) => {
                const nodes: ReactNode[] = [<span key={tag}>{tag}</span>]

                if (index < allTags.length - 1) {
                    nodes.push(
                        <span
                            key={`dot-${tag}`}
                            style={{
                                display: 'inline-block',
                                width: isMobile ? 2 : 3,
                                height: isMobile ? 2 : 3,
                                borderRadius: '50%',
                                background: COLORS.accent,
                                boxShadow: `0 0 6px ${COLORS.accent}`,
                            }}
                        />
                    )
                }

                return nodes
            })}
        </>
    )
}