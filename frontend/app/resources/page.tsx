'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Newspaper, Zap, Globe, Brain, Code2, Star, ExternalLink } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const RESOURCE_SECTIONS = [
  {
    id: 'openclaw',
    icon: Brain,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'OpenClaw 专区',
    description: '深入了解 OpenClaw 企业级 AI Agent 平台的核心架构、技术优势与生态布局。',
    links: [
      { label: 'OpenClaw 介绍', href: '/openclaw', desc: '平台架构与核心能力概览' },
      { label: '生态动态', href: '/ecosystem', desc: '最新产品更新与合作伙伴资讯' },
    ],
  },
  {
    id: 'skills',
    icon: Zap,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    title: 'Skills 市场',
    description: '500+ 开箱即用的企业级 Skill 模块，覆盖数据分析、CRM 对接、文档处理等核心场景。',
    links: [
      { label: '浏览 Skills 市场', href: '/skills', desc: '查找适合您业务的 Skill 模块' },
    ],
  },
  {
    id: 'guide',
    icon: BookOpen,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    title: 'AI 管理指南',
    description: '为企业管理者提供系统化的 AI 转型方法论，从战略认知到落地执行的完整指引。',
    links: [
      { label: '管理指南', href: '/guide', desc: 'AI 转型战略与落地方法论' },
      { label: '知识库', href: '/knowledge', desc: '技术文档与最佳实践' },
    ],
  },
  {
    id: 'news',
    icon: Newspaper,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    title: '新闻动态',
    description: '及时获取 OpenClaw 生态最新资讯、行业动态与企业 AI 应用前沿报道。',
    links: [
      { label: '新闻中心', href: '/news', desc: '行业资讯与产品动态' },
      { label: 'Blog', href: '/blog', desc: '深度技术文章与实践分享' },
    ],
  },
  {
    id: 'tech',
    icon: Code2,
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    title: '技术生态',
    description: '开发者资源、API 文档与技术社区，支持企业技术团队深度定制与二次开发。',
    links: [
      { label: '知识库', href: '/knowledge', desc: 'API 文档与开发指南' },
      { label: 'Skills 开发', href: '/skills', desc: '自定义 Skill 开发规范' },
    ],
  },
  {
    id: 'events',
    icon: Globe,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
    title: '活动与社区',
    description: '线上线下企业交流活动、技术沙龙与用户社区，与同行共同探索 AI 落地路径。',
    links: [
      { label: '活动中心', href: '/events', desc: '近期线上线下活动' },
      { label: '关于', href: '/about', desc: '联系团队与合作咋询' },
    ],
  },
]

const QUICK_LINKS = [
  { label: 'OpenClaw 介绍', href: '/openclaw', icon: Brain },
  { label: 'Skills 市场', href: '/skills', icon: Zap },
  { label: 'AI 管理指南', href: '/guide', icon: BookOpen },
  { label: '新闻中心', href: '/news', icon: Newspaper },
  { label: 'Blog', href: '/blog', icon: Star },
  { label: '知识库', href: '/knowledge', icon: Code2 },
  { label: '生态动态', href: '/ecosystem', icon: Globe },
]

export default function ResourcesPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>

      {/* Hero */}
      <section className={`py-16 sm:py-20 border-b ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-6 ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            <BookOpen className="w-3.5 h-3.5" />
            生态与资源
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
            生态与资源中心
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            汇聚技术文档、行业资讯、Skills 市场与管理指南，为企业 AI 转型提供完整的知识与工具支撑。
          </p>
          {/* 快速链接 */}
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  isDark
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 hover:border-neutral-600'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 资源板块 Grid */}
      <section className="py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCE_SECTIONS.map(section => (
              <div
                key={section.id}
                className={`rounded-2xl border p-6 flex flex-col transition-all hover:shadow-md ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* 图标 */}
                <div className={`inline-flex p-2.5 rounded-xl border mb-4 w-fit ${section.bg} ${section.border}`}>
                  <section.icon className={`w-5 h-5 ${section.color}`} />
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
            查看企业解决方案与成功案例，或直接预约专家评估，获取定制化部署建议。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scenarios"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/20"
            >
              查看解决方案 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cases"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all border ${
                isDark
                  ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700 hover:border-neutral-600'
                  : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
              }`}
            >
              查看成功案例 <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
