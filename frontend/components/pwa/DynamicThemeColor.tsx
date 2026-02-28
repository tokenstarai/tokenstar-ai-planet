'use client'

import { useEffect } from 'react'

const DARK_THEME_COLOR = '#0B1220'
const LIGHT_THEME_COLOR = '#F4F6FA'

/**
 * DynamicThemeColor
 * Watches for theme class changes on <html> and updates
 * <meta name="theme-color"> accordingly so the PWA status bar
 * color stays in sync with the user's selected theme.
 */
export function DynamicThemeColor() {
  useEffect(() => {
    function getOrCreateMeta(): HTMLMetaElement {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'theme-color'
        document.head.appendChild(meta)
      }
      return meta
    }

    function updateThemeColor() {
      const isDark = !document.documentElement.classList.contains('light')
      const meta = getOrCreateMeta()
      meta.content = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR
    }

    // Set immediately on mount
    updateThemeColor()

    // Watch for class changes on <html>
    const observer = new MutationObserver(updateThemeColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Renders nothing — side-effect only
  return null
}
