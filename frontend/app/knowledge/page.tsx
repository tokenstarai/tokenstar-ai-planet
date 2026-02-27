import type { Metadata } from 'next'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockKnowledge } from '@/lib/mock-data'
import { BookOpen, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: '知识库',
  description: 'OpenClaw 官方知识库，包含入门教程、开发指南、API 文档、实战教程和运维手册。',
}

const categories = [
  { name: '全部', slug: 'all' },
  { name: '入门教程', slug: 'beginner' },
  { name: '开发指南', slug: 'dev-guide' },
  { name: '实战教程', slug: 'practice' },
  { name: 'API 文档', slug: 'api-docs' },
  { name: '运维指南', slug: 'ops' },
]

export default function KnowledgePage() {
  const featured = mockKnowledge.filter(k => k.featured)
  const rest = mockKnowledge.filter(k => !k.featured)

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-purple-500/30 text-xs text-purple-400 mb-4">
            <BookOpen className="w-3 h-3" />
            知识库
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">OpenClaw 知识库</h1>
          <p className="text-gray-400 max-w-xl">
            系统学习 OpenClaw，从入门到精通，包含官方教程、开发指南、API 文档和实战案例。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.slug}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                cat.slug === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full" />
              推荐文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(item => (
                <ContentCard key={item.id} {...item} href={`/knowledge/${item.slug}`} />
              ))}
            </div>
          </div>
        )}

        {/* All */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-500 rounded-full" />
            全部文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(item => (
              <ContentCard key={item.id} {...item} href={`/knowledge/${item.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
