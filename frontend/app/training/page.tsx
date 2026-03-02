'use client'

import Image from 'next/image'
import {
  Calendar, MapPin, Users, Clock, ArrowRight,
  Lightbulb, TrendingUp, Target, Compass, Layers,
  ChevronRight, Building2, Network, Zap, Star,
  Globe, BarChart3, RefreshCw, MessageSquare
} from 'lucide-react'

const managementSchedule = [
  {
    day: 'Day 1',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'AI 时代企业格局变化',
    desc: '从产业视角理解 AI 浪潮的结构性变化，看清未来 3 年哪些行业将被重塑，企业的机会窗口在哪里。',
  },
  {
    day: 'Day 2',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'Agent 智能体与企业组织升级',
    desc: '理解智能体如何改变企业的组织结构与工作方式，AI 不只是工具，而是一次深层的管理变革。',
  },
  {
    day: 'Day 3',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'OpenCLAW 在企业中的真实应用案例',
    desc: '通过真实企业案例，看懂智能体在不同行业的落地方式，以及企业如何从"工具使用"升级为"系统重构"。',
  },
  {
    day: 'Day 4',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '企业转型路径工作坊',
    desc: '结合自身企业现状，在引导师带领下设计专属的 AI 转型路径，明确优先级与行动节奏。',
  },
  {
    day: 'Day 5',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '企业升级方案共创与交流',
    desc: '与同频企业家共同打磨升级方案，互相碰撞想法，带走一份可落地的企业 AI 行动清单。',
  },
]

const gains = [
  { icon: TrendingUp, text: '看清 AI 大时代的产业结构变化' },
  { icon: Network, text: '理解 Agent 智能体如何改变企业组织' },
  { icon: Globe, text: '看懂 OpenCLAW 带来的商业机会' },
  { icon: RefreshCw, text: '重新设计公司业务升级路径' },
  { icon: Target, text: '明确企业该如何启动 AI 转型' },
]

const formats = [
  { icon: Lightbulb, title: '认知升级', desc: '打破旧有认知框架，建立 AI 时代的新思维模型' },
  { icon: BarChart3, title: '案例拆解', desc: '真实企业 AI 转型案例，看懂别人怎么做的' },
  { icon: Compass, title: '战略研讨', desc: '围绕企业战略方向，深度研讨 AI 机会与风险' },
  { icon: MessageSquare, title: '小组交流', desc: '与同频企业家碰撞想法，互相启发' },
  { icon: Target, title: '企业路径设计', desc: '为自己的公司设计专属的 AI 升级路径' },
]

const coreQuestions = [
  'AI 对企业未来 3 年意味着什么？',
  'Agent 会不会取代部分岗位？',
  '公司如何通过智能体提高效率？',
  'OpenCLAW 在企业中的真实应用场景？',
  '企业如何从"工具使用"升级为"系统重构"？',
]

const targetAudience = [
  { icon: Building2, label: '企业老板' },
  { icon: Star, label: '总经理' },
  { icon: Layers, label: '事业部负责人' },
  { icon: Zap, label: '有管理经验的创业者' },
]

const networkBenefits = [
  { icon: Star, title: 'TokenStar 实施者名录', desc: '进入官方认证实施者名录，获得公开展示资格。' },
  { icon: Building2, title: '企业项目优先参与', desc: '优先获得 TokenStar 生态企业项目合作机会。' },
  { icon: Layers, title: '后续内测资格', desc: '优先参与 OpenCLAW 新功能内测与反馈共建。' },
  { icon: Network, title: '生态资源共享', desc: '接入企业家社群，共享案例、洞察与最佳实践。' },
]

