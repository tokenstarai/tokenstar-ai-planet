'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Zap, Globe, Brain, Code2, Star, ExternalLink, Building2, TrendingUp, Users, Lightbulb, BarChart3 } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const RESOURCE_SECTIONS = [
  {
    id: 'enterprise-ai',
    icon: Building2,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-800',
    badge: '核心入口',
    badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    title: '企业与 AI',
    description: '企业决策者的 AI 认知入口。从 AI 作为工具的第一阶段，到企业三阶段转型模型，用管理语言讲清楚 AI 对企业的真实价值。',
    links: [
      { label: '企业 AI 转型三阶段模型', href: '/resources/enterprise-ai', desc: '从认知到落地的完整路径' },
      { label: '90 天企业 AI 启动路径', href: '/resources/enterprise-ai#90days', desc: '可操作的行动框架' },
      { label: '企业 AI 决策框架', href: '/resources/enterprise-ai#framework', desc: 'ROI 结构与常见误区' },
    ],
    highlight: true,
  },
  {
    id: 'guide',
    icon: Lightbulb,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    badge: '战略思想',
    badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    title: 'AI 管理指南',
    description: '企业 AI 战略与组织升级的思想高地。探讨 AI 对组织结构、部门职能、绩效体系与人员结构的深层影响。',
    links: [
      { label: '组织结构变化与 Agent 影响', href: '/guide', desc: '部门重构与岗位演变' },
      { label: '企业 AI 风险与合规思考', href: '/guide#risk', desc: '数据安全与治理边界' },
    ],
    highlight: false,
  },
  {
    id: 'skills',
    icon: Zap,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    badge: '转化入口',
    badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    title: 'Skills 用例',
    description: 'AI 具体能为企业做什么。按业务部门拆解真实用例，每个用例对比传统流程与 Agent 流程，聚焦结果而非功能。',
    links: [
      { label: '销售 & 客服 Agent 用例', href: '/skills', desc: '漏斗追踪、智能客服、成交预测' },
      { label: '财务 & 人力 Agent 用例', href: '/skills#finance', desc: '报表自动化、简历筛选、绩效分析' },
      { label: '运营 & 管理层用例', href: '/skills#ops', desc: '流程自动化、战略辅助决策' },
    ],
    highlight: false,
  },
  {
    id: 'openclaw',
    icon: Brain,
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    badge: 'Agent 架构',
    badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    title: 'OpenClaw 框架',
    description: '理解超级 Agent 架构。用企业语言解释 OpenClaw 为什么适合企业、与传统 AI 的区别、私有化安全与商业落地价值。',
    links: [
      { label: '为什么是超级 Agent', href: '/openclaw', desc: '超越传统 AI 工具的架构优势' },
      { label: '企业私有化与安全', href: '/openclaw#security', desc: '数据不出域的完整方案' },
    ],
    highlight: false,
    hasLobster: true,
  },
  {
    id: 'blog',
    icon: Star,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'SEO & 热点',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: 'Blog',
    description: '行业热点、AI 新闻、OpenClaw 动态与基础知识普及。持续输出高质量内容，建立搜索引擎权威度。',
    links: [
      { label: '最新 Blog 文章', href: '/blog', desc: '行业热点与技术趋势' },
    ],
    highlight: false,
  },
  {
    id: 'knowledge',
    icon: Code2,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    badge: '开发者收藏',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    title: '知识库',
    description: 'AI 官方文档与开源入口集合（中文整理）。LLM 大模型、Agent 框架、Skills 工具生态与基础设施的一站式入口。',
    links: [
      { label: 'LLM 大模型入口', href: '/knowledge#llm', desc: 'GPT / Claude / Gemini / 国产大模型' },
      { label: 'Agent 框架入口', href: '/knowledge#agent', desc: 'OpenClaw / LangChain / AutoGen / CrewAI' },
      { label: '基础设施入口', href: '/knowledge#infra', desc: '向量数据库 / 推理框架 / 部署工具' },
    ],
    highlight: false,
  },
]

