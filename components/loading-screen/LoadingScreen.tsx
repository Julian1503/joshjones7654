'use client'

import { useRef } from 'react'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import type { LoadingScreenProps } from './types'
import { useLoadingDots } from './hooks/useLoadingDots'
import { useLoadingScreenAnimation } from './hooks/useLoadingScreenAnimation'
import { LoadingScreenBackdrop } from './components/LoadingScreenBackdrop'
import { LoadingScreenContent } from './components/LoadingScreenContent'
import { LoadingScreenFooterMeta } from './components/LoadingScreenFooterMeta'

export function LoadingScreen({ onCompleteAction }: LoadingScreenProps) {
    const overlayRef   = useRef<HTMLDivElement>(null)
    const nameRef      = useRef<HTMLDivElement>(null)
    const nameFillRef  = useRef<HTMLDivElement>(null)
    const scanLineRef  = useRef<HTMLDivElement>(null)
    const scanRef      = useRef<HTMLDivElement>(null)
    const labelRef     = useRef<HTMLParagraphElement>(null)
    const glowRef      = useRef<HTMLDivElement>(null)

    const { isMobile } = useResponsiveSection()
    const dots = useLoadingDots()

    useLoadingScreenAnimation({
        overlayRef,
        nameRef,
        nameFillRef,
        scanLineRef,
        scanRef,
        labelRef,
        glowRef,
        onCompleteAction,
    })

    return (
        <div
            ref={overlayRef}
            aria-label="Loading Joshua site"
            aria-live="polite"
            role="status"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: '#070809',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <LoadingScreenBackdrop
                glowRef={glowRef}
                scanRef={scanRef}
                isMobile={isMobile}
            />

            <LoadingScreenContent
                nameRef={nameRef}
                nameFillRef={nameFillRef}
                scanLineRef={scanLineRef}
                labelRef={labelRef}
                dots={dots}
                isMobile={isMobile}
            />

            <LoadingScreenFooterMeta isMobile={isMobile} />
        </div>
    )
}