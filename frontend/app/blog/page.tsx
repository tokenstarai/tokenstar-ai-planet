import type { Metadata } from 'next'
import Link from 'next/link'
import { PenLine, ArrowRight, Calendar } from 'lucide-react'
import { mockBlogs } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'
import { ContentCard } from '@/components/ui/ContentCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'TokenStar AI星球技术博客，分享 AI Agent 技术洞察、行业观察与实战经验。',
}

export default function BlogPage() {
  const featured = mockBlogs.filter(b => b.featured)
  const rest = mockBlogs.filter(b => !b.featured)

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-violet-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-violet-500/30 text-xs text-violet-400 mb-4">
            <PenLine className="w-3 h-3" />
            技术博客
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">TokenStar Blog</h1>
          <p className="text-gray-400 max-w-xl">
            技术洞察、行业观察与实战经验，与 AI Agent 开发者共同成长。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-violet-500 rounded-full" />
              精选文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(item => (
                <ContentCard key={item.id} {...item} href={`/blog/${item.slug}`} badge={item.category?.name} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-500 rounded-full" />
            全部文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(item => (
              <ContentCard key={item.id} {...item} href={`/blog/${item.slug}`} badge={item.category?.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
