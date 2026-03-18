'use client'

import type { PageIndexSectionItem } from '@/components/page-index/types'
import { IndexCard } from '@/components/page-index/components/IndexCard'

type IndexGridProps = {
    cardsRef: React.RefObject<HTMLDivElement | null>
    sections: PageIndexSectionItem[]
    isMobile: boolean
    isTablet: boolean
}

export function IndexGrid({
                              cardsRef,
                              sections,
                              isMobile,
                              isTablet,
                          }: IndexGridProps) {
    const columns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'

    return (
        <div
            ref={cardsRef}
            style={{
                position: 'relative',
                zIndex: 6,
                display: 'grid',
                gridTemplateColumns: columns,
                borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            {sections.map((section, index) => (
                <IndexCard
                    key={section.id}
                    section={section}
                    isLastColumn={index === sections.length - 1}
                    isMobile={isMobile}
                />
            ))}
        </div>
    )
}