'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeProvider'

interface SubtleGridBackgroundProps {
  /** 动效强度：'strong' 用于 openclaw hero，'subtle' 用于各内页标题区 */
  intensity?: 'strong' | 'subtle'
  className?: string
}

export function SubtleGridBackground({
  intensity = 'subtle',
  className = '',
}: SubtleGridBackgroundProps) {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation | null>(null)

  const isDark = theme === 'dark'

  // Grid color based on theme and intensity
  const gridOpacity = isDark
    ? intensity === 'strong' ? 0.09 : 0.06
    : intensity === 'strong' ? 0.05 : 0.035

  const gridColor = isDark
    ? `rgba(120, 160, 255, ${gridOpacity})`
    : `rgba(80, 100, 200, ${gridOpacity})`

  const dotColor = isDark
    ? `rgba(140, 180, 255, ${gridOpacity * 1.5})`
    : `rgba(80, 120, 220, ${gridOpacity * 1.5})`

  // Glow color for strong intensity
  const glowColor = isDark
    ? 'rgba(80, 140, 255, 0.06)'
    : 'rgba(80, 120, 200, 0.03)'

  // Grid cell size
  const cellSize = intensity === 'strong' ? 40 : 50

  // SVG pattern for grid
  const svgGrid = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${cellSize}' height='${cellSize}'>
      <path d='M ${cellSize} 0 L 0 0 0 ${cellSize}' fill='none' stroke='${encodeURIComponent(gridColor)}' stroke-width='0.8'/>
      <circle cx='0' cy='0' r='1.2' fill='${encodeURIComponent(dotColor)}'/>
    </svg>
  `.trim()

  const bgUrl = `url("data:image/svg+xml,${svgGrid.replace(/\n\s*/g, ' ')}")`

  useEffect(() => {
    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const el = containerRef.current
    if (!el) return

    // Slow drift animation via CSS keyframes on transform
    const duration = intensity === 'strong' ? 18000 : 24000 // ms
    const distance = intensity === 'strong' ? cellSize : cellSize * 0.8

    const anim = el.animate(
      [
        { backgroundPosition: '0px 0px' },
        { backgroundPosition: `${distance}px ${distance}px` },
      ],
      {
        duration,
        iterations: Infinity,
        easing: 'linear',
      }
    )
    animRef.current = anim

    // Pause when page hidden
    const onVisibility = () => {
      if (document.hidden) {
        anim.pause()
      } else {
        anim.play()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      anim.cancel()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [intensity, cellSize])

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          backgroundImage: bgUrl,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundPosition: '0px 0px',
        }}
      />

      {/* Optional center glow for strong intensity */}
      {intensity === 'strong' && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Fade-out at bottom to blend with content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-bg, #0a0a0f))',
        }}
      />
    </div>
  )
}
