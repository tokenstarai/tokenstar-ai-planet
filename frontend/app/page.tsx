'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Brain, Shield, Layers, Globe, Star, Building2, TrendingUp, Users, BarChart3, Target, Server, Cloud, HardDrive, GraduationCap, Headphones, ChevronRight, BookOpen, Newspaper, Code2, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockNews, mockSkills, mockCases } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'
import { InteractiveParticleBackground } from '@/components/backgrounds/InteractiveParticleBackground'
import HeroBannerCarousel from '@/components/hero/HeroBannerCarousel'
import { useTheme } from '@/components/ThemeProvider'

const enterpriseScenarios = [
  { icon: TrendingUp, title: '销售管理 Agent', description: '自动追踪销售漏斗、生成拜访报告、预测成交概率，让销售总监实时掌握全局。', color: 'from-blue-500 to-cyan-500', href: '/scenarios#sales' },
  { icon: BarChart3, title: '财务分析 Agent', description: '实时汇总多维财务数据，自动生成管理报表，异常预警秒级响应。', color: 'from-green-500 to-emerald-500', href: '/scenarios#finance' },
  { icon: Globe, title: '市场洞察 Agent', description: '7×24 小时监控竞品动态、行业资讯，自动生成竞争分析简报。', color: 'from-purple-500 to-violet-500', href: '/scenarios#data' },
  { icon: Target, title: 'CEO 战略 Agent', description: '聚合内外部数据，辅助战略决策，将复杂信息转化为清晰的行动建议。', color: 'from-orange-500 to-red-500', href: '/scenarios#data' },
  { icon: Users, title: 'HR 管理 Agent', description: '智能简历筛选、绩效分析、员工关怀提醒，让 HR 聚焦高价值工作。', color: 'from-pink-500 to-rose-500', href: '/scenarios#hr' },
  { icon: Building2, title: '运营管理 Agent', description: '跨部门流程自动化，项目进度追踪，异常事项自动升级，提升组织执行力。', color: 'from-yellow-500 to-amber-500', href: '/scenarios#supply' },
]

