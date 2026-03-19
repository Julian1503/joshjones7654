'use client'

type MusicSectionHeaderProps = {
    headerRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function MusicSectionHeader({
                                       headerRef,
                                       isMobile,
                                   }: MusicSectionHeaderProps) {
    return (
        <div
            ref={headerRef}
            style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: 'clamp(1rem,3vw,2rem)',
                opacity: 0,
            }}
        >
            {/* Left — label + title */}
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: '1rem',
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                        <path
                            d="M11 1 L13.5 8.5 L21 11 L13.5 13.5 L11 21 L8.5 13.5 L1 11 L8.5 8.5 Z"
                            fill="#ff4545"
                        />
                    </svg>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.58rem' : 'clamp(0.52rem,0.8vw,0.62rem)',
                            letterSpacing: isMobile ? '0.2em' : '0.36em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,69,69,0.75)',
                        }}
                    >
                        Music by Joshua
                    </span>
                </div>

                <h2
                    style={{
                        margin: 0,
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? 'clamp(2.8rem,14vw,4.8rem)' : 'clamp(3rem,9vw,8.5rem)',
                        letterSpacing: '0.04em',
                        lineHeight: 0.9,
                        color: 'rgba(255,255,255,0.93)',
                    }}
                >
                    HIS
                    <br />
                    <span
                        style={{
                            color: '#cc0000',
                            textShadow: '0 0 80px rgba(200,0,0,0.4)',
                        }}
                    >
                        SOUND
                    </span>
                </h2>
            </div>

            {/* Right — description + link */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'clamp(1rem,2vw,1.5rem)',
                    maxWidth: isMobile ? '100%' : '38ch',
                    flexShrink: 0,
                    paddingBottom: isMobile ? 0 : '0.4rem',
                }}
            >
                <p
                    style={{
                        margin: 0,
                        color: 'rgba(255,255,255,0.52)',
                        fontSize: isMobile ? '0.95rem' : 'clamp(0.92rem,1.1vw,1rem)',
                        lineHeight: 1.75,
                    }}
                >
                    Joshua loves to sing in his room and play his music through the speakers
                    to show everyone how deeply he feels the rhythm.
                </p>

                <a
                    href="https://www.bandlab.com/joshua_jones_29"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 9,
                        padding: '8px 18px',
                        borderRadius: 100,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.58rem' : 'clamp(0.55rem,0.8vw,0.62rem)',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)',
                        textDecoration: 'none',
                        transition: 'background 0.2s,border-color 0.2s,color 0.2s',
                        flexShrink: 0,
                    }}
                    onMouseEnter={(event) => {
                        event.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                        event.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                        event.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                    }}
                    onMouseLeave={(event) => {
                        event.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                        event.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                    }}
                >
                    View on BandLab ↗
                </a>
            </div>
        </div>
    )
}