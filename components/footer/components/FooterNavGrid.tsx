'use client'

import type { FooterNavGroup } from '@/components/footer/types'
import { FooterNavItem } from '@/components/footer/components/FooterNavItem'

type FooterNavGridProps = {
    groups: FooterNavGroup[]
    gridRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
    isTablet: boolean
}

export function FooterNavGrid({
                                  groups,
                                  gridRef,
                                  isMobile,
                                  isTablet,
                              }: FooterNavGridProps) {
    const columns = isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)'

    return (
        <div
            ref={gridRef}
            style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: columns,
                gap: isMobile ? '1.5rem' : 'clamp(2rem, 5vw, 4rem)',
                padding: isMobile
                    ? '2rem 1.25rem'
                    : 'clamp(2.5rem, 4vw, 4rem) clamp(1.4rem, 4vw, 3.5rem)',
            }}
        >
            {groups.map((group) => (
                <div
                    key={group.group}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? 10 : 14,
                    }}
                >
          <span
              style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.8)',
              }}
          >
            {group.group}
          </span>

                    <ul
                        style={{
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            display: 'flex',
                            gap: isMobile ? 6 : 8,
                            flexDirection: 'column',
                        }}
                    >
                        {group.links.map((link) => (
                            <FooterNavItem
                                key={link.href}
                                label={link.label}
                                href={link.href}
                                external={Boolean(link.external)}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}