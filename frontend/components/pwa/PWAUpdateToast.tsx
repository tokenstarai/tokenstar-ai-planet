'use client'

import { useEffect, useState, useCallback } from 'react'
import { RefreshCw, X } from 'lucide-react'

/**
 * PWAUpdateToast
 * Listens for a new Service Worker waiting to activate.
 * When detected, shows a non-intrusive toast at the top of the screen
 * with a "刷新" button that triggers skipWaiting + reload.
 *
 * Strategy: "Prompt on update" — never silently swaps content.
 * The user controls when the update takes effect.
 */
export function PWAUpdateToast() {
  const [showToast, setShowToast] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Detect theme
    const updateTheme = () => setIsDark(!document.documentElement.classList.contains('light'))
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Only run in browser with SW support
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return () => observer.disconnect()
    }

    const handleSWUpdate = (registration: ServiceWorkerRegistration) => {
      if (registration.waiting) {
        setWaitingWorker(registration.waiting)
        setShowToast(true)
      }
    }

    // Check existing registration
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        handleSWUpdate(reg)

        // Listen for future updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker)
                setShowToast(true)
              }
            })
          }
        })
      }
    })

    // Listen for controller change (after skipWaiting)
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    setShowToast(false)
  }, [waitingWorker])

  const handleDismiss = useCallback(() => {
    setShowToast(false)
  }, [])

  if (!showToast) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between gap-3 px-4 py-3 text-sm"
      style={{
        background: isDark
          ? 'rgba(11, 18, 32, 0.96)'
          : 'rgba(244, 246, 250, 0.97)',
        borderBottom: `1px solid ${isDark ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.2)'}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))',
      }}
    >
      <div className="flex items-center gap-2 flex-1">
        <RefreshCw
          className="w-4 h-4 shrink-0"
          style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
        />
        <span style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}>
          发现新版本，点击刷新以获取最新内容
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleUpdate}
          className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
          style={{
            background: '#2563eb',
            color: '#ffffff',
          }}
        >
          立即刷新
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md transition-all"
          style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          aria-label="关闭提示"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
