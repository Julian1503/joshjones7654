'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import type { SiteMenuNavItem } from '@/components/site-menu/types'

type MenuLinkProps = {
    item: SiteMenuNavItem
    onClickAction: () => void
    isLast: boolean
    isMobile: boolean
}

export function MenuLink({
                             item,
                             onClickAction,
                             isLast,
                             isMobile,
                         }: MenuLinkProps) {
    const fillRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef<HTMLSpanElement>(null)
    const labelRef = useRef<HTMLSpanElement>(null)
    const sublabelRef = useRef<HTMLSpanElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)

    const handleEnter = () => {
        gsap.to(fillRef.current, {
            scaleY: 1,
            duration: 0.4,
            ease: 'power3.out',
        })
        gsap.to(labelRef.current, {
            x: 12,
            duration: 0.35,
            ease: 'power2.out',
        })
        gsap.to(indexRef.current, {
            color: '#ff4545',
            duration: 0.2,
        })
        gsap.to(sublabelRef.current, {
            x: 12,
            color: 'rgba(255,255,255,0.45)',
            duration: 0.35,
            ease: 'power2.out',
        })
        gsap.to(arrowRef.current, {
            x: 6,
            y: -6,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
        })
    }

    const handleLeave = () => {
        gsap.to(fillRef.current, {
            scaleY: 0,
            duration: 0.35,
            ease: 'power3.inOut',
        })
        gsap.to(labelRef.current, {
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
        })
        gsap.to(indexRef.current, {
            color: 'rgba(255,69,69,0.4)',
            duration: 0.25,
        })
        gsap.to(sublabelRef.current, {
            x: 0,
            color: 'rgba(255,255,255,0.2)',
            duration: 0.4,
            ease: 'power2.out',
        })
        gsap.to(arrowRef.current, {
            x: 0,
            y: 0,
            opacity: 0,
            duration: 0.25,
        })
    }

    return (
        <div
            className="menu-link-wrap"
            style={{
                borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
                overflow: 'hidden',
            }}
        >
            <Link
                href={item.href}
                onClick={onClickAction}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onFocus={handleEnter}
                onBlur={handleLeave}
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: 'clamp(0.75rem, 2vh, 1.2rem) 0',
                    textDecoration: 'none',
                    color: 'inherit',
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={fillRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(180,0,0,0.07)',
                        transformOrigin: 'bottom center',
                        transform: 'scaleY(0)',
                        pointerEvents: 'none',
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: isMobile ? 'flex-start' : 'baseline',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '0.35rem' : 'clamp(1rem, 2.5vw, 2rem)',
                        minWidth: 0,
                    }}
                >
          <span
              ref={indexRef}
              style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.5rem, 0.8vw, 0.6rem)',
                  letterSpacing: '0.22em',
                  color: 'rgba(255,69,69,0.4)',
                  flexShrink: 0,
                  minWidth: '2ch',
              }}
          >
            {item.index}
          </span>

                    <span
                        ref={labelRef}
                        style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                            letterSpacing: '0.04em',
                            lineHeight: 1,
                            color: 'rgba(255,255,255,0.88)',
                            display: 'block',
                        }}
                    >
            {item.label}
          </span>

                    <span
                        ref={sublabelRef}
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 'clamp(0.5rem, 0.75vw, 0.6rem)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.2)',
                            display: 'block',
                            alignSelf: isMobile ? 'flex-start' : 'center',
                        }}
                    >
            {item.sublabel}
          </span>
                </div>

                <span
                    ref={arrowRef}
                    style={{
                        fontFamily: 'monospace',
                        paddingRight: '2rem',
                        fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)',
                        color: 'rgba(255,255,255,0.6)',
                        opacity: 0,
                        flexShrink: 0,
                        position: 'relative',
                    }}
                >
          ↗
        </span>
            </Link>
        </div>
    )
}