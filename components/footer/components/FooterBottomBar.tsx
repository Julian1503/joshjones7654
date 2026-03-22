'use client'

type FooterBottomBarProps = {
    bottomRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function FooterBottomBar({
                                    bottomRef,
                                    isMobile,
                                }: FooterBottomBarProps) {
    return (
        <div
            ref={bottomRef}
            style={{
                position: 'relative',
                zIndex: 2,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: 'clamp(1.2rem, 2vw, 1.8rem) clamp(1.4rem, 4vw, 3.5rem)',
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: 12,
            }}
        >
      <span
          style={{
              fontFamily: 'monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginLeft: 'auto',
          }}
      >
        © {new Date().getFullYear()}{' '}
          <a
              style={{ color: '#cc0000' }}
              href="http://juliandelgado.com.au/about-me"
              target="_blank"
              rel="noopener noreferrer"
          >
          Julian Delgado
        </a>{' '}
          — All rights reserved
      </span>

            <span
                style={{
                    fontFamily: 'monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.1)',
                    marginLeft: 'auto',
                }}
            >
        Toowoomba, AU
      </span>
        </div>
    )
}