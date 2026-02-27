'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
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

// Logo SVG 内联组件（小尺寸清晰可读）
function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="url(#navGrad1)"/>
      <path d="M16 5 L17.8 12.2 L25 10.5 L20.2 16 L25 21.5 L17.8 19.8 L16 27 L14.2 19.8 L7 21.5 L11.8 16 L7 10.5 L14.2 12.2 Z" fill="white" opacity="0.95"/>
      <circle cx="16" cy="16" r="3" fill="url(#navGrad2)"/>
      <defs>
        <linearGradient id="navGrad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="navGrad2" x1="13" y1="13" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// 主题切换按钮
function ThemeToggleButton({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
      className={`
        min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-lg
        transition-all duration-200 cursor-pointer
        dark:border dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/15 dark:text-yellow-300
        border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-600
        ${className}
      `}
    >
      {theme === 'dark'
        ? <Sun className="w-4 h-4" />
        : <Moon className="w-4 h-4" />
      }
    </button>
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
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()

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

  // 锁定 body 滚动（菜单打开时）
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
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        setIsMobileSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = clientSearch(searchQuery)
      setSearchResults(results)
      setIsSearchOpen(true)
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
      setIsMobileSearchOpen(false)
    }
  }

  const isDark = theme === 'dark'

  const navBg = isScrolled
    ? isDark
      ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
      : 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm'
    : isDark
      ? 'bg-transparent'
      : 'bg-white/70 backdrop-blur-md'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ===== Logo ===== */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="TokenStar 首页">
            <LogoIcon size={32} />
            <span className={`font-bold text-base leading-none transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              TokenStar
            </span>
          </Link>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}>
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      pathname === item.href
                        ? isDark
                          ? 'text-white bg-blue-600/30 border border-blue-500/30'
                          : 'text-blue-700 bg-blue-50 border border-blue-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className={`absolute top-full left-0 mt-1 w-40 rounded-xl border shadow-xl overflow-hidden z-50 ${
                    isDark
                      ? 'bg-[#111118]/95 backdrop-blur-xl border-white/10'
                      : 'bg-white border-gray-200 shadow-lg'
                  }`}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2.5 text-sm transition-all ${
                          isDark
                            ? 'text-gray-300 hover:text-white hover:bg-white/10'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ===== Desktop Right: Search + Theme ===== */}
          <div className="hidden md:flex items-center gap-2" ref={searchRef}>
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索内容..."
                    aria-label="搜索"
                    className={`w-52 pl-9 pr-4 py-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                      isDark
                        ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:bg-white/15 focus:border-blue-500'
                        : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400'
                    }`}
                  />
                </div>
              </form>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl border shadow-xl overflow-hidden z-50 ${
                  isDark
                    ? 'bg-[#111118]/95 backdrop-blur-xl border-white/10'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}>
                  <div className="p-2">
                    {searchResults.map((result, i) => (
                      <Link
                        key={i}
                        href={result.href}
                        className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                          isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <span className="tag-badge shrink-0 mt-0.5">{typeLabels[result.type] || result.type}</span>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.title}</p>
                          {result.summary && (
                            <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{result.summary}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                    <div className={`border-t mt-2 pt-2 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                      <button
                        onClick={handleSearchSubmit}
                        className={`w-full text-center text-xs py-1 transition-colors ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        查看全部搜索结果 →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Theme Toggle */}
            <ThemeToggleButton />
          </div>

          {/* ===== Mobile Right: Search Icon + Theme + Hamburger ===== */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Search Icon */}
            <button
              aria-label="搜索"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Theme Toggle */}
            <ThemeToggleButton />

            {/* Hamburger */}
            <button
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ===== Mobile Search Bar (expandable) ===== */}
        {isMobileSearchOpen && (
          <div className="md:hidden pb-3" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索内容..."
                  autoFocus
                  aria-label="搜索"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    isDark
                      ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-400'
                  }`}
                />
              </div>
            </form>
            {/* Mobile Search Results */}
            {searchResults.length > 0 && (
              <div className={`mt-2 rounded-xl border overflow-hidden ${
                isDark ? 'bg-[#111118]/95 border-white/10' : 'bg-white border-gray-200 shadow-lg'
              }`}>
                {searchResults.slice(0, 5).map((result, i) => (
                  <Link
                    key={i}
                    href={result.href}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-all ${
                      isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'
                    } ${i > 0 ? (isDark ? 'border-t border-white/5' : 'border-t border-gray-100') : ''}`}
                    onClick={() => { setIsMobileSearchOpen(false); setSearchQuery('') }}
                  >
                    <span className="tag-badge shrink-0 text-xs">{typeLabels[result.type]}</span>
                    <p className={`text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.title}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Mobile Menu Overlay ===== */}
      {isMenuOpen && (
        <div
          className={`lg:hidden border-t overflow-y-auto transition-all ${
            isDark
              ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-white/10'
              : 'bg-white/95 backdrop-blur-xl border-gray-200'
          }`}
          style={{ maxHeight: 'calc(100vh - 64px - env(safe-area-inset-top))' }}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div className="mb-1">
                    <p className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>{item.label}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`flex items-center px-6 py-2.5 text-sm rounded-lg transition-all min-h-[44px] ${
                          pathname === child.href
                            ? isDark
                              ? 'text-white bg-blue-600/30'
                              : 'text-blue-700 bg-blue-50'
                            : isDark
                              ? 'text-gray-300 hover:text-white hover:bg-white/10'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-all min-h-[44px] ${
                      pathname === item.href
                        ? isDark
                          ? 'text-white bg-blue-600/30 border border-blue-500/20'
                          : 'text-blue-700 bg-blue-50 border border-blue-200'
                        : isDark
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Safe area bottom padding */}
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
        </div>
      )}
    </nav>
  )
}
