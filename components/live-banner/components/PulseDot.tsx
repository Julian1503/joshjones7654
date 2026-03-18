'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function PulseDot() {
    const ringOneRef = useRef<HTMLDivElement>(null)
    const ringTwoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ringOneTween = gsap.to(ringOneRef.current, {
            scale: 2.8,
            opacity: 0,
            duration: 1.6,
            ease: 'power2.out',
            repeat: -1,
            repeatDelay: 0.2,
        })

        const ringTwoTween = gsap.to(ringTwoRef.current, {
            scale: 2.2,
            opacity: 0,
            duration: 1.6,
            ease: 'power2.out',
            repeat: -1,
            repeatDelay: 0.2,
            delay: 0.5,
        })

        return () => {
            ringOneTween.kill()
            ringTwoTween.kill()
        }
    }, [])

    return (
        <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
            <div
                ref={ringOneRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(255,30,30,0.5)',
                    transformOrigin: 'center',
                }}
            />
            <div
                ref={ringTwoRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(255,30,30,0.35)',
                    transformOrigin: 'center',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: 1,
                    borderRadius: '50%',
                    background: '#ff2020',
                    boxShadow: '0 0 6px #ff2020',
                }}
            />
        </div>
    )
}