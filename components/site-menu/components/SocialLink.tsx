'use client'

type SocialLinkProps = {
    label: string
    href: string
}

export function SocialLink({ label, href }: SocialLinkProps) {
    const handleEnter = (element: HTMLAnchorElement) => {
        element.style.color = 'rgba(255,255,255,0.7)'
    }

    const handleLeave = (element: HTMLAnchorElement) => {
        element.style.color = 'rgba(255,255,255,0.25)'
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            style={{
                fontFamily: 'monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                textDecoration: 'none',
                transition: 'color 0.2s',
            }}
            onMouseEnter={(event) => handleEnter(event.currentTarget)}
            onMouseLeave={(event) => handleLeave(event.currentTarget)}
            onFocus={(event) => handleEnter(event.currentTarget)}
            onBlur={(event) => handleLeave(event.currentTarget)}
        >
            {label}
        </a>
    )
}