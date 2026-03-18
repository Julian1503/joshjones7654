'use client'

import { FLOATING_SOCIALS_COLORS } from '@/components/floating-socials/constants'

type SocialButtonsLineProps = {
    lineRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function SocialButtonsLine({
                                      lineRef,
                                      isMobile,
                                  }: SocialButtonsLineProps) {
    return (
        <div
            ref={lineRef}
            style={{
                marginTop: isMobile ? 0 : 8,
                width: isMobile ? 48 : 1,
                height: isMobile ? 1 : 48,
                background: isMobile
                    ? 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)'
                    : FLOATING_SOCIALS_COLORS.line,
                borderRadius: 1,
            }}
        />
    )
}