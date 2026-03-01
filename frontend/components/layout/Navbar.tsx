'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, Sun, Moon, ArrowLeft } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { mockNews, mockSkills, mockKnowledge, mockBlogs, mockCases, mockHardware, mockEvents } from '@/lib/mock-data'

const navItems = [
  { label: '首页', href: '/' },
  { label: '解决方案', href: '/scenarios' },
  { label: '成功案例', href: '/cases' },
  {
    label: '部署与安全',
    href: '/deployment',
    children: [
      { label: '部署方案总览', href: '/deployment' },
      { label: 'Box Pro 私有硬件', href: '/deployment#hardware' },
      { label: 'Cloud 云端托管', href: '/deployment#cloud' },
      { label: 'ROI 测算', href: '/deployment#roi' },
    ],
  },
  { label: '认证与培训', href: '/training' },
  {
    label: '企业&AI',
    href: '/resources',
    children: [
      { label: '企业与 AI', href: '/resources#enterprise-ai' },
      { label: 'AI 管理指南', href: '/guide' },
      { label: 'Skills 用例', href: '/skills' },
      { label: 'OpenClaw 框架', href: '/openclaw' },
      { label: 'Blog', href: '/blog' },
      { label: '知识库', href: '/knowledge' },
    ],
  },
  { label: '关于', href: '/about' },
]

function clientSearch(query: string) {
  const q = query.toLowerCase()
  const results: any[] = []
  const search = (items: any[], type: string, prefix: string) => {
    items.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.summary && item.summary.toLowerCase().includes(q))
    ).slice(0, 2).forEach(item => {
      results.push({ ...item, type, href: `/${prefix}/${item.slug}` })
    })
  }
  search(mockNews, 'news', 'news')
  search(mockSkills, 'skill', 'skills')
  search(mockKnowledge, 'knowledge', 'knowledge')
  search(mockBlogs, 'blog', 'blog')
  search(mockCases, 'case', 'cases')
  search(mockHardware, 'hardware', 'hardware')
  search(mockEvents, 'event', 'events')
  return results.slice(0, 8)
}

const typeLabels: Record<string, string> = {
  news: '新闻', skill: 'Skill', knowledge: '知识库',
  blog: 'Blog', case: '案例', hardware: '硬件', event: '活动',
}

/**
 * LogoIcon：纯图标组件（32x32 蓝紫渐变方块 + 四角星 + 外环 + 中心核）
 */
export function LogoIcon({ size = 32, idSuffix = 'a' }: { size?: number; idSuffix?: string }) {
  // 四角星路径：8个点，外尖和内凹交替，基于 32x32 viewBox
  const cx = 16, cy = 16
  const outer = 12.8, inner = 4.16
  const starPoints = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 - 90) * Math.PI / 180
    const r = i % 2 === 0 ? outer : inner
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`lg1-${idSuffix}`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F6EF7" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={`lg2-${idSuffix}`} x1="12" y1="12" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <clipPath id={`clip-${idSuffix}`}>
          <rect width="32" height="32" rx="7" />
        </clipPath>
      </defs>
      {/* 背景圆角方形，无边框 */}
      <rect width="32" height="32" rx="7" fill={`url(#lg1-${idSuffix})`} />
      {/* 白色四角星 */}
      <polygon points={starPoints} fill="white" opacity="0.95" clipPath={`url(#clip-${idSuffix})`} />
      {/* 中心渐变圆点 */}
      <circle cx="16" cy="16" r="3.0" fill={`url(#lg2-${idSuffix})`} />
    </svg>
  )
}

/**
 * LogoWordmark：图标 + "Token" + "Star"
 */
