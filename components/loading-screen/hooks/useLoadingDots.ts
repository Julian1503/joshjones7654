'use client'

import { useEffect, useState } from 'react'

const DOT_FRAMES = ['.', '..', '...']

export function useLoadingDots() {
    const [dots, setDots] = useState('...')

    useEffect(() => {
        let frameIndex = 2

        const intervalId = window.setInterval(() => {
            frameIndex = (frameIndex + 1) % DOT_FRAMES.length
            setDots(DOT_FRAMES[frameIndex])
        }, 380)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [])

    return dots
}