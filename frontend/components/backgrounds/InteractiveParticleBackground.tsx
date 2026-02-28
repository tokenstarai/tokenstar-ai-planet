'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from '@/components/ThemeProvider'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleConfig {
  count: number
  maxDistance: number
  particleColor: string
  lineColor: string
  particleAlpha: number
  lineAlpha: number
  speed: number
  fps: number
  mouseRadius: number
  mouseStrength: number
}

function getDarkConfig(): ParticleConfig {
  return {
    count: 0, // will be set dynamically
    maxDistance: 130,
    particleColor: '100, 180, 255',   // cyan-blue
    lineColor: '120, 160, 255',        // blue-purple
    particleAlpha: 0.55,
    lineAlpha: 0.12,
    speed: 0.35,
    fps: 30,
    mouseRadius: 120,
    mouseStrength: 0.04,
  }
}

function getLightConfig(): ParticleConfig {
  return {
    count: 0,
    maxDistance: 130,
    particleColor: '80, 120, 200',    // indigo-blue
    lineColor: '100, 140, 210',
    particleAlpha: 0.30,
    lineAlpha: 0.06,
    speed: 0.30,
    fps: 30,
    mouseRadius: 120,
    mouseStrength: 0.03,
  }
}

export function InteractiveParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const lastFrameRef = useRef<number>(0)
  const pausedRef = useRef<boolean>(false)
  const configRef = useRef<ParticleConfig>(getDarkConfig())

  // Check prefers-reduced-motion
  const prefersReduced = useRef<boolean>(false)

  const getParticleCount = useCallback((width: number): number => {
    const isMobile = width < 768
    const isLowDpi = window.devicePixelRatio < 1.5
    if (isMobile) return isLowDpi ? 40 : 55
    return isLowDpi ? 100 : 130
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount(width)
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * configRef.current.speed * 2,
      vy: (Math.random() - 0.5) * configRef.current.speed * 2,
      radius: Math.random() * 1.5 + 0.8,
    }))
  }, [getParticleCount])

  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const cfg = configRef.current
    const isMobile = width < 768
    ctx.clearRect(0, 0, width, height)

    const particles = particlesRef.current
    const mouse = mouseRef.current

    // Update positions
    for (const p of particles) {
      // Mouse interaction (desktop only)
      if (!isMobile) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < cfg.mouseRadius && dist > 0) {
          const force = (cfg.mouseRadius - dist) / cfg.mouseRadius * cfg.mouseStrength
          p.vx -= (dx / dist) * force
          p.vy -= (dy / dist) * force
        }
      }

      // Damping
      p.vx *= 0.995
      p.vy *= 0.995

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (speed > cfg.speed * 2) {
        p.vx = (p.vx / speed) * cfg.speed * 2
        p.vy = (p.vy / speed) * cfg.speed * 2
      }
      if (speed < cfg.speed * 0.3) {
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
      }

      p.x += p.vx
      p.y += p.vy

      // Bounce off edges
      if (p.x < 0) { p.x = 0; p.vx *= -1 }
      if (p.x > width) { p.x = width; p.vx *= -1 }
      if (p.y < 0) { p.y = 0; p.vy *= -1 }
      if (p.y > height) { p.y = height; p.vy *= -1 }
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < cfg.maxDistance) {
          const alpha = cfg.lineAlpha * (1 - dist / cfg.maxDistance)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${cfg.lineColor}, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cfg.particleColor}, ${cfg.particleAlpha})`
      ctx.fill()
    }
  }, [])

  const animate = useCallback((timestamp: number) => {
    if (pausedRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cfg = configRef.current
    const interval = 1000 / cfg.fps
    const elapsed = timestamp - lastFrameRef.current

    if (elapsed >= interval) {
      lastFrameRef.current = timestamp - (elapsed % interval)
      drawFrame(ctx, canvas.width, canvas.height)
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }, [drawFrame])

  // Setup canvas and start animation
  useEffect(() => {
    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.current = mq.matches
    if (prefersReduced.current) return // Don't animate

    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initParticles(rect.width, rect.height)
    }

    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    // Visibility change - pause when hidden
    const onVisibility = () => {
      pausedRef.current = document.hidden
      if (!document.hidden) {
        lastFrameRef.current = 0
        animFrameRef.current = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Mouse move (desktop only)
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    if (window.innerWidth >= 768) {
      canvas.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mouseleave', onMouseLeave)
    }

    // Start animation
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [animate, initParticles])

  // Update config when theme changes
  useEffect(() => {
    configRef.current = theme === 'dark' ? getDarkConfig() : getLightConfig()
    // Re-init particles with new config
    const canvas = canvasRef.current
    if (canvas) {
      initParticles(canvas.width, canvas.height)
    }
  }, [theme, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
