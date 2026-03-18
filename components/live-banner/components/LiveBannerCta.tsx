'use client'

import { BANNER_COLORS } from '@/components/live-banner/constants'

type LiveBannerCtaProps = {
    onClickAction: () => void
    isMobile: boolean
}

export function LiveBannerCta({ onClickAction, isMobile }: LiveBannerCtaProps) {
    return (
        <button
            onClick={onClickAction}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: isMobile ? '11px 0' : '10px 0',
                background: BANNER_COLORS.live,
                border: 'none',
                borderRadius: 10,
                color: 'white',
                fontFamily: 'monospace',
                fontSize: isMobile ? '0.64rem' : '0.7rem',
                fontWeight: 700,
                letterSpacing: isMobile ? '0.16em' : '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                boxShadow: '0 4px 20px rgba(255,32,32,0.35)',
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.background = BANNER_COLORS.liveHover
                event.currentTarget.style.transform = 'translateY(-1px)'
                event.currentTarget.style.boxShadow = '0 6px 28px rgba(255,32,32,0.5)'
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.background = BANNER_COLORS.live
                event.currentTarget.style.transform = 'translateY(0)'
                event.currentTarget.style.boxShadow = '0 4px 20px rgba(255,32,32,0.35)'
            }}
        >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect width="14" height="10" rx="2.5" fill="white" fillOpacity="0.25" />
                <path d="M5.5 7V3L9.5 5L5.5 7Z" fill="white" />
            </svg>
            Join the stream
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.7 }}>
                <path
                    d="M2 8L8 2M4 2H8V6"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}