import type { CSSProperties } from 'react'

type SocialImageTemplateProps = {
    eyebrow: string
    title: string
    subtitle: string
    bottomLeft: string
    bottomRight: string
}

const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    background: '#050606',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
}

const absoluteFill: CSSProperties = {
    position: 'absolute',
    inset: 0,
}

export function SocialImageTemplate({
                                        eyebrow,
                                        title,
                                        subtitle,
                                        bottomLeft,
                                        bottomRight,
                                    }: SocialImageTemplateProps) {
    return (
        <div style={containerStyle}>
            <div
                style={{
                    ...absoluteFill,
                    background:
                        'radial-gradient(circle at 18% 82%, rgba(180,0,0,0.30) 0%, rgba(180,0,0,0.14) 20%, transparent 55%)',
                }}
            />

            <div
                style={{
                    ...absoluteFill,
                    background:
                        'radial-gradient(circle at 68% 22%, rgba(255,69,69,0.14) 0%, transparent 42%)',
                }}
            />

            <div
                style={{
                    ...absoluteFill,
                    opacity: 0.08,
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '100% 8px',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                        'linear-gradient(90deg, transparent, #cc0000 25%, #ff4545 50%, #cc0000 75%, transparent)',
                    boxShadow: '0 0 28px rgba(255,45,45,0.55)',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '64px 72px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                    }}
                >
                    <div
                        style={{
                            width: 42,
                            height: 2,
                            background: 'linear-gradient(90deg, #ff4545, transparent)',
                        }}
                    />
                    <div
                        style={{
                            fontSize: 24,
                            letterSpacing: '0.38em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,69,69,0.86)',
                        }}
                    >
                        {eyebrow}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                        maxWidth: '92%',
                    }}
                >
                    <div
                        style={{
                            fontSize: 190,
                            lineHeight: 0.9,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.94)',
                            textShadow: '0 0 48px rgba(255,255,255,0.08)',
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            fontSize: 34,
                            lineHeight: 1.35,
                            color: 'rgba(255,255,255,0.68)',
                            maxWidth: '900px',
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 24,
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        paddingTop: 24,
                    }}
                >
                    <div
                        style={{
                            fontSize: 22,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.5)',
                        }}
                    >
                        {bottomLeft}
                    </div>

                    <div
                        style={{
                            fontSize: 22,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.26)',
                        }}
                    >
                        {bottomRight}
                    </div>
                </div>
            </div>
        </div>
    )
}