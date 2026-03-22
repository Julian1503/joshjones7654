'use client'

import { useEffect, useRef } from 'react'

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const animationFrameRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        let width = 0
        let height = 0

        type Particle = {
            x: number
            y: number
            vx: number
            vy: number
            ox: number
            oy: number
            r: number
            alpha: number
        }

        let particles: Particle[] = []

        const particleColor = '255,160,160'
        const lineColor = '255,120,120'

        const initializeParticles = () => {
            const count = Math.floor((width * height) / 9000)

            particles = Array.from({ length: count }, () => {
                const x = Math.random() * width
                const y = Math.random() * height

                return {
                    x,
                    y,
                    ox: x,
                    oy: y,
                    vx: (Math.random() - 0.5) * 0.18,
                    vy: (Math.random() - 0.5) * 0.18,
                    r: Math.random() * 1.4 + 0.5,
                    alpha: Math.random() * 0.35 + 0.35,
                }
            })
        }

        const resizeCanvas = () => {
            width = canvas.width = canvas.offsetWidth
            height = canvas.height = canvas.offsetHeight
            initializeParticles()
        }

        const connectDistance = 110
        const repelDistance = 90
        const repelStrength = 2.8

        const draw = () => {
            context.clearRect(0, 0, width, height)

            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y

            for (const particle of particles) {
                particle.vx += (particle.ox - particle.x) * 0.0012
                particle.vy += (particle.oy - particle.y) * 0.0012

                const dx = particle.x - mouseX
                const dy = particle.y - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < repelDistance && distance > 0) {
                    const force = (1 - distance / repelDistance) * repelStrength
                    particle.vx += (dx / distance) * force
                    particle.vy += (dy / distance) * force
                }

                particle.vx *= 0.92
                particle.vy *= 0.92
                particle.x += particle.vx
                particle.y += particle.vy
            }

            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const a = particles[i]
                    const b = particles[j]
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const distanceSquared = dx * dx + dy * dy

                    if (distanceSquared < connectDistance * connectDistance) {
                        const t = 1 - Math.sqrt(distanceSquared) / connectDistance

                        context.beginPath()
                        context.moveTo(a.x, a.y)
                        context.lineTo(b.x, b.y)
                        context.strokeStyle = `rgba(${lineColor},${t * 0.45})`
                        context.lineWidth = Math.max(t, 0.35)
                        context.stroke()
                    }
                }
            }

            for (const particle of particles) {
                context.beginPath()
                context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
                context.fillStyle = `rgba(${particleColor},${particle.alpha})`
                context.fill()
            }

            animationFrameRef.current = requestAnimationFrame(draw)
        }

        const resizeObserver = new ResizeObserver(resizeCanvas)
        resizeObserver.observe(canvas)

        resizeCanvas()
        draw()

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 }
        }

        const sectionElement = canvas.closest('section')
        sectionElement?.addEventListener('mousemove', handleMouseMove)
        sectionElement?.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrameRef.current)
            resizeObserver.disconnect()
            sectionElement?.removeEventListener('mousemove', handleMouseMove)
            sectionElement?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}