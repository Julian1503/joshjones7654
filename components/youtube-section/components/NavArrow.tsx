'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type NavArrowProps = {
    direction: 'prev' | 'next'
    disabled: boolean
    onClickAction: () => void
    isMobile: boolean
}

export function NavArrow({
                             direction,
                             disabled,
                             onClickAction,
                             isMobile,
                         }: NavArrowProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const element = buttonRef.current
        if (!element || disabled) return

        const timeline = gsap.timeline({ paused: true })
        timeline.to(element, { scale: 1.08, duration: 0.18, ease: 'power2.out' })

        const handleMouseEnter = () => timeline.play()
        const handleMouseLeave = () => timeline.reverse()

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
            timeline.kill()
        }
    }, [disabled])

    return (
        <button
            ref={buttonRef}
            onClick={onClickAction}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 44 : 52,
                height: isMobile ? 44 : 52,
                borderRadius: '50%',
                background: disabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${disabled ? 'rgba(255,255,255,0.06)' : 'rgba(255,69,69,0.3)'}`,
                color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                cursor: disabled ? 'default' : 'pointer',
                outline: 'none',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
                boxShadow: disabled ? 'none' : '0 0 18px rgba(220,30,30,0.1)',
            }}
            onMouseEnter={(event) => {
                if (disabled) return
                event.currentTarget.style.background = 'rgba(255,69,69,0.12)'
                event.currentTarget.style.boxShadow = '0 0 28px rgba(220,30,30,0.2)'
            }}
            onMouseLeave={(event) => {
                if (disabled) return
                event.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                event.currentTarget.style.boxShadow = '0 0 18px rgba(220,30,30,0.1)'
            }}
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                {direction === 'prev' ? (
                    <path
                        d="M11 4L6 9L11 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ) : (
                    <path
                        d="M7 4L12 9L7 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </button>
    )
}