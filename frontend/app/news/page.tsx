import type { Metadata } from 'next'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockNews } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: '新闻中心 | OpenClaw 与 AI 生态最新动态',
  description: '掌握 OpenClaw 与 TokenStar 最新动态。这里汇聚产品更新、合作公告、生态动态与行业技术资讯，为企业决策者提供及时、准确的 AI 领域信息。',
  keywords: ['OpenClaw新闻', 'AI资讯', 'TokenStar动态', 'AI生态', '产品更新', '行业动态', 'AI新闻', '智能体资讯'],
}

export default function NewsPage() {
  const featured = mockNews.filter(n => n.featured)
  const rest = mockNews.filter(n => !n.featured)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-blue-500/30 text-xs text-blue-400 mb-4">
            新闻中心
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">OpenClaw 生态动态</h1>
          <p className="text-gray-400 max-w-xl">
            第一时间获取 OpenClaw 产品更新、合作伙伴动态、社区资讯与行业新闻。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Featured News */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full" />
              推荐新闻
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((item) => (
                <ContentCard key={item.id} {...item} href={`/news/${item.slug}`} />
              ))}
            </div>
          </div>
        )}

        {/* All News */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gray-500 rounded-full" />
            全部新闻
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item) => (
              <ContentCard key={item.id} {...item} href={`/news/${item.slug}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
