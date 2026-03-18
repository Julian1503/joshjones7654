'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { YouTubeIcon } from '@/components/about-joshua/components/YouTubeIcon'
import PS5Icon from '@/components/about-joshua/components/PS5Icon'
import type { PlatformType } from '@/components/about-joshua/types'

type PlatformRevealProps = {
    platform: PlatformType
    side: 'left' | 'right'
    trigger: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
    isTablet: boolean
}

export function PlatformReveal({
                                   platform,
                                   side,
                                   trigger,
                                   isMobile,
                                   isTablet,
                               }: PlatformRevealProps) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)

    const isYouTube = platform === 'youtube'
    const color = isYouTube ? '#FF0000' : '#2563ff'
    const colorSoft = isYouTube ? 'rgba(255,0,0,0.2)' : 'rgba(37,99,255,0.22)'

    useEffect(() => {
        if (!trigger.current || !wrapRef.current) return

        gsap.set(wrapRef.current, {
            x: side === 'left' ? -60 : 60,
            opacity: 0,
            filter: 'blur(14px)',
            scale: 0.82,
        })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: trigger.current,
                start: 'top 72%',
            },
        })

        timeline.to(wrapRef.current, {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
        })

        timeline.fromTo(
            ringRef.current,
            { scale: 1, opacity: 0.7 },
            { scale: 2.2, opacity: 0, duration: 0.9, ease: 'power2.out' },
            '-=0.3'
        )

        timeline.to(
            glowRef.current,
            { opacity: 1, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 },
            '-=0.8'
        )

        timeline.fromTo(
            iconRef.current,
            { y: 0 },
            { y: -7, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 },
            '-=0.55'
        )

        return () => {
            timeline.kill()
        }
    }, [side, trigger])

    useEffect(() => {
        const tween = gsap.to(wrapRef.current, {
            y: '+=8',
            duration: 2.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 1.5,
        })

        return () => {
            tween.kill()
        }
    }, [])

    return (
        <div
            ref={wrapRef}
            style={{
                position: 'absolute',
                top: isMobile ? '1rem' : '50%',
                [side]: isMobile ? '0.2rem' : isTablet ? '-2rem' : '-4.8rem',
                transform: isMobile ? 'none' : 'translateY(-50%)',
                width: isMobile ? 52 : isTablet ? 58 : 68,
                height: isMobile ? 52 : isTablet ? 58 : 68,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                zIndex: 10,
            }}
        >
            <div
                ref={ringRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `1.5px solid ${color}`,
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: -16,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colorSoft} 0%, transparent 72%)`,
                    filter: 'blur(10px)',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />
            <div
                ref={iconRef}
                style={{
                    position: 'relative',
                    filter: `drop-shadow(0 0 12px ${color}99)`,
                }}
            >
                {isYouTube ? (
                    <YouTubeIcon size={isMobile ? 28 : 36} />
                ) : (
                    <PS5Icon size={isMobile ? 50 : 60} />
                )}
            </div>
        </div>
    )
}