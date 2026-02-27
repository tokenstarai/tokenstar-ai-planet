'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Newspaper, BookOpen, Package, Briefcase, Server, Calendar, PenLine } from 'lucide-react'
import { mockNews, mockKnowledge, mockSkills, mockCases, mockHardware, mockEvents, mockBlogs } from '@/lib/mock-data'

const typeConfig: Record<string, { label: string; icon: any; color: string; prefix: string }> = {
  news: { label: '新闻', icon: Newspaper, color: 'text-blue-400', prefix: '/news' },
  knowledge: { label: '知识库', icon: BookOpen, color: 'text-purple-400', prefix: '/knowledge' },
  skill: { label: 'Skills', icon: Package, color: 'text-green-400', prefix: '/skills' },
  case: { label: '案例', icon: Briefcase, color: 'text-orange-400', prefix: '/cases' },
  hardware: { label: '硬件', icon: Server, color: 'text-cyan-400', prefix: '/hardware' },
  event: { label: '活动', icon: Calendar, color: 'text-pink-400', prefix: '/events' },
  blog: { label: 'Blog', icon: PenLine, color: 'text-violet-400', prefix: '/blog' },
}

function searchAll(query: string) {
  const q = query.toLowerCase()
  const results: any[] = []

  const addResults = (items: any[], type: string) => {
    items.forEach(item => {
      if (
        item.title?.toLowerCase().includes(q) ||
        item.summary?.toLowerCase().includes(q)
      ) {
        results.push({ ...item, _type: type })
      }
    })
  }

  addResults(mockNews, 'news')
  addResults(mockKnowledge, 'knowledge')
  addResults(mockSkills, 'skill')
  addResults(mockCases, 'case')
  addResults(mockHardware, 'hardware')
  addResults(mockEvents, 'event')
  addResults(mockBlogs, 'blog')

  return results
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (query.length >= 1) {
      setResults(searchAll(query))
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-6 h-6 text-gray-400" />
          <h1 className="text-2xl font-bold text-white">
            {query ? `"${query}" 的搜索结果` : '搜索'}
          </h1>
          {query && results.length > 0 && (
            <span className="text-sm text-gray-500">共 {results.length} 条</span>
          )}
        </div>

        {!query && (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>请在导航栏搜索框输入关键词</p>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">未找到相关内容</p>
            <p className="text-sm">请尝试其他关键词</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((item, i) => {
              const config = typeConfig[item._type]
              const href = `${config.prefix}/${item.slug}`
              return (
                <Link
                  key={`${item._type}-${item.id}`}
                  href={href}
                  className="group block glass rounded-xl p-5 border border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <config.icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs ${config.color}`}>{config.label}</span>
                      </div>
                      <h3 className="text-base font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      {item.summary && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.summary}</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-gray-400">加载中...</div>}>
      <SearchResults />
    </Suspense>
  )
}
