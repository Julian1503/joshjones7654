'use client'

import { PAGE_INDEX_COLORS } from '@/components/page-index/constants'
import type { PageIndexSectionItem } from '@/components/page-index/types'

type CardContentProps = {
    section: PageIndexSectionItem
    arrowRef: React.RefObject<HTMLSpanElement | null>
    isMobile: boolean
}

export function CardContent({
                                section,
                                arrowRef,
                                isMobile,
                            }: CardContentProps) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
          <span
              style={{
                  fontFamily: 'monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: PAGE_INDEX_COLORS.accentSoft,
              }}
          >
            {section.index}
          </span>

                    <span
                        ref={arrowRef}
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.65rem',
                            opacity: 0.55,
                        }}
                    >
            ↗
          </span>
                </div>

                <div>
          <span
              style={{
                  display: 'block',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: isMobile ? '1.25rem' : 'clamp(1.1rem, 1.8vw, 1.7rem)',
                  letterSpacing: '0.07em',
                  lineHeight: 1,
                  color: PAGE_INDEX_COLORS.text,
              }}
          >
            {section.label}
          </span>

                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.52rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: PAGE_INDEX_COLORS.textMuted,
                        }}
                    >
            {section.sublabel}
          </span>
                </div>

                <p
                    style={{
                        margin: '4px 0 0',
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.66rem' : 'clamp(0.58rem, 0.8vw, 0.68rem)',
                        lineHeight: 1.6,
                        letterSpacing: '0.04em',
                        color: PAGE_INDEX_COLORS.textMuted,
                    }}
                >
                    {section.description}
                </p>
            </div>

            <div
                style={{
                    marginTop: 'auto',
                    paddingTop: 8,
                    borderTop: `1px solid ${PAGE_INDEX_COLORS.border}`,
                    fontFamily: 'monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.56)',
                }}
            >
                {section.cta} →
            </div>
        </>
    )
}