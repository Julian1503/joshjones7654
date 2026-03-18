'use client'

import { useEffect, useState } from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX_WIDTH = 767
const TABLET_MAX_WIDTH = 1024

export function useResponsiveSection() {
    const [viewport, setViewport] = useState<Viewport>('desktop')

    useEffect(() => {
        const updateViewport = () => {
            const width = window.innerWidth

            if (width <= MOBILE_MAX_WIDTH) {
                setViewport('mobile')
                return
            }

            if (width <= TABLET_MAX_WIDTH) {
                setViewport('tablet')
                return
            }

            setViewport('desktop')
        }

        updateViewport()
        window.addEventListener('resize', updateViewport)

        return () => window.removeEventListener('resize', updateViewport)
    }, [])

    return {
        viewport,
        isMobile: viewport === 'mobile',
        isTablet: viewport === 'tablet',
        isDesktop: viewport === 'desktop',
    }
}