export default function TrainingPage() {
  return (
    <main className="min-h-screen dark:bg-[#0a0a0f] bg-gray-50">

      {/* Hero — 中国尊背景图 */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
        {/* 背景图片 */}
        <Image
          src="/images/training/china-zun.webp"
          alt="北京中信大厦中国尊"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* 深色主题遮罩：深蓝黑色，与图片蓝色调协调 */}
        <div
          className="absolute inset-0 dark:block hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(8,12,28,0.78) 0%, rgba(8,12,28,0.82) 60%, rgba(10,10,15,0.96) 100%)'
          }}
        />
        {/* 浅色主题遮罩：白色半透明，保持文字清晰 */}
        <div
          className="absolute inset-0 dark:hidden block"
          style={{
            background: 'linear-gradient(180deg, rgba(240,246,255,0.82) 0%, rgba(240,246,255,0.88) 60%, rgba(248,250,255,0.97) 100%)'
          }}
        />
        {/* Hero 内容 */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-amber-500/20 bg-amber-100/80 dark:border dark:border-amber-500/40 border border-amber-300 mb-6 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 dark:text-amber-400 text-amber-600" />
            <span className="text-sm font-semibold dark:text-amber-300 text-amber-700">北京首发 · 中国尊站</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-5 leading-tight drop-shadow-sm">
            认证与培训
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-200 text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            站在企业决策者视角，理解 AI 与 Agent 时代带来的机遇与挑战，重新设计公司未来 3 年的发展路径。
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Clock, text: '5天混合制（线上3天 + 线下2天）' },
              { icon: MapPin, text: '北京 · 中信大厦中国尊' },
              { icon: Calendar, text: '2026年3月28日开营' },
              { icon: Users, text: '限20席 · 申请制' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/10 bg-white/70 border dark:border-white/15 border-gray-300/60 shadow-sm backdrop-blur-sm">
                <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600 shrink-0" />
                <span className="text-sm font-medium dark:text-gray-100 text-gray-800">{text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/events/qizhi-bootcamp-2026"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/30"
            >
              申请管理层专场席位
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/about#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-white/10 bg-white/80 border dark:border-white/20 border-gray-300 dark:text-white text-gray-800 font-semibold text-base hover:dark:bg-white/15 hover:bg-white transition-all backdrop-blur-sm"
            >
              预约企业咨询
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* 模块 1：AI领航计划 · 管理层专场 */}
        <section id="management" className="mb-14">
          <div className="rounded-2xl border dark:border-indigo-500/25 border-indigo-200 overflow-hidden dark:bg-slate-800/40 bg-white shadow-sm">
            <div className="px-6 pt-8 pb-6 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-transparent bg-gradient-to-r from-indigo-50 to-transparent border-b dark:border-white/8 border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
                <span className="text-sm font-semibold dark:text-indigo-300 text-indigo-700 uppercase tracking-wide">第一期 · 核心产品</span>
              </div>
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                AI领航计划（管理层专场）
              </h2>
              <p className="text-base dark:text-gray-300 text-gray-600 leading-relaxed max-w-2xl">
                这是一场思想升级营，不是技术实操营。帮助企业老板与管理层理解 AI 大时代的结构性变化，看清企业在未来 3 年的转型机会，建立清晰的 AI 升级路径。
              </p>
            </div>

            {/* 你将获得什么 */}
            <div className="p-6 border-b dark:border-white/8 border-gray-100">
              <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 dark:text-indigo-300 text-indigo-600" />
                你将获得什么
              </h3>
              <ul className="space-y-3">
                {gains.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-transparent">
                    <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600 mt-0.5 shrink-0" />
                    <span className="text-sm dark:text-slate-100 text-gray-700 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 本期形式 */}
            <div className="p-6 border-b dark:border-white/8 border-gray-100">
              <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 dark:text-blue-300 text-blue-600" />
                本期不做技术教学，而做
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formats.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-4 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-gray-100">
                    <div className="p-2 rounded-lg dark:bg-indigo-500/20 bg-indigo-50 shrink-0">
                      <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold dark:text-white text-gray-900 mb-0.5">{title}</div>
                      <div className="text-xs dark:text-slate-300 text-gray-500 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 适合对象 + 核心问题 */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 dark:text-amber-300 text-amber-600" />
                  适合对象
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {targetAudience.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-gray-100">
                      <Icon className="w-4 h-4 dark:text-amber-300 text-amber-600 shrink-0" />
                      <span className="text-sm dark:text-slate-100 text-gray-700 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 dark:text-indigo-300 text-indigo-600" />
                  我们将一起探讨
                </h3>
                <ul className="space-y-2">
                  {coreQuestions.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm dark:text-slate-200 text-gray-700">
                      <ChevronRight className="w-3.5 h-3.5 dark:text-indigo-300 text-indigo-500 shrink-0 mt-0.5" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 模块 2：5天日程 */}
        <section id="schedule" className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">5天混合制日程</h2>
            <span className="text-sm dark:text-gray-400 text-gray-500">2026.03.28 开营</span>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">前3天线上认知升级，后2天北京中国尊现场工作坊与共创交流。</p>
          <div className="space-y-3">
            {managementSchedule.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 dark:bg-slate-800/60 bg-white rounded-xl border dark:border-slate-700/50 border-gray-100 shadow-sm">
                <div className="flex flex-col items-center gap-1.5 shrink-0 w-16">
                  <span className="text-base font-bold dark:text-white text-gray-900">{item.day}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.modeColor}`}>{item.mode}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm dark:text-slate-300 text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/25 border-amber-200">
            <p className="text-sm dark:text-amber-300 text-amber-700 font-semibold text-center">
              这是思想升级营，不是技术实操营。
            </p>
          </div>
        </section>

        {/* 模块 3：活动入口 */}
        <section id="qizhi" className="mb-14">
          <div className="rounded-2xl border dark:border-amber-500/25 border-amber-200 overflow-hidden dark:bg-slate-800/40 bg-white shadow-sm">
            <div className="px-6 pt-6 pb-5 dark:bg-gradient-to-r dark:from-amber-500/10 dark:to-transparent bg-gradient-to-r from-amber-50 to-transparent border-b dark:border-white/8 border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 dark:text-amber-400 text-amber-600" />
                <span className="text-sm font-semibold dark:text-amber-300 text-amber-700 uppercase tracking-wide">活动入口</span>
              </div>
              <h2 className="text-xl font-bold dark:text-white text-gray-900">AI领航计划 · 企业管理层专场（北京站）</h2>
            </div>
            <div className="p-6">
              <p className="text-base dark:text-gray-300 text-gray-600 mb-5 leading-relaxed">
                在 AI 大时代背景下，帮助企业决策者看清未来方向，设计公司转型升级路径。本期为北京首发站，限20席，申请制。
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: '时间', value: '2026年3月28日' },
                  { label: '地点', value: '北京 · 中信大厦中国尊' },
                  { label: '规模', value: '20人' },
                  { label: '形式', value: '线上3天 + 线下2天' },
                  { label: '类型', value: '申请制' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/40 border-gray-100">
                    <div className="text-xs dark:text-slate-400 text-gray-400 mb-1">{label}</div>
                    <div className="text-sm font-semibold dark:text-white text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
              <a
                href="/events/qizhi-bootcamp-2026"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-all"
              >
                查看活动详情
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 模块 4：企业咨询支持 */}
        <section id="enterprise" className="mb-14">
          <div className="rounded-2xl border dark:border-blue-500/25 border-blue-200 p-6 dark:bg-slate-800/40 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl dark:bg-blue-500/15 bg-blue-50 shrink-0">
                <Building2 className="w-5 h-5 dark:text-blue-400 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                  企业定制咨询与转型支持
                </h2>
                <p className="text-sm dark:text-slate-300 text-gray-500 mb-5">为企业提供从战略评估到落地陪跑的全程支持，帮助企业找到最适合自己的 AI 升级路径。</p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {['战略评估', '路径设计', '方案规划', '落地支持', '效果验证', '持续陪跑'].map((step, idx, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg dark:bg-blue-500/15 bg-blue-50 dark:text-blue-300 text-blue-700 text-sm font-medium border dark:border-blue-500/20 border-blue-100">
                        {step}
                      </span>
                      {idx < arr.length - 1 && (
                        <ChevronRight className="w-4 h-4 dark:text-gray-500 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
                <a
                  href="/about#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl dark:bg-blue-500/15 bg-blue-50 dark:text-blue-300 text-blue-700 font-semibold text-sm border dark:border-blue-500/25 border-blue-200 hover:dark:bg-blue-500/25 hover:bg-blue-100 transition-all"
                >
                  预约企业咨询
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 模块 5：参与后的长期价值 */}
        <section id="network" className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">参与之后，你将进入同频企业家圈层</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">完成训练营的企业家将获得以下长期资源。</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {networkBenefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="dark:bg-slate-800/60 bg-white rounded-xl border dark:border-slate-700/50 border-gray-100 p-5 flex gap-4 shadow-sm">
                <div className="p-2.5 rounded-xl dark:bg-indigo-500/20 bg-indigo-50 shrink-0 h-fit">
                  <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm dark:text-slate-300 text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 成果展示占位 */}
          <div className="rounded-2xl border-2 border-dashed dark:border-white/10 border-gray-200 p-8 text-center">
            <div className="flex justify-center gap-6 mb-4 opacity-30">
              <div className="w-16 h-20 rounded-lg dark:bg-white/10 bg-gray-200" />
              <div className="w-16 h-20 rounded-lg dark:bg-white/10 bg-gray-200" />
              <div className="w-16 h-20 rounded-lg dark:bg-white/10 bg-gray-200" />
            </div>
            <p className="text-sm dark:text-gray-500 text-gray-400">
              首期训练营结束后将公开展示成果
            </p>
            <p className="text-xs dark:text-gray-600 text-gray-300 mt-1">
              企业家感言 · 转型案例 · 现场照片 · 行动成果
            </p>
          </div>
        </section>

        {/* 模块 6：三路 CTA */}
        <section id="cta" className="mb-6">
          <div className="rounded-2xl border dark:border-white/8 border-gray-200 p-8 text-center dark:bg-slate-800/40 bg-white shadow-sm">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              选择最适合你的参与方式
            </h2>
            <p className="text-sm dark:text-gray-400 text-gray-500 mb-8">
              无论您是企业老板、管理层，还是希望深度了解 AI 转型路径，都有对应的入口。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/about#contact"
                className="flex flex-col items-center gap-2 p-5 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/50 border-gray-200 hover:dark:bg-slate-600/60 hover:bg-gray-100 transition-all group"
              >
                <Building2 className="w-6 h-6 dark:text-blue-300 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold dark:text-white text-gray-900">预约企业咨询</span>
                <span className="text-xs dark:text-slate-400 text-gray-400">适合企业决策者与管理层</span>
              </a>
              <a
                href="/events/qizhi-bootcamp-2026"
                className="flex flex-col items-center gap-2 p-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all group shadow-lg shadow-indigo-500/20"
              >
                <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold">申请管理层专场席位</span>
                <span className="text-xs text-indigo-200">限20席 · 申请制 · 3月28日开营</span>
              </a>
              <a
                href="/about#join"
                className="flex flex-col items-center gap-2 p-5 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/50 border-gray-200 hover:dark:bg-slate-600/60 hover:bg-gray-100 transition-all group"
              >
                <Network className="w-6 h-6 dark:text-indigo-300 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold dark:text-white text-gray-900">加入企业家圈层</span>
                <span className="text-xs dark:text-slate-400 text-gray-400">参与后自动加入，共享资源</span>
              </a>
            </div>
          </div>
        </section>

        {/* 第二期预告 */}
        <section className="mb-6">
          <div className="rounded-xl border dark:border-white/8 border-gray-200 p-5 dark:bg-slate-900/40 bg-gray-50 text-center">
            <p className="text-sm dark:text-gray-400 text-gray-500">
              <span className="dark:text-gray-300 text-gray-600 font-medium">第二期预告：</span>
              企业实施认证专场（面向技术负责人）将在首期结束后开放报名。
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
