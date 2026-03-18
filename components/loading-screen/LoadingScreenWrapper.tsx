'use client'

import { LoadingScreen } from '@/components/loading-screen/LoadingScreen'
import { useLoadingScreen } from '@/components/loading-screen/hooks/useLoadingScreen'

export function LoadingScreenWrapper() {
    const { isVisible, handleComplete } = useLoadingScreen()

    if (!isVisible) return null

    return <LoadingScreen onCompleteAction={handleComplete} />
}