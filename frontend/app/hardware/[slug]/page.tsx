import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Server, ArrowLeft, ExternalLink, CheckCircle, Star, Cpu, ShoppingCart } from 'lucide-react'
import { mockHardware } from '@/lib/mock-data'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockHardware.find(h => h.slug === params.slug)
  if (!item) return { title: '方案未找到' }
  return { title: `${item.title} - 硬件 & 云方案`, description: item.summary }
}

export async function generateStaticParams() {
  return mockHardware.map(h => ({ slug: h.slug }))
}

export default function HardwareDetailPage({ params }: Props) {
  const item = mockHardware.find(h => h.slug === params.slug)
  if (!item) notFound()

  const related = mockHardware.filter(h => h.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <span>/</span>
          <Link href="/hardware" className="hover:text-gray-300">硬件 & 云方案</Link>
          <span>/</span>
          <span className="text-gray-300">{item.title}</span>
        </div>

        {/* Product Header */}
        <div className="glass rounded-2xl p-8 border border-cyan-500/20 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Server className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{item.title}</h1>
                {item.featured && (
                  <span className="flex items-center gap-1 text-sm text-yellow-400 mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    推荐方案
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{item.summary}</p>

          {/* Selling Points */}
          {item.selling_points && item.selling_points.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {item.selling_points.map((sp: any, i: number) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">{sp.title}</span>
                  </div>
                  <p className="text-xs text-gray-400">{sp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Buy Button */}
          <a
            href={item.buy_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <ShoppingCart className="w-5 h-5" />
            立即购买
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Scenario */}
        {item.scenario && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">适用场景</h2>
            <div className="glass rounded-xl p-5 border border-white/5">
              <p className="text-gray-300 leading-relaxed">{item.scenario}</p>
            </div>
          </div>
        )}

        {/* Configuration */}
        {item.configuration && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              硬件配置
            </h2>
            <div
              className="prose-dark glass rounded-xl p-6 border border-white/5"
              dangerouslySetInnerHTML={{ __html: item.configuration }}
            />
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-6">其他方案</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <div key={r.id} className="glass rounded-xl p-4 border border-white/5 hover:border-cyan-500/30 transition-all">
                  <h4 className="text-sm font-medium text-white mb-2">{r.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{r.summary}</p>
                  <div className="flex gap-2">
                    <Link href={`/hardware/${r.slug}`} className="flex-1 text-center py-1 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all">
                      详情
                    </Link>
                    <a href={r.buy_link} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-1 text-xs bg-cyan-600/80 hover:bg-cyan-600 text-white rounded-lg transition-all flex items-center justify-center gap-1">
                      购买
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/hardware" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回硬件 & 云方案
          </Link>
        </div>
      </div>
    </div>
  )
}
