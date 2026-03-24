import { ImageResponse } from 'next/og'
import { SocialImageTemplate } from '@/lib/seo/social-image-template'

export const alt = 'Joshua website Twitter social preview'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/webp'

export default function TwitterImage() {
    return new ImageResponse(
        (
            <SocialImageTemplate
                eyebrow="Joshua"
                title="His Sound"
                subtitle="Explore Joshua through gaming, music creation on BandLab, videos, and the support around his journey."
                bottomLeft="BandLab • YouTube • The Better Day"
                bottomRight="story • music • gaming"
            />
        ),
        size
    )
}