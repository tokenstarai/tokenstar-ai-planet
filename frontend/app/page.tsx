'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Brain, Shield, Layers, Globe, Star, Building2, TrendingUp, Users, BarChart3, Target, Server, Cloud, HardDrive, GraduationCap, Headphones, ChevronRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockNews, mockSkills } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'
import { InteractiveParticleBackground } from '@/components/backgrounds/InteractiveParticleBackground'
import { useTheme } from '@/components/ThemeProvider'

const enterpriseScenarios = [
  { icon: TrendingUp, title: '销售管理 Agent', description: '自动追踪销售漏斗、生成拜访报告、预测成交概率，让销售总监实时掌握全局。', color: 'from-blue-500 to-cyan-500', href: '/scenarios#sales' },
  { icon: BarChart3, title: '财务分析 Agent', description: '实时汇总多维财务数据，自动生成管理报表，异常预警秒级响应。', color: 'from-green-500 to-emerald-500', href: '/scenarios#finance' },
  { icon: Globe, title: '市场洞察 Agent', description: '7×24 小时监控竞品动态、行业资讯，自动生成竞争分析简报。', color: 'from-purple-500 to-violet-500', href: '/scenarios#market' },
  { icon: Target, title: 'CEO 战略 Agent', description: '聚合内外部数据，辅助战略决策，将复杂信息转化为清晰的行动建议。', color: 'from-orange-500 to-red-500', href: '/scenarios#ceo' },
  { icon: Users, title: 'HR 管理 Agent', description: '智能简历筛选、绩效分析、员工关怀提醒，让 HR 聚焦高价值工作。', color: 'from-pink-500 to-rose-500', href: '/scenarios#hr' },
  { icon: Building2, title: '运营管理 Agent', description: '跨部门流程自动化，项目进度追踪，异常事项自动升级，提升组织执行力。', color: 'from-yellow-500 to-amber-500', href: '/scenarios#ops' },
]