export function LogoWordmark({ isDark }: { isDark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="TokenStar 首页">
      <LogoIcon size={30} idSuffix="nav" />
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="token-grad-nav" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isDark ? '#c7d2fe' : '#3730a3'} />
            <stop offset="100%" stopColor={isDark ? '#a5b4fc' : '#4338ca'} />
          </linearGradient>
          <linearGradient id="star-grad-nav" x1="60" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="19"
          fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="20"
          fontWeight="800"
          fontStyle="italic"
          letterSpacing="0.5"
        >
          <tspan fill={`url(#token-grad-nav)`}>Token</tspan><tspan fill="url(#star-grad-nav)">Star</tspan>
        </text>
      </svg>
    </Link>
  )
}

function ThemeToggleButton({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? '切换到浅色主题' : '切换到深色主题'}
      className={`min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer select-none ${
        isDark
          ? 'border border-white/25 bg-white/8 hover:bg-white/15 text-yellow-300 hover:border-white/40'
          : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 hover:border-gray-400 shadow-sm'
      } ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

/**
 * NavDropdown：带下拉菜单的导航项
 *
 * 交互策略：
 * - onMouseEnter 容器：立即打开，取消关闭计时器
 * - onMouseLeave 容器：延迟 200ms 关闭（鼠标重新进入时取消）
 * - 下拉面板与触发按钮属于同一容器，无缝隙问题
 * - 下拉面板顶部有 8px 透明 padding 作为 hover bridge，防止鼠标经过间隙时丢失 hover
 * - ESC 键关闭
 * - 点击页面其他地方关闭（由父组件的 document mousedown 处理）
 * - focus-within 保持键盘可访问性
 */
function NavDropdown({
  item,
  isDark,
  pathname,
  onClose,
}: {
  item: typeof navItems[number]
  isDark: boolean
  pathname: string
  onClose: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 含 # 的锚点链接智能跳转：同页直接滚动，跨页先导航再由 AnchorScrollHandler 处理
  const handleAnchorClick = useCallback((e: React.MouseEvent, href: string) => {
    const hashIndex = href.indexOf('#')
    if (hashIndex === -1) return // 无 hash，默认行为
    e.preventDefault()
    setIsOpen(false)
    onClose()
    const pagePath = href.slice(0, hashIndex) || '/'
    const anchorId = href.slice(hashIndex + 1)
    const isSamePage = pathname === pagePath || (pagePath === '/' && pathname === '/')
    if (isSamePage) {
      // 同页内直接滚动
      const el = document.getElementById(anchorId)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    } else {
      // 跨页跳转：导航到新页，AnchorScrollHandler 会在页面渲染后自动滚动
      router.push(href)
    }
  }, [pathname, onClose, router])

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }, [cancelClose])

  const open = useCallback(() => {
    cancelClose()
    setIsOpen(true)
  }, [cancelClose])

  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        // 焦点返回触发按钮
        const btn = containerRef.current?.querySelector('button') as HTMLElement | null
        btn?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // 清理计时器
  useEffect(() => () => { cancelClose() }, [cancelClose])

  // 路由变化时关闭
  useEffect(() => { setIsOpen(false) }, [pathname])

  if (!item.children) return null

  const isActive = item.children.some(child => child.href === pathname) || pathname === item.href

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
    >
      {/* 触发按钮 */}
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        onFocus={() => { /* focus-within 由容器处理 */ }}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
          isActive
            ? isDark
              ? 'text-white bg-blue-600/25 border border-blue-500/25'
              : 'text-blue-700 bg-blue-50 border border-blue-200'
            : isOpen
              ? isDark
                ? 'text-white bg-white/12'
                : 'text-gray-900 bg-gray-100'
              : isDark
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 下拉面板
          - pt-2 作为透明 hover bridge，防止鼠标经过 mt-0 间隙时丢失 hover
          - 面板本身从 pt-2 内的 div 开始，视觉上紧贴按钮
          - prefers-reduced-motion 下无动画
      */}
      <div
        className={`absolute top-full left-0 pt-2 z-50 transition-all duration-150 ease-out
          ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
          }
          motion-reduce:transition-none`}
        aria-hidden={!isOpen}
        role="menu"
      >
        {/* 面板：统一 min-w-[260px]，边框更细，阴影轻量，圆角 12px */}
        <div
          className={`min-w-[260px] rounded-xl border overflow-hidden ${
            isDark
              ? 'bg-[#13131a] backdrop-blur-xl border-neutral-700/60 shadow-xl shadow-black/50'
              : 'bg-white border-neutral-200 shadow-lg shadow-neutral-200/70'
          }`}
        >
          {/* 面板顶部细分隔线（视觉锚点） */}
          <div className={`h-px mx-3 mt-2 mb-1 ${
            isDark ? 'bg-neutral-700/50' : 'bg-neutral-100'
          }`} />
          {item.children.map((child) => {
            const isChildActive = pathname === child.href
            const hasHash = child.href.includes('#')
            return (
              <Link
                key={child.href}
                href={child.href}
                role="menuitem"
                onClick={hasHash
                  ? (e) => handleAnchorClick(e, child.href)
                  : () => { setIsOpen(false); onClose() }
                }
                className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-[130ms] min-h-[44px] ${
                  isChildActive
                    ? isDark
                      ? 'text-white font-semibold bg-blue-600/25 border-l-2 border-blue-500 pl-[14px]'
                      : 'text-blue-700 font-semibold bg-blue-50/80 border-l-2 border-blue-500 pl-[14px]'
                    : isDark
                      ? 'text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {child.label}
              </Link>
            )
          })}
          <div className={`h-px mx-3 mt-1 mb-2 ${
            isDark ? 'bg-neutral-700/50' : 'bg-neutral-100'
          }`} />
        </div>
      </div>
    </div>
  )
}

function MobileSearchOverlay({ isOpen, onClose, isDark }: { isOpen: boolean; onClose: () => void; isDark: boolean }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (query.length >= 2) setResults(clientSearch(query))
    else setResults([])
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div
        className={`absolute inset-0 ${isDark ? 'bg-[#0a0a0f]/98' : 'bg-[#F7F8FA]/98'}`}
        style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      />
      <div className="relative flex flex-col h-full">
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            aria-label="关闭搜索"
            className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl transition-all ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <form onSubmit={handleSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索新闻、Skills、案例..."
                aria-label="全站搜索"
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400'
                }`}
              />
            </div>
          </form>
          {query && (
            <button onClick={() => setQuery('')} aria-label="清除" className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {query.length >= 2 && results.length === 0 && (
            <p className={`text-center py-10 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              未找到相关内容
            </p>
          )}
          {results.length > 0 && (
            <div className="space-y-1">
              <p className={`text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>找到 {results.length} 条结果</p>
              {results.map((result, i) => (
                <Link
                  key={i}
                  href={result.href}
                  onClick={onClose}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all ${isDark ? 'hover:bg-white/8' : 'hover:bg-gray-100'}`}
                >
                  <span className="tag-badge shrink-0 mt-0.5">{typeLabels[result.type] || result.type}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.title}</p>
                    {result.summary && (
                      <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{result.summary}</p>
                    )}
                  </div>
                </Link>
              ))}
              <div className={`border-t mt-3 pt-3 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <button
                  onClick={() => { router.push(`/search?q=${encodeURIComponent(query)}`); onClose() }}
                  className="w-full text-center text-sm py-2 text-blue-500 hover:text-blue-400 transition-colors"
                >
                  查看全部搜索结果 →
                </button>
              </div>
            </div>
          )}
          {query.length < 2 && (
            <div className={`py-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">输入关键词开始搜索</p>
              <p className="text-xs mt-1 opacity-60">支持新闻、Skills、知识库、案例等</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 移动端含 # 锚点链接智能跳转
  const handleMobileAnchorClick = useCallback((e: React.MouseEvent, href: string) => {
    const hashIndex = href.indexOf('#')
    if (hashIndex === -1) {
      setIsMenuOpen(false)
      return
    }
    e.preventDefault()
    setIsMenuOpen(false)
    const pagePath = href.slice(0, hashIndex) || '/'
    const anchorId = href.slice(hashIndex + 1)
    const isSamePage = pathname === pagePath || (pagePath === '/' && pathname === '/')
    if (isSamePage) {
      const el = document.getElementById(anchorId)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    } else {
      router.push(href)
    }
  }, [pathname, router])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setIsMobileSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = clientSearch(searchQuery)
      setSearchResults(results)
      setIsSearchOpen(results.length > 0)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }, [searchQuery])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const navBg = isScrolled
    ? isDark
      ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
      : 'bg-white/92 backdrop-blur-xl border-b border-gray-200 shadow-sm'
    : isDark
      ? 'bg-transparent'
      : 'bg-white/80 backdrop-blur-md border-b border-gray-100'

  return (
    <>
      <MobileSearchOverlay isOpen={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} isDark={isDark} />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <LogoWordmark isDark={isDark} />

            {/* 桌面导航 */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                item.children ? (
                  <NavDropdown
                    key={item.label}
                    item={item}
                    isDark={isDark}
                    pathname={pathname}
                    onClose={() => {}}
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      pathname === item.href
                        ? isDark ? 'text-white bg-blue-600/25 border border-blue-500/25' : 'text-blue-700 bg-blue-50 border border-blue-200'
                        : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>

            {/* 桌面搜索 + 主题切换 */}
            <div className="hidden md:flex items-center gap-2" ref={searchRef}>
              <div className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="搜索内容..."
                      aria-label="搜索"
                      className={`w-52 pl-9 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                        isDark
                          ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-500'
                          : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400'
                      }`}
                    />
                  </div>
                </form>
                {isSearchOpen && searchResults.length > 0 && (
                  <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl border shadow-xl overflow-hidden z-50 ${isDark ? 'bg-[#111118]/95 backdrop-blur-xl border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
                    <div className="p-2">
                      {searchResults.map((result, i) => (
                        <Link
                          key={i}
                          href={result.href}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <span className="tag-badge shrink-0 mt-0.5">{typeLabels[result.type] || result.type}</span>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.title}</p>
                            {result.summary && <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{result.summary}</p>}
                          </div>
                        </Link>
                      ))}
                      <div className={`border-t mt-2 pt-2 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                        <button onClick={handleSearchSubmit} className={`w-full text-center text-xs py-1 transition-colors ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                          查看全部搜索结果 →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <ThemeToggleButton />
            </div>

            {/* 移动端操作区 */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                aria-label="搜索"
                onClick={() => setIsMobileSearchOpen(true)}
                className={`min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggleButton />
              <button
                aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 移动端菜单（不受 NavDropdown 影响，逻辑独立） */}
        {isMenuOpen && (
          <div
            className={`lg:hidden border-t overflow-y-auto ${isDark ? 'bg-[#0a0a0f]/97 backdrop-blur-xl border-white/10' : 'bg-white/97 backdrop-blur-xl border-gray-200'}`}
            style={{ maxHeight: 'calc(100vh - 64px - env(safe-area-inset-top, 0px))' }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="mb-1">
                      <p className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
                      {item.children.map((child) => {
                        const mobileHasHash = child.href.includes('#')
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={mobileHasHash
                              ? (e) => handleMobileAnchorClick(e, child.href)
                              : () => setIsMenuOpen(false)
                            }
                            className={`flex items-center px-6 py-2.5 text-sm rounded-xl transition-all min-h-[44px] ${
                              pathname === child.href
                                ? isDark ? 'text-white bg-blue-600/30 border border-blue-500/20' : 'text-blue-700 bg-blue-50 border border-blue-200'
                                : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-xl text-sm transition-all min-h-[44px] ${
                        pathname === item.href
                          ? isDark ? 'text-white bg-blue-600/30 border border-blue-500/20' : 'text-blue-700 bg-blue-50 border border-blue-200'
                          : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
          </div>
        )}
      </nav>
    </>
  )
}
