'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { PAGE_INDEX_COLORS } from '@/components/page-index/constants'
import type { PageIndexSectionItem } from '@/components/page-index/types'
import { CardThumbnail } from '@/components/page-index/components/CardThumbnail'
import { CardContent } from '@/components/page-index/components/CardContent'

type IndexCardProps = {
    section: PageIndexSectionItem
    isLastColumn: boolean
    isMobile: boolean
}

export function IndexCard({
                              section,
                              isLastColumn,
                              isMobile,
                          }: IndexCardProps) {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const thumbWrapRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const closedHeightRef = useRef<number>(0)

    useEffect(() => {
        if (!thumbWrapRef.current) return
        closedHeightRef.current = thumbWrapRef.current.offsetHeight
    }, [])

    const handleEnter = () => {
        const closedHeight = closedHeightRef.current
        const expandedHeight = closedHeight * 1.55

        gsap.to(linkRef.current, {
            color: 'rgba(255,255,255,0.9)',
            duration: 0.2,
        })

        gsap.to(barRef.current, {
            scaleX: 1,
            duration: 0.38,
            ease: 'power2.out',
        })

        gsap.to(backgroundRef.current, {
            opacity: 1,
            duration: 0.3,
        })

        gsap.to(arrowRef.current, {
            x: 4,
            y: -4,
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
        })

        gsap.to(overlayRef.current, {
            opacity: 0.15,
            duration: 0.3,
        })

        if (thumbWrapRef.current && closedHeight > 0) {
            gsap.to(thumbWrapRef.current, {
                height: expandedHeight,
                duration: 0.55,
                ease: 'power3.out',
            })
        }

        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1.08,
                duration: 0.6,
                ease: 'power2.out',
            })
        }
    }

    const handleLeave = () => {
        const closedHeight = closedHeightRef.current

        gsap.to(linkRef.current, {
            color: 'rgba(255,255,255,0.62)',
            duration: 0.25,
        })

        gsap.to(barRef.current, {
            scaleX: 0,
            duration: 0.28,
            ease: 'power2.in',
        })

        gsap.to(backgroundRef.current, {
            opacity: 0,
            duration: 0.3,
        })

        gsap.to(arrowRef.current, {
            x: 0,
            y: 0,
            opacity: 0.3,
            duration: 0.3,
        })

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
        })

        if (thumbWrapRef.current && closedHeight > 0) {
            gsap.to(thumbWrapRef.current, {
                height: closedHeight,
                duration: 0.5,
                ease: 'power3.inOut',
            })
        }

        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
            })
        }
    }

    return (
        <Link
            href={section.href}
            ref={linkRef}
            className="index-card"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: 'clamp(1.2rem, 2.2vw, 2rem) clamp(1.2rem, 2vw, 1.8rem) clamp(1.4rem, 2.5vw, 2.2rem)',
                borderRight: !isMobile && !isLastColumn ? `1px solid ${PAGE_INDEX_COLORS.border}` : 'none',
                borderBottom: isMobile ? `1px solid ${PAGE_INDEX_COLORS.border}` : 'none',
                textDecoration: 'none',
                color: PAGE_INDEX_COLORS.textSoft,
                overflow: 'hidden',
                minHeight: isMobile ? 320 : undefined,
            }}
        >
            <div
                ref={backgroundRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: PAGE_INDEX_COLORS.hoverBackground,
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            <div
                ref={barRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #cc0000, rgba(255,69,69,0.3))',
                    transformOrigin: 'left center',
                    transform: 'scaleX(0)',
                    pointerEvents: 'none',
                }}
            />

            <CardThumbnail
                image={section.image}
                imageRef={imageRef}
                thumbWrapRef={thumbWrapRef}
                overlayRef={overlayRef}
                isMobile={isMobile}
            />

            <CardContent
                section={section}
                arrowRef={arrowRef}
                isMobile={isMobile}
            />
        </Link>
    )
}