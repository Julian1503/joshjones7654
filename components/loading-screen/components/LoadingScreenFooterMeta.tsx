'use client'

import { LOADING_SCREEN_COPY } from '@/components/loading-screen/constants'

type LoadingScreenFooterMetaProps = {
    isMobile: boolean
}

export function LoadingScreenFooterMeta({
                                            isMobile,
                                        }: LoadingScreenFooterMetaProps) {
    return (
        <>
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    bottom: 'clamp(1.2rem, 2.5vh, 2rem)',
                    left: 'clamp(1.2rem, 2.5vw, 2rem)',
                    zIndex: 2,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.44rem' : '0.48rem',
                    letterSpacing: isMobile ? '0.14em' : '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.1)',
                }}
            >
                {LOADING_SCREEN_COPY.leftMeta}
            </div>

            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    bottom: 'clamp(1.2rem, 2.5vh, 2rem)',
                    right: 'clamp(1.2rem, 2.5vw, 2rem)',
                    zIndex: 2,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.44rem' : '0.48rem',
                    letterSpacing: isMobile ? '0.14em' : '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.1)',
                }}
            >
                © {new Date().getFullYear()}
            </div>
        </>
    )
}