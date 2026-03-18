'use client'

import type { RefObject } from 'react'
import { COLORS } from '@/components/parallax-hero/constants'
import type { HeroViewport } from '@/components/parallax-hero/types'

type GhostNameProps = {
    ghostRef: RefObject<HTMLDivElement | null>
    fullLayerStyle: React.CSSProperties
    viewport: HeroViewport
}

export function GhostName({ ghostRef, fullLayerStyle, viewport }: GhostNameProps) {
    const isMobile = viewport === 'mobile'
    const isTablet = viewport === 'tablet'

    return (
        <div
            ref={ghostRef}
            style={{
                ...fullLayerStyle,
                zIndex: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
      <span
          className="font-bebas"
          style={{
              fontSize: isMobile
                  ? 'clamp(4.5rem, 24vw, 7rem)'
                  : isTablet
                      ? 'clamp(6rem, 20vw, 11rem)'
                      : 'clamp(9rem, 28vw, 24rem)',
              lineHeight: 1,
              letterSpacing: isMobile ? '0.03em' : '0.06em',
              color: 'transparent',
              WebkitTextStroke: `1px ${COLORS.ghostStroke}`,
              whiteSpace: 'nowrap',
              opacity: isMobile ? 0.45 : 1,
          }}
      >
        JOSHUA
      </span>
        </div>
    )
}