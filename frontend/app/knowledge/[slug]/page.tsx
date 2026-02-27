import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react'
import { mockKnowledge } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockKnowledge.find(k => k.slug === params.slug)
  if (!item) return { title: '文章未找到' }
  return { title: item.title, description: item.summary }
}

export async function generateStaticParams() {
  return mockKnowledge.map(k => ({ slug: k.slug }))
}

export default function KnowledgeDetailPage({ params }: Props) {
  const item = mockKnowledge.find(k => k.slug === params.slug)
  if (!item) notFound()

  const related = mockKnowledge.filter(k => k.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <span>/</span>
          <Link href="/knowledge" className="hover:text-gray-300">知识库</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{item.title}</span>
        </div>

        <article>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <BookOpen className="w-4 h-4 text-purple-400" />
            {item.category && <span className="tag-badge">{item.category.name}</span>}
            {item.tags?.map(tag => (
              <span key={tag.slug} className="text-xs text-gray-500">#{tag.name}</span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(item.published_at)}
            </span>
          </div>

          <div className="glass rounded-xl p-5 border border-purple-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed">{item.summary}</p>
          </div>

          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{
              __html: item.content || `<p>${item.summary}</p><p>详细内容正在整理中，请稍后查看。</p>`
            }}
          />
        </article>

        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-white mb-6">相关文章</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/knowledge/${r.slug}`} className="group block glass rounded-xl p-4 border border-white/5 hover:border-purple-500/30 transition-all">
                  <span className="tag-badge text-xs mb-2 inline-block">{r.category?.name}</span>
                  <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors line-clamp-2">{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/knowledge" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回知识库
          </Link>
        </div>
      </div>
    </div>
  )
}