const deploymentOptions = [
  { icon: HardDrive, title: 'Box Pro 私有硬件', description: '专为企业设计的 OpenClaw 一体机，S/M/L 三款覆盖 10–500 人团队，数据完全不出域，开箱即用，含 1 年上门运维。', badge: '推荐', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30', href: '/deployment#hardware' },
  { icon: Cloud, title: 'Cloud 云端托管', description: '零硬件投入，按需付费，5 分钟快速接入。Starter 适合 PoC 验证，Pro 支持多部门协作与弹性扩容。', badge: '快速', badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30', href: '/deployment#cloud' },
  { icon: Server, title: 'Workstation 轻量终端', description: '基于 iPhone 15 Pro / Mac mini M4 的轻量化方案，适合个人高管与小团队，随时随地调用企业 Agent。', badge: '轻量', badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30', href: '/deployment#workstation' },
]

const trainingOptions = [
  { icon: Brain, title: '管理层认知课程', description: 'AI Agent 时代的企业战略思维，帮助管理者理解并把握 AI 转型机遇。', duration: '1 天', href: '/training#executive' },
  { icon: GraduationCap, title: '企业实战营', description: '3 天密集训练，从零到一掌握 OpenClaw 企业级部署与应用开发。', duration: '3 天', href: '/training#bootcamp' },
  { icon: Headphones, title: '定制部署支持', description: '专属技术顾问团队，提供从需求分析到上线运维的全程陪跑服务。', duration: '持续', href: '/training#support' },
]

const resourceLinks = [
  { icon: Building2, label: '企业与AI', desc: '转型路径与决策框架', href: '/resources#enterprise-ai' },
  { icon: BookOpen, label: 'AI 管理指南', desc: '组织升级与战略思想', href: '/guide' },
  { icon: Zap, label: 'Skills 用例', desc: '按部门拆解真实用例', href: '/skills' },
  { icon: Brain, label: 'OpenClaw 框架', desc: '超级 Agent 架构解析', href: '/openclaw' },
  { icon: Star, label: 'Blog', desc: '行业热点与 AI 动态', href: '/blog' },
  { icon: Code2, label: '知识库', desc: 'AI 产品官方文档入口', href: '/knowledge' },
]

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const featuredCases = mockCases.filter((c: any) => c.featured).slice(0, 3)
  const featuredSkills = mockSkills.filter(s => s.featured).slice(0, 4)

  return (
    <div className="min-h-screen">

      {/* 1. Hero — 企业价值主张 */}
      <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden">
        {/* Banner 图片轮播：绝对定位在最底层 */}
        <HeroBannerCarousel />
        {/* 粒子动效层叠加在 Banner 上，增强科技感 */}
        <InteractiveParticleBackground />
        <div className="hero-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 3 }} />
        {/* Hero 内容：z-index 高于轮播和粒子层，按钮保持可点击 */}
        <div className="relative max-w-5xl mx-auto px-4 text-center py-12" style={{ zIndex: 10 }}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-6 ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            <Zap className="w-3.5 h-3.5" />
            企业级 AI 智能体实施平台
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            让 AI 成为每个部门的<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">超级管理 Agent</span>
          </h1>
          <div className={`text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="sm:whitespace-nowrap">从销售到供应链，从开源到节流，从财务到 HR，OpenClaw 企业智能体覆盖全部门管理场景。</p>
            <p className="sm:whitespace-nowrap">可落地、可量化、可持续的 AI 转型路径。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scenarios" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
              查看解决方案 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/cases" className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all border ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              查看成功案例 <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/training" className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all border ${isDark ? 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10' : 'border-amber-400 text-amber-700 hover:bg-amber-50'}`}>
              AI领航计划 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className={`mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {[{ value: '8+', label: '行业覆盖' }, { value: '24+', label: '落地案例' }, { value: '6', label: '部门场景' }].map(s => (
              <div key={s.label}>
                <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                <div className="text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 企业解决方案入口 — 行业 + 场景 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="企业智能体解决方案" subtitle="覆盖 8 大行业、6 大部门场景，每个管理岗位都有专属 Agent 支撑" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {enterpriseScenarios.map(s => (
              <Link key={s.title} href={s.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${s.color} flex-shrink-0`}><s.icon className="w-5 h-5 text-white" /></div>
                  <h3 className={`text-base font-semibold group-hover:text-blue-400 transition-colors leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>了解详情 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/scenarios" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-medium text-sm transition-all ${isDark ? 'border-white/20 text-gray-300 hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              查看全部解决方案 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 成功案例精选 */}
      <section className={`py-12 sm:py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader title="企业落地案例" subtitle="8 大行业 × 3 种规模，24 个真实部署路径参考" />
            <Link href="/cases" className={`hidden sm:flex items-center gap-1 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              查看全部案例 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {featuredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {featuredCases.map((item: any) => (
                <Link key={item.id} href={`/cases/${item.slug}`} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{item.category?.name || '企业案例'}</span>
                  </div>
                  <h3 className={`text-sm font-semibold mb-2 leading-snug group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.summary}</p>
                  <div className={`flex items-center gap-1.5 text-xs mt-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                    查看完整案例
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* 无 featured 案例时显示行业覆盖摘要 */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {['电商与零售', '制造与生产', '金融与保险', '医疗与健康'].map(industry => (
                <Link key={industry} href={`/cases?industry=${industry}`} className={`rounded-xl p-4 border text-center transition-all hover:shadow-md ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className={`text-sm font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{industry}</div>
                  <div className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>3 个案例</div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-2">
            <Link href="/cases" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-medium text-sm transition-all ${isDark ? 'border-white/20 text-gray-300 hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              查看全部 24 个案例 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 部署方式 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="三种部署路径，按需选择" subtitle="Box Pro 私有硬件 · Cloud 云端托管 · Workstation 轻量终端，覆盖 10 人到 500 人团队" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {deploymentOptions.map(o => (
              <Link key={o.title} href={o.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <o.icon className={`w-7 h-7 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h3 className={`text-base font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{o.title}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${o.badgeColor}`}>{o.badge}</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{o.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>查看方案 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/deployment" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-medium text-sm transition-all ${isDark ? 'border-white/20 text-gray-300 hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              查看完整部署方案与 ROI 测算 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. 企业培训支持 */}
      <section className={`py-12 sm:py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader title="认证与培训" subtitle="从认知到落地，全程陪伴企业完成 AI 转型" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {trainingOptions.map(o => (
              <Link key={o.title} href={o.href} className={`group rounded-2xl p-6 border transition-all hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10' : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <o.icon className={`w-7 h-7 flex-shrink-0 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-base font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{o.title}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>{o.duration}</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{o.description}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>了解详情 <ArrowRight className="w-3 h-3" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 资源中心入口 */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader title="企业&AI" subtitle="企业决策者的 AI 认知与落地入口，不讲技术术语，只讲转型逻辑" />
            <Link href="/resources" className={`hidden sm:flex items-center gap-1 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              进入企业&AI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {resourceLinks.map(r => (
              <Link key={r.href} href={r.href} className={`group rounded-xl p-4 border text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${isDark ? 'bg-slate-800/60 border-white/8 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                <r.icon className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-sm font-medium mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.label}</div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{r.desc}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/resources" className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border font-medium text-sm transition-all ${isDark ? 'border-white/20 text-gray-300 hover:bg-white/8' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              进入企业&AI <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 收口 CTA */}
      <section className={`py-14 sm:py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className={`rounded-3xl p-10 border ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-slate-800/60 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200'}`}>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>为您的企业设计专属智能体架构</h2>
            <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>从试点部署到规模化智能转型，我们为企业提供完整技术与服务支持。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about#contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all shadow-lg shadow-blue-500/25">
                预约企业部署评估 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/scenarios" className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all border ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                获取完整解决方案
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
