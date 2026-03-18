import type { ReactNode } from 'react'

export interface SocialItem {
    id: string
    label: string
    href: string
    color: string
    borderColor: string
    icon: ReactNode
}