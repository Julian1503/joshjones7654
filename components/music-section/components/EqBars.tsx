'use client'

export function EqBars() {
    return (
        <>
            <style>{`
        @keyframes eq0 { 0%,100%{height:40%} 50%{height:90%} }
        @keyframes eq1 { 0%,100%{height:80%} 50%{height:30%} }
        @keyframes eq2 { 0%,100%{height:55%} 50%{height:95%} }
      `}</style>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
                {['eq0', 'eq1', 'eq2'].map((keyframe, index) => (
                    <div
                        key={keyframe}
                        style={{
                            width: 2,
                            borderRadius: 1,
                            background: '#ff4545',
                            animation: `${keyframe} 0.65s ease-in-out ${index * 0.15}s infinite alternate`,
                        }}
                    />
                ))}
            </div>
        </>
    )
}