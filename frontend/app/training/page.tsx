import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, GraduationCap, Headphones, Users, Clock, Star, Calendar } from 'lucide-react'
import { mockEvents } from '@/lib/mock-data'
import { formatDate, getEventStatusLabel, getEventStatusColor } from '@/lib/api'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: '企业培训 - TokenStar',
  description: '面向企业管理者和技术团队的 OpenClaw AI 培训课程，从认知到落地，全程陪伴企业完成 AI 转型。',
}

const trainingProducts = [
  {
    id: 'executive',
    icon: Brain,
    title: '管理层认知课程',
    subtitle: 'AI Agent 时代的企业战略',
    duration: '1 天',
    format: '线下工作坊',
    audience: 'CEO、总裁、副总裁、总监级管理者',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'hover:border-blue-500/30',
    price: '面议',
    highlights: [
      'AI Agent 时代的商业逻辑与竞争格局',
      'OpenClaw 在企业管理中的核心价值',
      '如何制定企业 AI 转型路线图',
      '标杆企业 AI 落地案例深度解析',
      '管理者视角的 AI 风险与机遇',
    ],
    outcome: '帮助管理层建立 AI 战略思维，推动企业 AI 转型决策',
  },
  {
    id: 'bootcamp',
    icon: GraduationCap,
    title: '企业实战营',
    subtitle: '从零到一掌握 OpenClaw 部署',
    duration: '3 天',
    format: '线下集训',
    audience: '技术负责人、IT 经理、业务系统负责人',
    color: 'from-purple-500 to-violet-500',
    borderColor: 'hover:border-purple-500/30',
    price: '面议',
    highlights: [
      'OpenClaw 架构原理与核心概念',
      'Skills 安装、配置与自定义开发',
      '企业级部署方案实操演练',
      '典型业务场景 Agent 搭建实战',
      '安全配置与权限管理最佳实践',
    ],
    outcome: '学员能够独立完成 OpenClaw 企业级部署与基础应用开发',
  },
  {
    id: 'support',
    icon: Headphones,
    title: '定制部署支持',
    subtitle: '专属技术顾问全程陪跑',
    duration: '持续服务',
    format: '线上 + 线下',
    audience: '有明确落地需求的企业',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'hover:border-green-500/30',
    price: '按项目',
    highlights: [
      '需求调研与解决方案设计',
      '专属技术顾问 1v1 支持',
      '部署实施与系统集成',
      '员工培训与使用指导',
      '上线后持续运维支持',
    ],
    outcome: '确保 OpenClaw 在企业内部成功落地并持续产生业务价值',
  },
]

const whyUs = [
  { icon: Star, title: '原厂认证', desc: 'TokenStar 是 OpenClaw 官方授权的中国区培训合作伙伴' },
  { icon: Users, title: '专业团队', desc: '10+ 名具备企业 AI 落地经验的资深顾问与讲师' },
  { icon: GraduationCap, title: '实战导向', desc: '70% 实操演练，30% 理论讲解，学完即可上手' },
  { icon: Headphones, title: '持续支持', desc: '培训结束后提供 3 个月免费答疑与技术支持' },
]

export default function TrainingPage() {
  const upcomingEvents = mockEvents.filter(e => e.status !== 'finished').slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            企业培训
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">企业培训支持</h1>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            从管理层认知到技术团队实战，全程陪伴企业完成 AI 转型升级
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* 培训产品 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-8">培训产品体系</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trainingProducts.map(product => (
              <div
                key={product.id}
                id={product.id}
                className={`glass rounded-2xl p-6 border dark:border-white/8 border-gray-200 ${product.borderColor} transition-all flex flex-col`}
              >
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${product.color} mb-4 w-fit`}>
                  <product.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{product.title}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-4">{product.subtitle}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600">
                    <Clock className="w-3 h-3" />{product.duration}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600">
                    {product.format}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold dark:text-gray-300 text-gray-700 mb-2">课程亮点</div>
                  {product.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-600 mb-1.5">
                      <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />{h}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t dark:border-white/8 border-gray-100">
                  <p className="text-xs dark:text-gray-400 text-gray-500 mb-1">适合对象</p>
                  <p className="text-xs dark:text-white text-gray-900 mb-3">{product.audience}</p>
                  <p className="text-xs text-green-400">✓ {product.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 为什么选择我们 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">为什么选择 TokenStar 培训</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyUs.map(item => (
              <div key={item.title} className="glass rounded-xl p-5 border dark:border-white/8 border-gray-200 text-center">
                <item.icon className="w-6 h-6 dark:text-purple-400 text-purple-600 mx-auto mb-3" />
                <h4 className="text-sm font-semibold dark:text-white text-gray-900 mb-2">{item.title}</h4>
                <p className="text-xs dark:text-gray-400 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 近期活动 */}
        {upcomingEvents.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">近期培训活动</h2>
              <Link href="/events" className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300">
                查看全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {upcomingEvents.map(event => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-purple-500/30 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getEventStatusColor(event.status)}`}>
                      {getEventStatusLabel(event.status)}
                    </span>
                    <span className="text-xs dark:text-gray-500 text-gray-400">{event.type}</span>
                  </div>
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs dark:text-gray-500 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.start_time)}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 border dark:border-purple-500/20 border-purple-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">为你的团队定制培训方案</h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">告诉我们你的团队规模、岗位构成和学习目标，我们为你设计专属培训计划。</p>
            <Link href="/about#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all">
              申请定制培训方案 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
