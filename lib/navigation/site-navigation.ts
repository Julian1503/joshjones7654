export const SECTION_ANCHORS = {
  about: '#about-me',
  videos: '#videos',
  gaming: '#gaming',
  music: '#music',
  theBetterDay: '#the-better-day',
} as const

export type SectionAnchorKey = keyof typeof SECTION_ANCHORS

export type MenuSectionItem = {
  key: SectionAnchorKey
  index: string
  label: string
  sublabel: string
  href: string
}

export const MENU_SECTION_ITEMS: MenuSectionItem[] = [
  {
    key: 'about',
    index: '01',
    label: 'Joshua',
    sublabel: 'His story',
    href: SECTION_ANCHORS.about,
  },
  {
    key: 'videos',
    index: '02',
    label: 'Videos',
    sublabel: 'Latest content',
    href: SECTION_ANCHORS.videos,
  },
  {
    key: 'gaming',
    index: '03',
    label: 'Gaming',
    sublabel: 'What he plays',
    href: SECTION_ANCHORS.gaming,
  },
  {
    key: 'music',
    index: '04',
    label: 'Music',
    sublabel: 'What he creates',
    href: SECTION_ANCHORS.music,
  },
  {
    key: 'theBetterDay',
    index: '05',
    label: 'The Better Day',
    sublabel: 'Who we are',
    href: SECTION_ANCHORS.theBetterDay,
  },
]

export const MENU_SECTION_ITEM_BY_KEY = Object.fromEntries(
  MENU_SECTION_ITEMS.map((item) => [item.key, item])
) as Record<SectionAnchorKey, MenuSectionItem>

export const SOCIAL_LINKS = {
  youtubeJoshua: {
    label: 'YouTube',
    href: 'https://www.youtube.com/@JoshJones-t4q',
  },
  bandLabJoshua: {
    label: 'BandLab',
    href: 'https://bandlab.com/joshua_jones_29',
  },
  facebookJoshua: {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61584056596239',
  },
  youtubeBetterDay: {
    label: 'Youtube',
    href: 'https://www.youtube.com/@TheBetterDayToowoomba/videos',
  },
  facebookBetterDay: {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100090472671177',
  },
  instagramBetterDay: {
    label: 'Instagram',
    href: 'https://www.instagram.com/thebetterday_toowoomba/',
  },
} as const
