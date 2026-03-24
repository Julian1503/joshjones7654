import { ImageResponse } from 'next/og'
import { SocialImageTemplate } from '@/lib/seo/social-image-template'

export const alt = 'Joshua website social preview'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/webp'

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <SocialImageTemplate
                eyebrow="The Better Day"
                title="Joshua"
                subtitle="Gaming, music, story, and everyday progress supported by The Better Day community."
                bottomLeft="YouTube • BandLab • Community"
                bottomRight="joshua"
            />
        ),
        size
    )
}