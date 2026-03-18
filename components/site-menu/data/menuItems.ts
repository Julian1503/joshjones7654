import { MENU_SECTION_ITEMS, SOCIAL_LINKS } from '@/lib/navigation/site-navigation'
import type { SiteMenuNavItem, SiteMenuSocialItem } from '@/components/site-menu/types'

export const SITE_MENU_NAV_ITEMS: SiteMenuNavItem[] = MENU_SECTION_ITEMS.map((item) => ({
    index: item.index,
    label: item.label,
    sublabel: item.sublabel,
    href: item.href,
}))

export const SITE_MENU_SOCIAL_LINKS: SiteMenuSocialItem[] = [
    {
        label: SOCIAL_LINKS.youtubeJoshua.label,
        href: SOCIAL_LINKS.youtubeJoshua.href,
    },
    {
        label: SOCIAL_LINKS.bandLabJoshua.label,
        href: SOCIAL_LINKS.bandLabJoshua.href,
    },
    {
        label: SOCIAL_LINKS.facebookJoshua.label,
        href: SOCIAL_LINKS.facebookJoshua.href,
    },
]