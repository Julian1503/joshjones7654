'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { FLOATING_SOCIALS_COLORS } from '@/components/floating-socials/constants'

type SocialButtonProps = {
    label: string
    href: string
    icon: React.ReactNode
    color: string
    borderColor: string
    isMobile: boolean
}

export function SocialButton({
                                 label,
                                 href,
                                 icon,
                                 color,
                                 borderColor,
                                 isMobile,
                             }: SocialButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null)
    const tooltipRef = useRef<HTMLSpanElement>(null)

    const handleEnter = () => {
        const button = buttonRef.current
        const tooltip = tooltipRef.current
        if (!button || !tooltip) return

        gsap.to(button, {
            scale: 1.18,
            duration: 0.22,
            ease: 'back.out(2)',
        })

        gsap.to(button, {
            color,
            borderColor,
            duration: 0.2,
        })

        if (!isMobile) {
            gsap.fromTo(
                tooltip,
                { opacity: 0, x: 6 },
                { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' }
            )
        }
    }

    const handleLeave = () => {
        const button = buttonRef.current
        const tooltip = tooltipRef.current
        if (!button || !tooltip) return

        gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.in',
        })

        gsap.to(button, {
            color: FLOATING_SOCIALS_COLORS.buttonText,
            borderColor: FLOATING_SOCIALS_COLORS.buttonBorder,
            duration: 0.2,
        })

        if (!isMobile) {
            gsap.to(tooltip, {
                opacity: 0,
                x: 6,
                duration: 0.15,
            })
        }
    }

    return (
        <div
            className="social-item"
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {!isMobile && (
                <span
                    ref={tooltipRef}
                    style={{
                        position: 'absolute',
                        right: 'calc(100% + 12px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        opacity: 0,
                        pointerEvents: 'none',
                        fontFamily: 'monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: FLOATING_SOCIALS_COLORS.tooltipText,
                        whiteSpace: 'nowrap',
                        background: FLOATING_SOCIALS_COLORS.tooltipBackground,
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${FLOATING_SOCIALS_COLORS.tooltipBorder}`,
                        padding: '4px 9px',
                        borderRadius: 6,
                    }}
                >
          {label}
        </span>
            )}

            <a
                ref={buttonRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                title={label}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? 40 : 36,
                    height: isMobile ? 40 : 36,
                    borderRadius: 10,
                    background: FLOATING_SOCIALS_COLORS.buttonBackground,
                    border: `1px solid ${FLOATING_SOCIALS_COLORS.buttonBorder}`,
                    color: FLOATING_SOCIALS_COLORS.buttonText,
                    textDecoration: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                }}
            >
                <span aria-hidden='true'>{icon}</span>
            </a>
        </div>
    )
}