const deploymentOptions = [
  { icon: HardDrive, title: '私有硬件部署', description: '数据完全不出域，满足金融、政务等高安全要求，开箱即用。', badge: '推荐', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30', href: '/deployment#hardware' },
  { icon: Cloud, title: '云端部署', description: '零硬件投入，按需付费，5 分钟快速接入，适合初创与 PoC 验证。', badge: '快速', badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30', href: '/deployment#cloud' },
  { icon: Server, title: '混合部署', description: '核心数据本地，弹性算力上云，兼顾安全与成本的最优解。', badge: '灵活', badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30', href: '/deployment#hybrid' },
]

const trainingOptions = [
  { icon: Brain, title: '管理层认知课程', description: 'AI Agent 时代的企业战略思维，帮助管理者理解并把握 AI 转型机遇。', duration: '1 天', href: '/training#executive' },
  { icon: GraduationCap, title: '企业实战营', description: '3 天密集训练，从零到一掌握 OpenClaw 企业级部署与应用开发。', duration: '3 天', href: '/training#bootcamp' },
  { icon: Headphones, title: '定制部署支持', description: '专属技术顾问团队，提供从需求分析到上线运维的全程陪跑服务。', duration: '持续', href: '/training#support' },
]

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const featuredNews = mockNews.filter(n => n.featured).slice(0, 3)
  const featuredSkills = mockSkills.filter(s => s.featured).slice(0, 4)

  return (
    <div className="min-h-screen">

      {/* 1. Hero */}
      <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden">
        <InteractiveParticleBackground />
        <div className="hero-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} />
        <div className="relative max-w-5xl mx-auto px-4 text-center py-12" style={{ zIndex: 10 }}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-6 ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            <Zap className="w-3.5 h-3.5" />
            OpenClaw 企业应用与生态中心
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            让 OpenClaw 成为你的<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">企业超级管理 Agent</span>
          </h1>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            进入 Agent &amp; Skill 时代，用 AI 提升企业执行力与决策力。<br />
            从销售到战略，每个管理场景都有专属 Agent 支撑。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scenarios" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
              查看企业应用场景 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/deployment" className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all border ${isDark ? 'border-white/20 text-white hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              查看部署方案 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className={`mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {[{ value: '500+', label: 'Skills 生态' }, { value: '20+', label: '行业场景' }, { value: '98.7%', label: 'RAG 精度' }].map(s => (
              <div key={s.label}>
                <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                <div className="text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Agent & Skill 时代说明 */}
      <section className={`py-12 sm:py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="进入 Agent & Skill 时代" subtitle="理解 AI 转型的核心概念，把握企业升级的战略机遇" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[
              { icon: Brain, title: '什么是 Agent', color: 'text-blue-400', desc: 'Agent 是能够自主感知环境、制定计划、调用工具并执行任务的 AI 系统。它不只是回答问题，而是真正"做事"——替你完成复杂的多步骤业务流程。' },
              { icon: Layers, title: '什么是 Skill', color: 'text-purple-400', desc: 'Skill 是 Agent 的能力模块，如同企业员工的专业技能。安装一个 Skill，Agent 即获得对应能力——搜索、代码执行、数据分析、CRM 对接……500+ 开箱即用。' },
              { icon: Building2, title: '为何企业必须进入 Agent 时代', color: 'text-green-400', desc: '传统 RPA 只能处理规则化流程，而 Agent 能理解意图、应对变化。率先部署 Agent 的企业将在执行效率和决策质量上建立难以追赶的竞争优势。' },
            ].map(item => (
              <div key={item.title} className={`rounded-2xl p-6 border transition-all hover:shadow-md ${isDark ? 'bg-slate-800/60 border-white/8' : 'bg-white border-gray-200'}`}>
                <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 企业应用场景 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="企业应用场景" subtitle="覆盖管理全链路，每个岗位都有专属 Agent 支撑" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {enterpriseScenarios.map(s => (
              <Link key={s.title} href={s.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${s.color} mb-4`}><s.icon className="w-5 h-5 text-white" /></div>
                <h3 className={`text-base font-semibold mb-2 group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>了解详情 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/scenarios" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-medium text-sm transition-all ${isDark ? 'border-white/20 text-gray-300 hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              查看全部应用场景 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 部署方式 */}
      <section className={`py-12 sm:py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="灵活部署，按需选择" subtitle="私有硬件、云端托管、混合架构，满足不同安全与成本需求" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {deploymentOptions.map(o => (
              <Link key={o.title} href={o.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                <div className="flex items-start justify-between mb-4">
                  <o.icon className={`w-7 h-7 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${o.badgeColor}`}>{o.badge}</span>
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{o.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{o.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>查看方案 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 企业培训 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="企业培训支持" subtitle="从认知到落地，全程陪伴企业完成 AI 转型" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {trainingOptions.map(o => (
              <Link key={o.title} href={o.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'}`}>
                <div className="flex items-start justify-between mb-4">
                  <o.icon className={`w-7 h-7 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>{o.duration}</span>
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{o.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{o.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>了解详情 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OpenClaw 生态动态 */}
      <section className={`py-12 sm:py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader title="OpenClaw 生态动态" subtitle="最新产品更新、技术进展与生态资讯" />
            <Link href="/ecosystem" className={`hidden sm:flex items-center gap-1 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {featuredNews.map(item => (
              <ContentCard key={item.id} slug={item.slug} title={item.title} summary={item.summary} href={`/news/${item.slug}`} published_at={item.published_at} featured={item.featured} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSkills.map(skill => (
              <Link key={skill.id} href={`/skills/${skill.slug}`} className={`group rounded-xl p-4 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-green-500/30' : 'bg-white border-gray-200 hover:border-green-300'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${isDark ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200'}`}>v{skill.version}</span>
                  {skill.featured && <Star className="w-3.5 h-3.5 text-yellow-400" />}
                </div>
                <h4 className={`text-sm font-semibold mb-1 group-hover:text-green-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.title}</h4>
                <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{skill.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 咨询 CTA */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className={`rounded-3xl p-10 border ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-slate-800/60 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200'}`}>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>准备好让 AI 升级你的企业管理了吗？</h2>
            <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>预约企业 AI 咨询，我们的专家团队将为你定制专属的 OpenClaw 落地方案。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about#contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/25">
                预约企业 AI 咨询 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/scenarios" className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all border ${isDark ? 'border-white/20 text-white hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                浏览应用场景
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
