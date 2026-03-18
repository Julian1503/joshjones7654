import type { Pillar } from '@/components/the-better-day/types'

export function updateProgressDots(
    dotElements: Array<HTMLDivElement | null>,
    fillElement: HTMLDivElement | null,
    pillars: readonly Pillar[],
    activeIndex: number
) {
    const activePillar = pillars[activeIndex]
    if (!activePillar) return

    dotElements.forEach((dot, index) => {
        if (!dot) return

        const isActive = index === activeIndex
        dot.style.borderColor = isActive ? activePillar.color : 'rgba(255,255,255,0.2)'
        dot.style.background = isActive ? activePillar.color : 'transparent'
        dot.style.boxShadow = isActive ? `0 0 10px ${activePillar.color}` : 'none'
    })

    if (fillElement) {
        fillElement.style.background = activePillar.color
        fillElement.style.boxShadow = `0 0 6px ${activePillar.color}`
    }
}