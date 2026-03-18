'use client'

type ErrorStateProps = {
    error: string
}

export function ErrorState({ error }: ErrorStateProps) {
    return (
        <div
            style={{
                padding: '2rem',
                borderRadius: 10,
                border: '1px solid rgba(255,69,69,0.15)',
                background: 'rgba(255,69,69,0.05)',
                fontFamily: 'monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,100,100,0.6)',
                textAlign: 'center',
            }}
        >
            {error} —{' '}
            <a
                href="https://www.bandlab.com/joshua_jones_29"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff4545' }}
            >
                listen on BandLab ↗
            </a>
        </div>
    )
}