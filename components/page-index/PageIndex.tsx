'use client'

import { useRef } from 'react'
import { PAGE_INDEX_SECTIONS } from '@/components/page-index/data/sections'
import { PAGE_INDEX_COLORS } from '@/components/page-index/constants'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { usePageIndexAnimations } from '@/components/page-index/hooks/usePageIndexAnimations'
import { IndexGrid } from '@/components/page-index/components/IndexGrid'

export function PageIndex() {
    const cardsRef = useRef<HTMLDivElement>(null)
    const { isMobile, isTablet } = useResponsiveSection()

    usePageIndexAnimations({
        cardsRef,
    })

    return (
        <section
            id='site-index'
            aria-label='Page index'
            style={{
                position: 'relative',
                background: PAGE_INDEX_COLORS.background,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <nav aria-label='Section links'>
                <IndexGrid
                    cardsRef={cardsRef}
                    sections={PAGE_INDEX_SECTIONS}
                    isMobile={isMobile}
                    isTablet={isTablet}
                />
            </nav>
        </section>
    )
}