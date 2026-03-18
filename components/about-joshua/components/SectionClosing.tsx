'use client'

import { ABOUT_JOSHUA_COLORS } from '@/components/about-joshua/constants'

type SectionClosingProps = {
    closingRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function SectionClosing({ closingRef, isMobile }: SectionClosingProps) {
    return (
        <div
            ref={closingRef}
            style={{
                marginTop: 'clamp(2rem, 4vw, 3.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.65rem' : '1rem',
            }}
        >
            <div
                style={{
                    flex: 1,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))',
                }}
            />
            <p
                style={{
                    margin: 0,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.56rem' : 'clamp(0.58rem, 0.85vw, 0.72rem)',
                    letterSpacing: isMobile ? '0.2em' : '0.38em',
                    color: ABOUT_JOSHUA_COLORS.textMuted,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                }}
            >
                This is only the beginning
            </p>
            <div
                style={{
                    flex: 1,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
                }}
            />
        </div>
    )
}