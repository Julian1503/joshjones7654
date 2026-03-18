import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Joshua website preview image'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(135deg, #070809 0%, #0c0e10 60%, #171b1f 100%)',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,107,107,0.95)',
            marginBottom: 26,
          }}
        >
          Joshua
        </div>

        <div
          style={{
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          Story, Gaming, Music, and Community
        </div>

        <div
          style={{
            marginTop: 26,
            fontSize: 30,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '900px',
          }}
        >
          The Better Day support network behind his journey.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

