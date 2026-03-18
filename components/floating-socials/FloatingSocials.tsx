'use client'

import { useRef } from 'react'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { FLOATING_SOCIALS } from '@/components/floating-socials/data/socials'
import { useFloatingSocialsVisibility } from '@/components/floating-socials/hooks/useFloatingSocialsVisibility'
import { useFloatingSocialsAnimations } from '@/components/floating-socials/hooks/useFloatingSocialsAnimations'
import { SocialButton } from '@/components/floating-socials/components/SocialButton'
import { SocialButtonsLine } from '@/components/floating-socials/components/SocialButtonsLine'

export function FloatingSocials() {
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    const { isVisible } = useFloatingSocialsVisibility()
    const { isMobile, isTablet } = useResponsiveSection()

    useFloatingSocialsAnimations({
        containerRef,
        lineRef,
        isVisible,
    })

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                right: isMobile ? '1rem' : 'clamp(1rem, 2.5vw, 2rem)',
                bottom: isMobile ? '1rem' : 'auto',
                top: isMobile ? 'auto' : '50%',
                transform: isMobile ? 'none' : 'translateY(-50%)',
                zIndex: 900,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center',
                gap: isMobile ? 10 : 6,
                opacity: 1,
                visibility: 'visible',
                padding: isMobile ? '0.55rem 0.7rem' : 0,
                borderRadius: isMobile ? 16 : 0,
                background: isMobile ? 'rgba(7,8,9,0.72)' : 'transparent',
                backdropFilter: isMobile ? 'blur(14px)' : 'none',
                border: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
                boxShadow: isMobile ? '0 12px 30px rgba(0,0,0,0.35)' : 'none',
            }}
        >
            {FLOATING_SOCIALS.map((social) => (
                <SocialButton
                    key={social.id}
                    label={social.label}
                    href={social.href}
                    icon={social.icon}
                    color={social.color}
                    borderColor={social.borderColor}
                    isMobile={isMobile}
                />
            ))}

            <SocialButtonsLine
                lineRef={lineRef}
                isMobile={isMobile}
            />
        </div>
    )
}