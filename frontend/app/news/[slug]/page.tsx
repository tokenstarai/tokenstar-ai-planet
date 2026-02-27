import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { mockNews } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockNews.find(n => n.slug === params.slug)
  if (!item) return { title: '新闻未找到' }
  return {
    title: item.title,
    description: item.summary,
  }
}

export async function generateStaticParams() {
  return mockNews.map(n => ({ slug: n.slug }))
}

export default function NewsDetailPage({ params }: Props) {
  const item = mockNews.find(n => n.slug === params.slug)
  if (!item) notFound()

  const related = mockNews.filter(n => n.slug !== params.slug && n.category?.slug === item.category?.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300 transition-colors">首页</Link>
          <span>/</span>
          <Link href="/news" className="hover:text-gray-300 transition-colors">新闻中心</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{item.title}</span>
        </div>

        {/* Article */}
        <article>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {item.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                推荐
              </span>
            )}
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
            <button className="flex items-center gap-1.5 hover:text-gray-300 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              分享
            </button>
          </div>

          {/* Summary */}
          <div className="glass rounded-xl p-5 border border-blue-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed">{item.summary}</p>
          </div>

          {/* Content */}
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{
              __html: item.content || `<p>${item.summary}</p><p>更多详细内容请关注 TokenStar AI星球官方渠道获取最新资讯。</p>`
            }}
          />
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-white mb-6">相关新闻</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/news/${r.slug}`} className="group block glass rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-all">
                  <span className="tag-badge text-xs mb-2 inline-block">{r.category?.name}</span>
                  <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">{r.title}</h4>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(r.published_at)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-12">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回新闻中心
          </Link>
        </div>
      </div>
    </div>
  )
}
