import type { Metadata } from 'next'
import Link from 'next/link'
import { Server, ExternalLink, Star, CheckCircle, Zap } from 'lucide-react'
import { mockHardware } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'AI 硬件与云方案 | 企业级 AI 部署硬件选型指南',
  description: '探索 TokenStar 提供的 AI 硬件与云部署方案。从边缘推理盒到企业级集群，满足 10 人到 500 人团队的各种规模 AI 部署需求，配套专业运维支持。',
  keywords: ['AI硬件', 'AI部署', '企业集群', '边缘推理', '私有化硬件', 'Box Pro', 'TokenStar', 'OpenClaw硬件', '服务器'],
}

export default function HardwarePage() {
  const featured = mockHardware.filter(h => h.featured)
  const rest = mockHardware.filter(h => !h.featured)

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-cyan-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-cyan-500/30 text-xs text-cyan-400 mb-4">
            <Server className="w-3 h-3" />
            硬件 & 云方案
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">硬件 & 云部署方案</h1>
          <p className="text-gray-400 max-w-xl">
            从边缘推理盒到企业级集群，从私有化部署到云托管，全场景 AI 基础设施解决方案。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              推荐方案
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map(item => (
                <HardwareCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Server className="w-4 h-4 text-gray-400" />
            全部方案
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map(item => (
              <HardwareCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HardwareCard({ item }: { item: any }) {
  return (
    <div className="glass rounded-xl p-6 card-hover border border-white/5 hover:border-cyan-500/30 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="tag-badge">硬件方案</span>
        {item.featured && (
          <span className="flex items-center gap-1 text-xs text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            推荐
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4">{item.summary}</p>

      {/* Selling Points */}
      {item.selling_points && item.selling_points.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {item.selling_points.slice(0, 3).map((sp: any, i: number) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span><strong className="text-gray-300">{sp.title}：</strong>{sp.description}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
        <Link
          href={`/hardware/${item.slug}`}
          className="flex-1 text-center py-1.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all"
        >
          查看详情
        </Link>
        <a
          href={item.buy_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 rounded-lg text-sm bg-cyan-600 hover:bg-cyan-500 text-white transition-all flex items-center justify-center gap-1"
        >
          立即购买
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
