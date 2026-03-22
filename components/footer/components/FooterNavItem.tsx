'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

type FooterNavItemProps = {
    label: string
    href: string
    external: boolean
}

export function FooterNavItem({
                                  label,
                                  href,
                                  external,
                              }: FooterNavItemProps) {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const dotRef = useRef<HTMLSpanElement>(null)

    const handleEnter = () => {
        gsap.to(linkRef.current, {
            x: 6,
            color: 'rgba(255,255,255,0.75)',
            duration: 0.22,
            ease: 'power2.out',
        })

        gsap.to(dotRef.current, {
            scaleX: 1.6,
            background: '#ff4545',
            duration: 0.22,
        })
    }

    const handleLeave = () => {
        gsap.to(linkRef.current, {
            x: 0,
            color: 'rgba(255,255,255,0.3)',
            duration: 0.28,
            ease: 'power2.out',
        })

        gsap.to(dotRef.current, {
            scaleX: 1,
            background: 'rgba(255,255,255,0.2)',
            duration: 0.25,
        })
    }

    const sharedStyle: React.CSSProperties = {
        fontFamily: 'monospace',
        fontSize: 'clamp(0.58rem, 0.82vw, 0.68rem)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        cursor: 'pointer',
    }

    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
          ref={dotRef}
          style={{
              display: 'block',
              width: 4,
              height: 1,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.4)',
              flexShrink: 0,
              transformOrigin: 'left center',
          }}
      />

            {external ? (
                <a
                    href={href}
                    ref={linkRef}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    style={sharedStyle}
                >
                    {label}
                </a>
            ) : (
                <Link
                    href={href}
                    ref={linkRef}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    style={sharedStyle}
                >
                    {label}
                </Link>
            )}
        </li>
    )
}