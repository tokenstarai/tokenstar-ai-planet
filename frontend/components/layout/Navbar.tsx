'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, Zap } from 'lucide-react'
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
  news: '新闻',
  skill: 'Skill',
  knowledge: '知识库',
  blog: 'Blog',
  case: '案例',
  hardware: '硬件',
  event: '活动',
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }, [pathname])

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
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow-blue">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm leading-tight block">TokenStar</span>
              <span className="text-xs text-blue-400 leading-tight block">AI星球</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      pathname === item.href
                        ? 'text-white bg-blue-600/30 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-40 glass rounded-xl border border-white/10 shadow-xl overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3" ref={searchRef}>
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索内容..."
                    className="w-56 pl-9 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all"
                  />
                </div>
              </form>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 glass rounded-xl border border-white/10 shadow-xl overflow-hidden z-50">
                  <div className="p-2">
                    {searchResults.map((result, i) => (
                      <Link
                        key={i}
                        href={result.href}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-all"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <span className="tag-badge shrink-0 mt-0.5">{typeLabels[result.type] || result.type}</span>
                        <div className="min-w-0">
                          <p className="text-sm text-white font-medium truncate">{result.title}</p>
                          {result.summary && (
                            <p className="text-xs text-gray-400 truncate mt-0.5">{result.summary}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center text-xs text-blue-400 hover:text-blue-300 py-1"
                      >
                        查看全部搜索结果 →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索内容..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </form>
            </div>

            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <p className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-6 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                      pathname === item.href
                        ? 'text-white bg-blue-600/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
