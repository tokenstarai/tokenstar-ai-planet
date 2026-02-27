import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Briefcase, ArrowLeft, TrendingUp, CheckCircle } from 'lucide-react'
import { mockCases } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockCases.find(c => c.slug === params.slug)
  if (!item) return { title: '案例未找到' }
  return { title: item.title, description: item.summary }
}

export async function generateStaticParams() {
  return mockCases.map(c => ({ slug: c.slug }))
}

export default function CaseDetailPage({ params }: Props) {
  const item = mockCases.find(c => c.slug === params.slug) as any
  if (!item) notFound()

  const related = mockCases.filter(c => c.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <span>/</span>
          <Link href="/cases" className="hover:text-gray-300">案例中心</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{item.title}</span>
        </div>

        <article>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Briefcase className="w-4 h-4 text-orange-400" />
            {item.category && <span className="tag-badge">{item.category.name}</span>}
            {item.tags?.map((tag: any) => (
              <span key={tag.slug} className="text-xs text-gray-500">#{tag.name}</span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{item.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-white/10">
            <span>{formatDate(item.published_at)}</span>
          </div>

          {/* Summary */}
          <div className="glass rounded-xl p-5 border border-orange-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed">{item.summary}</p>
          </div>

          {/* Results */}
          {item.results && item.results.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                核心成果
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {item.results.map((result: any, i: number) => (
                  <div key={i} className="glass rounded-xl p-4 border border-orange-500/20 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{
              __html: item.content || `
                <h2>项目背景</h2>
                <p>${item.summary}</p>
                <h2>解决方案</h2>
                <p>基于 OpenClaw 平台，我们为客户设计并实施了完整的 AI Agent 解决方案，包括需求分析、方案设计、开发实施和上线运营全流程支持。</p>
                <h2>实施过程</h2>
                <p>项目分三个阶段实施：第一阶段完成核心功能开发和内部测试；第二阶段进行小范围试点和优化；第三阶段全面推广上线。</p>
                <h2>项目成果</h2>
                <p>项目上线后取得了显著成效，客户满意度大幅提升，运营效率明显改善，为客户带来了可量化的业务价值。</p>
              `
            }}
          />
        </article>

        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-white mb-6">相关案例</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/cases/${r.slug}`} className="group block glass rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-all">
                  <span className="tag-badge text-xs mb-2 inline-block">{r.category?.name}</span>
                  <h4 className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors line-clamp-2">{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/cases" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回案例中心
          </Link>
        </div>
      </div>
    </div>
  )
}
