'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { BandLabTrack } from '@/components/music-section/types'
import { formatPlayCount } from '@/components/music-section/constants'
import { EqBars } from '@/components/music-section/components/EqBars'

type TrackRowProps = {
    track: BandLabTrack
    index: number
    isActive: boolean
    onClickAction: () => void
}

export function TrackRow({
                             track,
                             index,
                             isActive,
                             onClickAction,
                         }: TrackRowProps) {
    const rowRef = useRef<HTMLButtonElement>(null)
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rowRef.current || !barRef.current) return

        if (isActive) {
            gsap.to(barRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.out' })
            gsap.to(rowRef.current, { background: 'rgba(200,0,0,0.08)', duration: 0.3 })
        } else {
            gsap.to(barRef.current, { scaleX: 0, duration: 0.3, ease: 'power2.in' })
            gsap.to(rowRef.current, { background: 'transparent', duration: 0.3 })
        }
    }, [isActive])

    return (
        <button
            ref={rowRef}
            onClick={onClickAction}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 'clamp(0.9rem,1.5vw,1.2rem) clamp(1rem,1.5vw,1.4rem)',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none',
                width: '100%',
            }}
            onMouseEnter={(event) => {
                if (!isActive) event.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
            onMouseLeave={(event) => {
                if (!isActive) event.currentTarget.style.background = 'transparent'
            }}
        >
            <div
                ref={barRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: 'linear-gradient(to bottom,#ff4545,rgba(180,0,0,0.5))',
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                }}
            />

            <span
                style={{
                    fontFamily: 'monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    color: isActive ? 'rgba(255,69,69,0.8)' : 'rgba(255,255,255,0.2)',
                    minWidth: 20,
                    transition: 'color 0.2s',
                }}
            >
        {String(index + 1).padStart(2, '0')}
      </span>

            <div
                style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: track.cover
                        ? 'transparent'
                        : isActive
                            ? 'rgba(200,0,0,0.2)'
                            : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${
                        isActive ? 'rgba(255,69,69,0.35)' : 'rgba(255,255,255,0.08)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                }}
            >
                {track.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={track.cover}
                        alt={track.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : isActive ? (
                    <EqBars />
                ) : (
                    <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
                        <path d="M1 1L7 4.5L1 8V1Z" fill="rgba(255,255,255,0.5)" />
                    </svg>
                )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
        <span
            style={{
                display: 'block',
                fontFamily: '"Bebas Neue",sans-serif',
                fontSize: 'clamp(0.9rem,1.3vw,1.1rem)',
                letterSpacing: '0.07em',
                color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
            }}
        >
          {track.title}
        </span>

                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '0.48rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.2)',
                    }}
                >
          {track.duration} · ▶ {formatPlayCount(track.plays)}
        </span>
            </div>
        </button>
    )
}