// OpenClaw 小龙虾互动区块
function LobsterBanner({ isDark }: { isDark: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-8 flex flex-col md:flex-row items-center gap-6 ${
      isDark
        ? 'bg-gradient-to-br from-red-950/40 via-neutral-900 to-orange-950/30 border-red-900/40'
        : 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-red-200'
    }`}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-orange-500 blur-3xl" />
      </div>

      {/* 小龙虾图标 */}
      <div className="relative flex-shrink-0 group cursor-pointer">
        <div className="w-28 h-28 md:w-36 md:h-36 relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Image
            src="/images/openclaw-hero-lobster.svg"
            alt="OpenClaw 小龙虾"
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
        {/* 悬浮提示 */}
        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
          isDark ? 'bg-red-900 text-red-200' : 'bg-red-600 text-white'
        }`}>
          👋 我是 OpenClaw！
        </div>
      </div>

      {/* 文字内容 */}
      <div className="flex-1 text-center md:text-left relative">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
          isDark ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          OpenClaw 超级 Agent 平台
        </div>
        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
          认识 OpenClaw —— 企业 AI 的超级 Agent
        </h3>
        <p className={`text-sm md:text-base leading-relaxed mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          不是工具，是组织重构的引擎。OpenClaw 让每个部门都有专属智能体，让企业 AI 从试点走向规模化。
        </p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Link
            href="/openclaw"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-500/20"
          >
            了解 OpenClaw <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/deployment"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
              isDark
                ? 'border-red-800 text-red-300 hover:bg-red-900/30'
                : 'border-red-300 text-red-700 hover:bg-red-50'
            }`}
          >
            查看部署方案 <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>

      {/* Hero */}
      <section className={`py-16 sm:py-20 border-b ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-6 ${isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            企业 AI 认知入口
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
            企业与 AI
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-4 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            企业决策者的 AI 认知与落地入口。
          </p>
          <p className={`text-base max-w-xl mx-auto mb-8 leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            不讲技术术语，只讲企业转型逻辑。从认知升级到落地实施，全程陪伴企业完成 AI 跃迁。
          </p>
          {/* 快速导航标签 */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: '企业与 AI', href: '#enterprise-ai' },
              { label: 'AI 管理指南', href: '#guide' },
              { label: 'Skills 用例', href: '#skills' },
              { label: 'OpenClaw 框架', href: '#openclaw' },
              { label: 'Blog', href: '#blog' },
              { label: '知识库', href: '#knowledge' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  isDark
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 hover:border-neutral-600'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OpenClaw 小龙虾互动横幅 */}
      <section className="py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <LobsterBanner isDark={isDark} />
        </div>
      </section>

      {/* 6个栏目 Grid */}
      <section className="pb-14 sm:pb-18">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCE_SECTIONS.map(section => (
              <div
                key={section.id}
                id={section.id}
                className={`rounded-2xl border p-6 flex flex-col transition-all hover:shadow-md relative overflow-hidden ${
                  section.highlight
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-800/60 hover:border-indigo-700'
                      : 'bg-indigo-50/80 border-indigo-200 hover:border-indigo-300'
                    : isDark
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* OpenClaw 小龙虾小图标装饰 */}
                {section.hasLobster && (
                  <div className="absolute top-4 right-4 w-10 h-10 opacity-60 hover:opacity-100 transition-opacity">
                    <Image
                      src="/images/openclaw-lobster.svg"
                      alt="OpenClaw"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* 图标 + badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`inline-flex p-2.5 rounded-xl border w-fit ${section.bg} ${section.border}`}>
                    <section.icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>

                {/* 标题与描述 */}
                <h2 className={`text-lg font-semibold mb-2 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                  {section.title}
                </h2>
                <p className={`text-sm leading-relaxed mb-5 flex-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {section.description}
                </p>

                {/* 链接列表 */}
                <div className="space-y-2">
                  {section.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                        isDark
                          ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
                          : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                          {link.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                          {link.desc}
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 transition-transform group-hover:translate-x-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className={`py-14 border-t ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
            准备开始企业 AI 转型？
          </h2>
          <p className={`text-base mb-8 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            从认知升级到落地实施，TokenStar 为企业提供完整的 AI 转型支撑。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/training"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
            >
              参加启智训练营 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scenarios"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all border ${
                isDark
                  ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700 hover:border-neutral-600'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
              }`}
            >
              查看解决方案 <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
