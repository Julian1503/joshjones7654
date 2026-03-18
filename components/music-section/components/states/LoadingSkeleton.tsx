'use client'

export function LoadingSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2, 3, 4].map((item) => (
                <div
                    key={item}
                    style={{
                        height: 56,
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.04)',
                        animation: 'shimmer 1.4s linear infinite',
                        backgroundImage:
                            'linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.04) 75%)',
                        backgroundSize: '600px 100%',
                    }}
                />
            ))}

            <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0 }
          100% { background-position: 600px 0 }
        }
      `}</style>
        </div>
    )
}