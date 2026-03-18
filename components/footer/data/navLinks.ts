import type { FooterNavGroup } from '@/components/footer/types'

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
    {
        group: 'Joshua',
        links: [
            { label: 'His Story', href: '#about-me' },
            { label: 'Gaming', href: '#gaming' },
            { label: 'Videos', href: '#videos' },
        ],
    },
    {
        group: 'The Better Day',
        links: [
            { label: 'Who We Are', href: '#about' },
            { label: 'Our Mission', href: '#mission' },
            { label: 'Get in Touch', href: '#contact' },
        ],
    },
    {
        group: 'Follow',
        links: [
            {
                label: 'YouTube',
                href: 'https://youtube.com/@thebetterday',
                external: true,
            },
            {
                label: 'Instagram',
                href: 'https://instagram.com/',
                external: true,
            },
            {
                label: 'TikTok',
                href: 'https://tiktok.com/',
                external: true,
            },
        ],
    },
]