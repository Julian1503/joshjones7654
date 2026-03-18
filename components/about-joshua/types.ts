import type { ReactNode } from 'react'

export type PlatformType = 'youtube' | 'ps5'

export interface ChapterItem {
    num: string
    title: string
    body: ReactNode
    align?: 'left' | 'right'
    platform?: PlatformType
}