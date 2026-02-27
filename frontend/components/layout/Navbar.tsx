'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, Sun, Moon, ArrowLeft } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { mockNews, mockSkills, mockKnowledge, mockBlogs, mockCases, mockHardware, mockEvents } from '@/lib/mock-data'

const navItems = [
  { label: '首页', href: '/' },
  { label: 'OpenClaw', href: '/openclaw' },
  {
    label: '内容',
    href: '#',
    children: [
      { label: '新闻中心', href: '/news' },
      { label: '知识库', href: '/knowledge' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: '生态',
    href: '#',
    children: [
      { label: 'Skills 市场', href: '/skills' },
      { label: '案例中心', href: '/cases' },
    ],
  },
  { label: '硬件 & 云', href: '/hardware' },
  { label: '培训活动', href: '/events' },
  { label: '关于我们', href: '/about' },
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
 * 用于 Navbar 和 Footer，小尺寸下依然清晰可识别
 */
export function LogoIcon({ size = 32, idSuffix = 'a' }: { size?: number; idSuffix?: string }) {
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
      {/* 背景：蓝紫渐变圆角方块 */}
      <rect width="32" height="32" rx="8" fill={`url(#lg1-${idSuffix})`} />
      {/* 外环：Token 流通感 */}
      <circle cx="16" cy="16" r="11.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
      {/* 四角星：Star 核心 */}
      <path
        d="M16 5.5 L17.6 12.4 L24.5 10.5 L19.8 16 L24.5 21.5 L17.6 19.6 L16 26.5 L14.4 19.6 L7.5 21.5 L12.2 16 L7.5 10.5 L14.4 12.4 Z"
        fill="white"
        opacity="0.95"
      />
      {/* 中心亮核 */}
      <circle cx="16" cy="16" r="2.8" fill={`url(#lg2-${idSuffix})`} />
      {/* 四角小点：AI 电路感 */}
      <circle cx="7" cy="7" r="1.2" fill="rgba(255,255,255,0.42)" />
      <circle cx="25" cy="7" r="1.2" fill="rgba(255,255,255,0.42)" />
      <circle cx="7" cy="25" r="1.2" fill="rgba(255,255,255,0.28)" />
      <circle cx="25" cy="25" r="1.2" fill="rgba(255,255,255,0.28)" />
      <defs>
        <linearGradient id={`lg1-${idSuffix}`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={`lg2-${idSuffix}`} x1="13" y1="13" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/**
 * LogoWordmark：图标 + "Token" + "Star"（Star 用蓝色高亮）
 * 单行布局，无副标题，品牌感更强
 */
export function LogoWordmark({ isDark }: { isDark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="TokenStar 首页">
      <LogoIcon size={32} idSuffix="nav" />
      <span
        className="font-bold tracking-tight leading-none select-none"
        style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
      >
        <span style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}>Token</span>
        <span style={{ color: '#3B82F6' }}>Star</span>
      </span>
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
              <p className="text-xs mt-1 opacity-60">支持新闻、知识库、Skills、案例等</p>
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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
            {/* Logo：图标 + TokenStar 单行，Star 蓝色高亮 */}
            <LogoWordmark isDark={isDark} />

            {/* 桌面导航 */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        pathname === item.href
                          ? isDark ? 'text-white bg-blue-600/30 border border-blue-500/30' : 'text-blue-700 bg-blue-50 border border-blue-200'
                          : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && activeDropdown === item.label && (
                    <div className={`absolute top-full left-0 mt-1 w-40 rounded-xl border shadow-xl overflow-hidden z-50 ${isDark ? 'bg-[#111118]/95 backdrop-blur-xl border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-all ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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

        {/* 移动端菜单 */}
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
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center px-6 py-2.5 text-sm rounded-xl transition-all min-h-[44px] ${
                            pathname === child.href
                              ? isDark ? 'text-white bg-blue-600/30 border border-blue-500/20' : 'text-blue-700 bg-blue-50 border border-blue-200'
                              : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
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
