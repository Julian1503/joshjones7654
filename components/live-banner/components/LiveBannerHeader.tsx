'use client'

import { PulseDot } from '@/components/live-banner/components/PulseDot'
import { BANNER_COLORS } from '@/components/live-banner/constants'

type LiveBannerHeaderProps = {
    viewers: string | null
    onDismiss: () => void
    isMobile: boolean
}

export function LiveBannerHeader({
                                     viewers,
                                     onDismiss,
                                     isMobile,
                                 }: LiveBannerHeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: isMobile ? 10 : 12,
                gap: 12,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <PulseDot />
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.56rem' : '0.62rem',
                        letterSpacing: isMobile ? '0.2em' : '0.35em',
                        textTransform: 'uppercase',
                        color: BANNER_COLORS.liveSoft,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                    }}
                >
          Live now
        </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {viewers && (
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.54rem' : '0.6rem',
                            letterSpacing: '0.12em',
                            color: 'rgba(255,255,255,0.4)',
                        }}
                    >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <circle cx="4.5" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.2" />
              <path
                  d="M1 8c0-1.657 1.567-3 3.5-3S8 6.343 8 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
              />
            </svg>
                        {viewers}
          </span>
                )}

                <button
                    onClick={onDismiss}
                    aria-label="Close"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: BANNER_COLORS.whiteSoft,
                        border: `1px solid ${BANNER_COLORS.whiteBorder}`,
                        color: 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        outline: 'none',
                        padding: 0,
                        transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(event) => {
                        event.currentTarget.style.background = 'rgba(255,69,69,0.15)'
                        event.currentTarget.style.color = '#ff6b6b'
                    }}
                    onMouseLeave={(event) => {
                        event.currentTarget.style.background = BANNER_COLORS.whiteSoft
                        event.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    }}
                >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                            d="M1 1L7 7M7 1L1 7"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}