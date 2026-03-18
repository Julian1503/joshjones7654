import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Joshua | The Better Day',
    short_name: 'Joshua',
    description:
      "Joshua's story, videos, games, and music, powered by The Better Day support community.",
    start_url: '/',
    display: 'standalone',
    background_color: '#070809',
    theme_color: '#070809',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

