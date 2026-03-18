'use client'

import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { useBandLabTracks } from '@/components/music-section/hooks/useBandLabTracks'
import { useTrackWindow } from '@/components/music-section/hooks/useTrackWindow'
import { useMusicSectionAnimations } from '@/components/music-section/hooks/useMusicSectionAnimations'
import { useWaveformInteraction } from '@/components/music-section/hooks/useWaveformInteraction'
import { MusicSectionHeader } from '@/components/music-section/components/MusicSectionHeader'
import { MusicWaveform } from '@/components/music-section/components/MusicWaveform'
import { TrackList } from '@/components/music-section/components/TrackList'
import { MusicPlayerPanel } from '@/components/music-section/components/MusicPlayerPanel'
import { LoadingSkeleton } from '@/components/music-section/components/states/LoadingSkeleton'
import { ErrorState } from '@/components/music-section/components/states/ErrorState'
import { EmptyState } from '@/components/music-section/components/states/EmptyState'

export function MusicSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const waveRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const barRefs = useRef<(HTMLDivElement | null)[]>([])

    const { isMobile } = useResponsiveSection()
    const { tracks, loading, error } = useBandLabTracks()


    const {
        activeIndex,
        setActiveIndex,
        visibleTracks,
        startIndex,
        canGoUp,
        canGoDown,
        showPreviousTracks,
        showNextTracks,
        activeTrack,
    } = useTrackWindow(tracks)

    useMusicSectionAnimations({
        sectionRef,
        headerRef,
        waveRef,
        playerRef,
        scanRef,
        glowRef,
        barRefs,
        isMobile,
    })

    useWaveformInteraction({
        waveRef,
        barRefs,
    })

    const switchTrack = useCallback(
        (index: number) => {
            if (index === activeIndex) return

            gsap.to(playerRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.18,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveIndex(index)
                    gsap.to(playerRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.32,
                        ease: 'power2.out',
                    })
                },
            })
        },
        [activeIndex, setActiveIndex]
    )

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                background: '#000',
                overflow: 'hidden',
                padding: 'clamp(5rem, 9vw, 9rem) 0',
                borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.025,
                }}
            />

            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-8%',
                    width: isMobile ? '80vw' : 'min(55vw,600px)',
                    height: isMobile ? '80vw' : 'min(55vw,600px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle,rgba(180,0,0,0.18) 0%,transparent 68%)',
                    filter: 'blur(65px)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0.35,
                }}
            />

            <div
                ref={scanRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                        'linear-gradient(90deg,transparent,#cc0000 25%,#ff4545 50%,#cc0000 75%,transparent)',
                    zIndex: 10,
                    boxShadow: '0 0 24px rgba(255,45,45,0.6)',
                    opacity: 0,
                }}
            />

            <div
                style={{
                    width: isMobile
                        ? 'calc(100% - 2rem)'
                        : 'min(1200px, calc(100% - clamp(2rem,8vw,7rem)))',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(3rem,5vw,5rem)',
                }}
            >
                <MusicSectionHeader headerRef={headerRef} isMobile={isMobile} />

                <MusicWaveform
                    waveRef={waveRef}
                    barRefs={barRefs}
                    isMobile={isMobile}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <ErrorState error={error} />
                ) : tracks.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'clamp(220px,30%,340px) 1fr',
                            gap: 'clamp(1.5rem,3vw,3rem)',
                            alignItems: 'start',
                        }}
                    >
                        <TrackList
                            visibleTracks={visibleTracks}
                            startIndex={startIndex}
                            activeIndex={activeIndex}
                            canGoUp={canGoUp}
                            canGoDown={canGoDown}
                            onShowPreviousAction={showPreviousTracks}
                            onShowNextAction={showNextTracks}
                            onSelectTrackAction={switchTrack}
                        />

                        <MusicPlayerPanel
                            playerRef={playerRef}
                            activeTrack={activeTrack}
                        />
                    </div>
                )}
            </div>
        </section>
    )
}