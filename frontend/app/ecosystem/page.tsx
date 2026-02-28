import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Package, BookOpen, Newspaper } from 'lucide-react'
import { mockNews, mockSkills, mockKnowledge } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: 'OpenClaw 生态 - TokenStar',
  description: 'OpenClaw 生态动态、Skills 市场、知识库与版本更新，掌握 AI Agent 生态最新进展。',
}

export default function EcosystemPage() {
  const openclawNews = mockNews.filter(n =>
    n.category?.slug === 'product' ||
    n.category?.slug === 'ecosystem' ||
    n.category?.slug === 'tech' ||
    n.tags?.some(t => t.slug === 'openclaw')
  ).slice(0, 6)

  const featuredSkills = mockSkills.filter(s => s.featured).slice(0, 8)
  const latestKnowledge = mockKnowledge.slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            <Zap className="w-3.5 h-3.5" />
            生态中心
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">OpenClaw 生态</h1>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            聚合 OpenClaw 最新动态、Skills 市场、知识库与版本更新，一站式掌握生态进展
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* 生态动态新闻 */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">生态动态</h2>
            </div>
            <Link href="/news" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openclawNews.map(item => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                {item.category && (
                  <span className="tag-badge mb-3 inline-block">{item.category.name}</span>
                )}
                <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-2 mb-3">{item.summary}</p>
                <span className="text-xs dark:text-gray-500 text-gray-400">{formatDate(item.published_at)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills 市场 */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">精选 Skills</h2>
            </div>
            <Link href="/skills" className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300">
              Skills 市场 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSkills.map(skill => (
              <Link
                key={skill.id}
                href={`/skills/${skill.slug}`}
                className="group glass rounded-xl p-4 border dark:border-white/8 border-gray-200 hover:border-green-500/30 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    v{skill.version}
                  </span>
                </div>
                <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-1 group-hover:text-green-400 transition-colors">
                  {skill.title}
                </h4>
                <p className="text-xs dark:text-gray-500 text-gray-500 line-clamp-2">{skill.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 知识库精选 */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">知识库精选</h2>
            </div>
            <Link href="/knowledge" className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300">
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestKnowledge.map(item => (
              <Link
                key={item.id}
                href={`/knowledge/${item.slug}`}
                className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-purple-500/30 transition-all flex items-start gap-4"
              >
                <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-1 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-2">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
