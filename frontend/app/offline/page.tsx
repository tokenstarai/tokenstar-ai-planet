'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { WifiOff, Home, RefreshCw, BookOpen, Newspaper, Layers } from 'lucide-react'

export default function OfflinePage() {
  const [isDark, setIsDark] = useState(true)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Detect theme from html class (set by ThemeProvider inline script)
    const updateTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light'))
    }
    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Watch online status
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      observer.disconnect()
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #16213e 100%)'
          : '#F7F8FA',
      }}
    >
      {/* Static grid background (no animation, no JS dependency) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M 50 0 L 0 0 0 50' fill='none' stroke='rgba(120%2C160%2C255%2C0.06)' stroke-width='0.8'/%3E%3Ccircle cx='0' cy='0' r='1.2' fill='rgba(140%2C180%2C255%2C0.08)'/%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M 50 0 L 0 0 0 50' fill='none' stroke='rgba(80%2C100%2C200%2C0.04)' stroke-width='0.8'/%3E%3Ccircle cx='0' cy='0' r='1.2' fill='rgba(80%2C120%2C220%2C0.05)'/%3E%3C/svg%3E\")",
          backgroundSize: '50px 50px',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Center glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <main
        className="relative flex-1 flex flex-col items-center justify-center px-4 py-16"
        style={{ zIndex: 1, paddingTop: 'calc(var(--header-height, 64px) + 2rem)' }}
      >
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
          style={{
            background: isDark
              ? 'rgba(59, 130, 246, 0.12)'
              : 'rgba(59, 130, 246, 0.08)',
            border: `1px solid ${isDark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.15)'}`,
          }}
        >
          <WifiOff
            className="w-10 h-10"
            style={{ color: isDark ? '#60a5fa' : '#2563eb' }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ color: isDark ? '#f8fafc' : '#0F172A' }}
        >
          网络连接已断开
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg text-center max-w-lg mb-10 leading-relaxed"
          style={{ color: isDark ? '#94a3b8' : '#475569' }}
        >
          你当前处于离线状态，但 <strong style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>TokenStar · AI星球</strong> 依然可以为你提供已缓存的内容。
        </p>

        {/* Status + Action Cards */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Current Status */}
          <div
            className="rounded-xl p-5"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
              boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: isDark ? '#f8fafc' : '#0F172A' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: isOnline ? '#22c55e' : '#ef4444' }}
              />
              当前状态
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              {isOnline ? '网络已恢复，可以刷新页面。' : '你的设备暂时无法连接到互联网。请检查网络连接后重新尝试。'}
            </p>
          </div>

          {/* What you can do */}
          <div
            className="rounded-xl p-5"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
              boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              className="text-sm font-semibold mb-3"
              style={{ color: isDark ? '#f8fafc' : '#0F172A' }}
            >
              你现在可以做什么？
            </h2>
            <ul className="text-xs space-y-1.5" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                浏览已访问过的页面（已缓存内容）
              </li>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                阅读本地缓存的教程与文章
              </li>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                查看首页结构与导航
              </li>
            </ul>
          </div>

          {/* Suggestions */}
          <div
            className="rounded-xl p-5"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
              boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <h2
              className="text-sm font-semibold mb-3"
              style={{ color: isDark ? '#f8fafc' : '#0F172A' }}
            >
              建议操作
            </h2>
            <ul className="text-xs space-y-1.5" style={{ color: isDark ? '#94a3b8' : '#475569' }}>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                检查 Wi-Fi 或移动数据是否开启
              </li>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                尝试刷新页面
              </li>
              <li className="flex items-start gap-1.5">
                <span style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>•</span>
                稍后重新打开应用
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: '#2563eb',
              color: '#ffffff',
            }}
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#CBD5E1'}`,
              color: isDark ? '#f8fafc' : '#0F172A',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            刷新页面
          </button>
        </div>

        {/* Cached pages quick links */}
        <div className="w-full max-w-2xl">
          <p
            className="text-xs text-center mb-4"
            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
          >
            尝试访问已缓存的页面
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/news', icon: Newspaper, label: '新闻中心' },
              { href: '/knowledge', icon: BookOpen, label: '知识库' },
              { href: '/skills', icon: Layers, label: 'Skills' },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#F1F5F9',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'}`,
                  color: isDark ? '#94a3b8' : '#475569',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer brand */}
      <footer
        className="relative text-center py-8 px-4"
        style={{ zIndex: 1 }}
      >
        <p
          className="text-xs leading-relaxed max-w-md mx-auto"
          style={{ color: isDark ? '#475569' : '#94a3b8' }}
        >
          即使在离线状态下，我们仍希望为你保留一部分知识与灵感。
          <br />
          <strong style={{ color: isDark ? '#60a5fa' : '#2563eb' }}>TokenStar · AI星球</strong>
          {' '}—— 让每一项 AI 创新 都能触手可及。
        </p>
      </footer>
    </div>
  )
}
