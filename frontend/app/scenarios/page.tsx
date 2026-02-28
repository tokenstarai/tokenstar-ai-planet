import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, BarChart3, Globe, Target, Users, Building2, Briefcase, Factory, Heart, GraduationCap, Shield } from 'lucide-react'
import { mockCases } from '@/lib/mock-data'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: '企业应用场景 - TokenStar',
  description: '探索 OpenClaw 在销售、财务、市场、战略等企业管理场景的落地应用，助力企业进入 Agent 时代。',
}

const agentScenarios = [
  {
    id: 'sales',
    icon: TrendingUp,
    title: '销售管理 Agent',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'hover:border-blue-500/30',
    description: '自动追踪销售漏斗、生成拜访报告、预测成交概率，让销售总监实时掌握全局动态。',
    capabilities: ['销售漏斗自动追踪', '拜访报告智能生成', '成交概率预测', 'CRM 数据自动同步', '销售目标达成预警'],
    value: '销售效率提升 40%，漏单率降低 25%',
  },
  {
    id: 'finance',
    icon: BarChart3,
    title: '财务分析 Agent',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'hover:border-green-500/30',
    description: '实时汇总多维财务数据，自动生成管理报表，异常预警秒级响应，辅助财务决策。',
    capabilities: ['多维财务数据汇总', '管理报表自动生成', '异常指标实时预警', '预算执行追踪', '现金流预测分析'],
    value: '财务报表生成时间从 3 天缩短至 30 分钟',
  },
  {
    id: 'market',
    icon: Globe,
    title: '市场洞察 Agent',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'hover:border-purple-500/30',
    description: '7×24 小时监控竞品动态、行业资讯，自动生成竞争分析简报，支撑市场战略决策。',
    capabilities: ['竞品动态实时监控', '行业资讯自动汇总', '竞争分析报告生成', '市场趋势预判', '品牌声量监测'],
    value: '市场情报响应速度提升 10 倍',
  },
  {
    id: 'ceo',
    icon: Target,
    title: 'CEO 战略 Agent',
    color: 'from-orange-500 to-red-500',
    borderColor: 'hover:border-orange-500/30',
    description: '聚合内外部数据，辅助战略决策，将复杂信息转化为清晰的行动建议和决策支持。',
    capabilities: ['多源数据智能聚合', '战略建议自动生成', '风险因素识别预警', '行业对标分析', '决策影响模拟推演'],
    value: '高管决策效率提升，信息盲区减少 60%',
  },
  {
    id: 'hr',
    icon: Users,
    title: 'HR 管理 Agent',
    color: 'from-pink-500 to-rose-500',
    borderColor: 'hover:border-pink-500/30',
    description: '智能简历筛选、绩效分析、员工关怀提醒，让 HR 从事务性工作中解放，聚焦高价值工作。',
    capabilities: ['简历智能筛选匹配', '绩效数据分析报告', '员工关怀节点提醒', '离职风险预测', '培训需求智能识别'],
    value: '招聘效率提升 50%，HR 人效提升 35%',
  },
  {
    id: 'ops',
    icon: Building2,
    title: '运营管理 Agent',
    color: 'from-yellow-500 to-amber-500',
    borderColor: 'hover:border-yellow-500/30',
    description: '跨部门流程自动化，项目进度追踪，异常事项自动升级，全面提升组织执行力。',
    capabilities: ['跨部门流程自动化', '项目进度实时追踪', '异常事项自动升级', '会议纪要智能生成', '任务分配与提醒'],
    value: '跨部门协作效率提升 45%，延误率降低 30%',
  },
]

const industries = [
  { icon: Briefcase, name: '金融', desc: '风控、合规、投研报告自动化' },
  { icon: Factory, name: '制造', desc: '生产调度、质检报告、供应链优化' },
  { icon: Heart, name: '医疗', desc: '病历分析、药品管理、患者服务' },
  { icon: GraduationCap, name: '教育', desc: '个性化学习、教务管理、成绩分析' },
  { icon: Shield, name: '政务', desc: '公文处理、数据汇总、政策解读' },
  { icon: Globe, name: '零售', desc: '库存预测、客服自动化、选品分析' },
]

export default function ScenariosPage() {
  const featuredCases = mockCases.filter(c => c.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-4">
            <Building2 className="w-3.5 h-3.5" />
            企业应用
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">企业应用场景</h1>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            覆盖管理全链路，每个岗位都有专属 Agent 支撑，帮助企业全面进入 AI 管理时代
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Agent 场景详解 */}
        <section className="mb-16">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-8">管理场景 Agent</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agentScenarios.map(scenario => (
              <div
                key={scenario.id}
                id={scenario.id}
                className={`glass rounded-2xl p-6 border dark:border-white/8 border-gray-200 ${scenario.borderColor} transition-all`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${scenario.color} shrink-0`}>
                    <scenario.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold dark:text-white text-gray-900 mb-1">{scenario.title}</h3>
                    <p className="text-sm dark:text-gray-400 text-gray-600">{scenario.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                  {scenario.capabilities.map(cap => (
                    <div key={cap} className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-600">
                      <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      {cap}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t dark:border-white/8 border-gray-100">
                  <p className="text-xs font-medium text-green-400">✓ {scenario.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 行业覆盖 */}
        <section className="mb-16">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">行业覆盖</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map(ind => (
              <div key={ind.name} className="glass rounded-xl p-4 border dark:border-white/8 border-gray-200 text-center hover:border-blue-500/30 transition-all">
                <ind.icon className="w-6 h-6 dark:text-blue-400 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-semibold dark:text-white text-gray-900 mb-1">{ind.name}</div>
                <div className="text-xs dark:text-gray-500 text-gray-500">{ind.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 成功案例 */}
        {featuredCases.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">成功案例</h2>
              <Link href="/cases" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                查看全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredCases.map(item => (
                <Link
                  key={item.id}
                  href={`/cases/${item.slug}`}
                  className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-orange-500/30 transition-all hover:-translate-y-0.5"
                >
                  {item.category && <span className="tag-badge mb-3 inline-block">{item.category.name}</span>}
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-3">{item.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 border dark:border-blue-500/20 border-blue-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">找到适合你的场景了吗？</h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">预约企业 AI 咨询，专家团队为你定制专属落地方案</p>
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
            >
              预约免费咨询 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
