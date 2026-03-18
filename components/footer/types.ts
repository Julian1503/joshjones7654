export type FooterNavLink = {
    label: string
    href: string
    external?: boolean
}

export type FooterNavGroup = {
    group: string
    links: FooterNavLink[]
}