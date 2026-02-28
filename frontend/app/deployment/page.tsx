import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, HardDrive, Cloud, Server, Shield, Zap, DollarSign, Clock, CheckCircle } from 'lucide-react'
import { mockHardware } from '@/lib/mock-data'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: '硬件 & 云部署 - TokenStar',
  description: '私有硬件、云端托管、混合架构三种部署方式，满足不同安全等级与成本预算的企业需求。',
}

const deploymentModes = [
  {
    id: 'hardware',
    icon: HardDrive,
    title: '私有硬件部署',
    badge: '推荐',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    color: 'border-blue-500/30',
    description: '将 OpenClaw 完整部署在企业自有服务器或专用 AI 硬件上，数据完全不出域，满足最高安全等级要求。',
    pros: ['数据完全本地化，不出域', '满足金融、政务等高安全要求', '性能稳定，不受网络影响', '一次投入，长期使用'],
    cons: ['前期硬件投入较高', '需要专业运维支持'],
    suitable: '金融机构、政府单位、大型制造企业、医疗机构',
    deployTime: '3-7 个工作日',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: '云端部署',
    badge: '快速',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    color: 'border-green-500/30',
    description: '通过 TokenStar 云服务快速接入 OpenClaw，零硬件投入，按需付费，5 分钟即可完成部署。',
    pros: ['零硬件投入，快速上线', '按需付费，弹性伸缩', '自动更新，无需运维', '适合快速验证 PoC'],
    cons: ['数据存储在云端', '依赖网络连接质量'],
    suitable: '初创企业、中小企业、PoC 验证阶段',
    deployTime: '5 分钟',
  },
  {
    id: 'hybrid',
    icon: Server,
    title: '混合部署',
    badge: '灵活',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    color: 'border-purple-500/30',
    description: '核心敏感数据和模型本地部署，弹性计算任务上云处理，兼顾数据安全与成本效益的最优解。',
    pros: ['核心数据本地，安全可控', '弹性算力上云，降低成本', '按业务需求灵活配置', '渐进式迁移，风险可控'],
    cons: ['架构设计较复杂', '需要网络连接保障'],
    suitable: '中大型企业、有数据分级需求的机构',
    deployTime: '5-14 个工作日',
  },
]

const comparisonData = [
  { feature: '数据安全等级', hardware: '最高', cloud: '中', hybrid: '高' },
  { feature: '部署速度', hardware: '3-7 天', cloud: '5 分钟', hybrid: '5-14 天' },
  { feature: '前期成本', hardware: '高', cloud: '低', hybrid: '中' },
  { feature: '运维复杂度', hardware: '中', cloud: '低', hybrid: '中高' },
  { feature: '弹性扩展', hardware: '有限', cloud: '强', hybrid: '强' },
  { feature: '网络依赖', hardware: '无', cloud: '强', hybrid: '中' },
  { feature: '适合规模', hardware: '中大型', cloud: '各规模', hybrid: '中大型' },
]

export default function DeploymentPage() {
  const featuredHardware = mockHardware.filter(h => h.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            <Server className="w-3.5 h-3.5" />
            部署方案
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">硬件 &amp; 云部署</h1>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            三种部署模式，满足不同安全等级与成本预算，专业团队全程支持
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* 三种部署方式 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-8">选择适合你的部署方式</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {deploymentModes.map(mode => (
              <div
                key={mode.id}
                id={mode.id}
                className={`glass rounded-2xl p-6 border dark:border-white/8 border-gray-200 ${mode.color} transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <mode.icon className="w-8 h-8 dark:text-blue-400 text-blue-600" />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${mode.badgeColor}`}>{mode.badge}</span>
                </div>
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-5">{mode.description}</p>

                <div className="mb-4">
                  <div className="text-xs font-semibold dark:text-gray-300 text-gray-700 mb-2 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" /> 优势
                  </div>
                  {mode.pros.map(p => (
                    <div key={p} className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-600 mb-1">
                      <div className="w-1 h-1 rounded-full bg-green-400 shrink-0" />{p}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t dark:border-white/8 border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 dark:text-gray-500 text-gray-400" />
                    <span className="dark:text-gray-400 text-gray-600">部署时间：</span>
                    <span className="dark:text-white text-gray-900 font-medium">{mode.deployTime}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <Shield className="w-3.5 h-3.5 dark:text-gray-500 text-gray-400 shrink-0 mt-0.5" />
                    <span className="dark:text-gray-400 text-gray-600">适合：{mode.suitable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 对比表格 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">方案对比</h2>
          <div className="glass rounded-2xl border dark:border-white/8 border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="dark:bg-white/5 bg-gray-50 border-b dark:border-white/8 border-gray-200">
                    <th className="text-left px-5 py-3 dark:text-gray-400 text-gray-600 font-medium">对比维度</th>
                    <th className="text-center px-5 py-3 dark:text-white text-gray-900 font-semibold">私有硬件</th>
                    <th className="text-center px-5 py-3 dark:text-white text-gray-900 font-semibold">云端部署</th>
                    <th className="text-center px-5 py-3 dark:text-white text-gray-900 font-semibold">混合部署</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={`border-b dark:border-white/5 border-gray-100 ${i % 2 === 0 ? '' : 'dark:bg-white/2 bg-gray-50/50'}`}>
                      <td className="px-5 py-3 dark:text-gray-400 text-gray-600">{row.feature}</td>
                      <td className="px-5 py-3 text-center dark:text-white text-gray-900">{row.hardware}</td>
                      <td className="px-5 py-3 text-center dark:text-white text-gray-900">{row.cloud}</td>
                      <td className="px-5 py-3 text-center dark:text-white text-gray-900">{row.hybrid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 推荐硬件 */}
        {featuredHardware.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">推荐硬件方案</h2>
              <Link href="/hardware" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                查看全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredHardware.map(hw => (
                <div key={hw.id} className="glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-badge">硬件方案</span>
                    {hw.featured && <span className="text-xs text-yellow-400">★ 推荐</span>}
                  </div>
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2">{hw.title}</h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-2 mb-4">{hw.summary}</p>
                  <div className="flex gap-2">
                    <Link href={`/hardware/${hw.slug}`} className="flex-1 text-center py-2 rounded-lg text-xs dark:text-gray-300 text-gray-600 border dark:border-white/10 border-gray-200 dark:hover:border-white/30 hover:border-gray-400 transition-all">
                      查看详情
                    </Link>
                    <a href={hw.buy_link} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 rounded-lg text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all">
                      立即购买
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 border dark:border-blue-500/20 border-blue-200 max-w-2xl mx-auto">
            <DollarSign className="w-8 h-8 dark:text-blue-400 text-blue-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">不确定选哪种方案？</h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">联系我们的技术顾问，根据你的业务规模、安全要求和预算，为你推荐最合适的部署方案。</p>
            <Link href="/about#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all">
              免费获取部署建议 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
