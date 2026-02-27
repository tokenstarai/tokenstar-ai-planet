import type { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, ArrowRight, TrendingUp } from 'lucide-react'
import { mockCases } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'

export const metadata: Metadata = {
  title: '案例中心',
  description: 'OpenClaw 企业落地案例，覆盖金融、医疗、制造、电商、政务、教育等行业。',
}

export default function CasesPage() {
  const featured = mockCases.filter(c => c.featured)
  const rest = mockCases.filter(c => !c.featured)

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-orange-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-orange-500/30 text-xs text-orange-400 mb-4">
            <Briefcase className="w-3 h-3" />
            案例中心
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">企业落地案例</h1>
          <p className="text-gray-400 max-w-xl">
            来自各行各业的真实 OpenClaw 落地实践，数据驱动，效果可量化。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              精选案例
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(item => (
                <CaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-500 rounded-full" />
            全部案例
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(item => (
              <CaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CaseCard({ item }: { item: any }) {
  return (
    <Link href={`/cases/${item.slug}`} className="group block glass rounded-xl p-6 card-hover border border-white/5 hover:border-orange-500/30">
      <div className="flex items-start justify-between mb-3">
        <span className="tag-badge">{item.category?.name}</span>
        {item.featured && (
          <span className="text-xs text-orange-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            精选
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors mb-3 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4">{item.summary}</p>
      <div className="flex items-center gap-2 text-sm text-orange-400">
        <span>查看详情</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
