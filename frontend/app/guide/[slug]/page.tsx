import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, BookOpen, ChevronRight, ArrowRight, Clock, User } from 'lucide-react'
import { mockGuideArticles } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockGuideArticles.find(a => a.slug === params.slug)
  if (!item) return { title: '文章未找到' }
  return {
    title: `${item.title} - AI 管理指南 | TokenStar`,
    description: item.summary,
  }
}

export async function generateStaticParams() {
  return mockGuideArticles.map(a => ({ slug: a.slug }))
}

export default function GuideArticlePage({ params }: Props) {
  const item = mockGuideArticles.find(a => a.slug === params.slug)
  if (!item) notFound()

  const related = mockGuideArticles
    .filter(a => a.slug !== params.slug && a.category?.slug === item.category?.slug)
    .slice(0, 3)

  const otherRelated = related.length < 3
    ? mockGuideArticles.filter(a => a.slug !== params.slug && !related.find(r => r.slug === a.slug)).slice(0, 3 - related.length)
    : []

  const allRelated = [...related, ...otherRelated].slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-1.5 text-sm dark:text-gray-500 text-gray-400 mb-8 flex-wrap">
          <Link href="/" className="dark:hover:text-gray-300 hover:text-gray-600 transition-colors">首页</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/guide" className="dark:hover:text-gray-300 hover:text-gray-600 transition-colors">AI 管理指南</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          {item.category && (
            <>
              <span className="dark:text-gray-400 text-gray-500">{item.category.name}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </>
          )}
          <span className="dark:text-gray-300 text-gray-600 truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
        </nav>

        <article>
          {/* 分类标签 */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <BookOpen className="w-4 h-4 dark:text-green-400 text-green-600" />
            {item.category && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-500/15 bg-green-100 dark:text-green-400 text-green-700 border dark:border-green-500/25 border-green-200">
                {item.category.name}
              </span>
            )}
            {item.tags?.map(tag => (
              <span key={tag.slug} className="text-xs dark:text-gray-500 text-gray-400">#{tag.name}</span>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-4 leading-tight">{item.title}</h1>

          {/* 元信息 */}
          <div className="flex items-center gap-4 text-sm dark:text-gray-500 text-gray-400 mb-8 pb-8 border-b dark:border-white/10 border-gray-200 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(item.published_at)}
            </span>
            {item.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                约 {item.read_time} 分钟阅读
              </span>
            )}
            {item.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {item.author}
              </span>
            )}
          </div>

          {/* 摘要卡片 */}
          <div className="glass rounded-xl p-5 border dark:border-green-500/20 border-green-200 mb-8">
            <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-sm">{item.summary}</p>
          </div>

          {/* 正文 */}
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{
              __html: item.content || `<p>${item.summary}</p><p>详细内容正在整理中，请稍后查看。</p>`
            }}
          />
        </article>

        {/* 相关文章 */}
        {allRelated.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6">相关指南</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {allRelated.map(r => (
                <Link
                  key={r.id}
                  href={`/guide/${r.slug}`}
                  className="group block glass rounded-xl p-4 border dark:border-white/8 border-gray-200 hover:border-green-500/30 transition-all"
                >
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full dark:bg-green-500/10 bg-green-50 dark:text-green-400 text-green-700 mb-2 inline-block">
                    {r.category?.name}
                  </span>
                  <h4 className="text-sm font-medium dark:text-white text-gray-900 group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors line-clamp-2">{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-6 border dark:border-blue-500/20 border-blue-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold dark:text-white text-gray-900 mb-1">想要系统落地 AI 转型？</h4>
              <p className="text-sm dark:text-gray-400 text-gray-500">TokenStar 提供从战略咨询到私有化部署的端到端支持。</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/deployment"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
              >
                查看部署方案 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border dark:border-white/20 border-gray-300 dark:text-white text-gray-700 font-semibold text-sm transition-all dark:hover:bg-white/8 hover:bg-gray-50"
              >
                联系专家顾问
              </Link>
            </div>
          </div>
        </div>

        {/* 返回链接 */}
        <div className="mt-8">
          <Link href="/guide" className="inline-flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回 AI 管理指南
          </Link>
        </div>
      </div>
    </div>
  )
}
