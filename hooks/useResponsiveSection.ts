'use client'

import { useEffect, useState } from 'react'

type Viewport = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX_WIDTH = 767
const TABLET_MAX_WIDTH = 1024

export function useResponsiveSection() {
    const [viewport, setViewport] = useState<Viewport>('desktop')

    useEffect(() => {
        const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
        const tabletQuery = window.matchMedia(
            `(min-width: ${MOBILE_MAX_WIDTH + 1}px) and (max-width: ${TABLET_MAX_WIDTH}px)`
        )

        const resolveViewport = (): Viewport => {
            if (mobileQuery.matches) return 'mobile'
            if (tabletQuery.matches) return 'tablet'
            return 'desktop'
        }

        const updateViewport = () => setViewport(resolveViewport())

        updateViewport()

        mobileQuery.addEventListener('change', updateViewport)
        tabletQuery.addEventListener('change', updateViewport)

        return () => {
            mobileQuery.removeEventListener('change', updateViewport)
            tabletQuery.removeEventListener('change', updateViewport)
        }
    }, [])

    return {
        viewport,
        isMobile: viewport === 'mobile',
        isTablet: viewport === 'tablet',
        isDesktop: viewport === 'desktop',
    }
}