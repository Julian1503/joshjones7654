'use client'

import { useRef } from 'react'

type SocialLinkProps = {
    label: string
    href: string
}

export function SocialLink({ label, href }: SocialLinkProps) {
    const linkRef = useRef<HTMLAnchorElement>(null)

    return (
        <a
            ref={linkRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                fontFamily: 'monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                textDecoration: 'none',
                transition: 'color 0.2s',
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.color = 'rgba(255,255,255,0.25)'
            }}
        >
            {label}
        </a>
    )
}