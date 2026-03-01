'use client'

import {
  Award, Calendar, MapPin, Users, Clock, CheckCircle,
  ArrowRight, BookOpen, Shield, Layers, Zap, Network,
  ChevronRight, Star, Lock, Globe, Building2
} from 'lucide-react'

const schedule = [
  {
    day: 'Day 1',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'OpenCLAW 架构与内网部署逻辑',
    desc: '理解 OpenCLAW 核心架构设计，掌握企业内网环境部署的完整逻辑与前置条件。',
  },
  {
    day: 'Day 2',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: '权限模型与审计链路设计',
    desc: '设计企业级权限分层模型，构建完整的操作审计链路，满足等保 2.0 合规要求。',
  },
  {
    day: 'Day 3',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: '企业系统集成设计与联调',
    desc: '与 OA、CRM、ERP、知识库等企业系统对接，完成接口标准化与联调测试。',
  },
  {
    day: 'Day 4',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '实战部署与排错',
    desc: '在真实企业网络环境中完成系统部署，处理实际排错场景，确保系统稳定运行。',
  },
  {
    day: 'Day 5',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '多 Agent 流程优化 + 认证答辩',
    desc: '完成多 Agent 协作流程调优，向评审委员会进行现场答辩，获得实施认证编号。',
  },
]

const deliverables = [
  { icon: Shield, text: '企业内网部署环境（含安全与审计）' },
  { icon: Globe, text: '至少 1 个系统集成业务场景' },
  { icon: Network, text: '多 Agent 协作流程设计' },
  { icon: Award, text: '现场认证答辩通过' },
]

const curriculum = [
  'OpenCLAW 内网部署架构',
  'Antigravity 编排与多 Agent 协作',
  '企业权限模型设计',
  '审计链路构建',
  '系统集成实战',
  '故障排查与稳定性调优',
]

const networkBenefits = [
  { icon: Star, title: 'TokenStar 实施者名录', desc: '进入官方认证实施者名录，获得公开展示资格。' },
  { icon: Building2, title: '企业项目优先参与', desc: '优先获得 TokenStar 生态企业项目合作机会。' },
  { icon: Lock, title: '后续治理模块内测资格', desc: '优先参与 OpenCLAW 新功能内测与反馈共建。' },
  { icon: Layers, title: '生态资源共享', desc: '接入实施者社群，共享案例、工具与最佳实践。' },
]

export default function TrainingPage() {
  return (
    <main className="min-h-screen dark:bg-[#0a0a0f] bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* 模块 1：Hero */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-amber-500/15 bg-amber-50 dark:border dark:border-amber-500/30 border border-amber-200 mb-6">
            <MapPin className="w-3.5 h-3.5 dark:text-amber-400 text-amber-600" />
            <span className="text-sm font-semibold dark:text-amber-300 text-amber-700">北京首发 · 中国尊站</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-5 leading-tight">
            认证与培训
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            以企业级部署与安全为核心，提供 5 天混合制实施认证营与企业专场支持，
            让 OpenCLAW + Antigravity 在企业内网环境中可控运行、可审计、可集成。
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Clock, text: '5天混合制（线上3天 + 线下2天）' },
              { icon: MapPin, text: '北京 · 中信大厦中国尊' },
              { icon: Calendar, text: '2026年3月28日开营' },
              { icon: Users, text: '限20席 · 申请制' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 shadow-sm">
                <Icon className="w-4 h-4 dark:text-indigo-400 text-indigo-600 shrink-0" />
                <span className="text-sm font-medium dark:text-gray-200 text-gray-700">{text}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/events/qizhi-bootcamp-2026"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
            >
              申请实施认证营席位
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/about#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-slate-700/60 bg-white border dark:border-slate-500/40 border-gray-200 dark:text-slate-100 text-gray-700 font-semibold text-base hover:dark:bg-slate-600/70 hover:bg-gray-50 transition-all"
            >
              预约企业架构评估
            </a>
          </div>
        </section>

        {/* 模块 2：企业实施认证营 */}
        <section id="certification" className="mb-14">
          <div className="glass rounded-2xl border dark:border-indigo-500/25 border-indigo-200 overflow-hidden">
            <div className="px-6 pt-8 pb-6 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-transparent bg-gradient-to-r from-indigo-50 to-transparent border-b dark:border-white/8 border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
                <span className="text-sm font-semibold dark:text-indigo-300 text-indigo-700 uppercase tracking-wide">核心产品</span>
              </div>
              <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                企业实施认证营（5天混合制）
              </h2>
              <p className="text-base dark:text-gray-300 text-gray-600 leading-relaxed">
                交付一个可运行的企业内网 Agent 系统，并通过答辩获得实施认证编号。
              </p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 dark:text-emerald-400 text-emerald-600" />
                  你将完成的交付成果
                </h3>
                <ul className="space-y-3">
                  {deliverables.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-transparent">
                      <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600 mt-0.5 shrink-0" />
                      <span className="text-sm dark:text-slate-100 text-gray-700 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 dark:text-blue-400 text-blue-600" />
                  课程核心内容
                </h3>
                <ul className="space-y-2">
                  {curriculum.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm dark:text-slate-200 text-gray-700">
                      <ChevronRight className="w-3.5 h-3.5 dark:text-indigo-300 text-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="rounded-xl dark:bg-indigo-500/8 bg-indigo-50 border dark:border-indigo-500/20 border-indigo-100 p-5">
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 dark:text-indigo-400 text-indigo-600" />
                  认证机制
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {['完成交付物', '线下必须到场', '现场答辩评审', '认证编号 0001–0020'].map((item) => (
                    <div key={item} className="text-center p-3 rounded-lg dark:bg-slate-700/60 bg-white border dark:border-slate-500/40 border-gray-100">
                      <span className="text-sm dark:text-slate-100 text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm dark:text-amber-300 text-amber-700 font-semibold text-center">
                  认证不是学习证明，而是交付能力证明。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 模块 3：5天日程 */}
        <section id="schedule" className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">5天混合制日程</h2>
            <span className="text-sm dark:text-gray-400 text-gray-500">2026.03.28 开营</span>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">前3天线上授课，后2天北京中国尊现场实战与答辩。</p>
          <div className="space-y-3">
            {schedule.map((item, idx) => (
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
        </section>

        {/* 模块 4：启智训练营活动入口 */}
        <section id="qizhi" className="mb-14">
          <div className="glass rounded-2xl border dark:border-amber-500/25 border-amber-200 overflow-hidden">
            <div className="px-6 pt-6 pb-5 dark:bg-gradient-to-r dark:from-amber-500/10 dark:to-transparent bg-gradient-to-r from-amber-50 to-transparent border-b dark:border-white/8 border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 dark:text-amber-400 text-amber-600" />
                <span className="text-sm font-semibold dark:text-amber-300 text-amber-700 uppercase tracking-wide">活动入口</span>
              </div>
              <h2 className="text-xl font-bold dark:text-white text-gray-900">启智训练营 · 北京站</h2>
            </div>
            <div className="p-6">
              <p className="text-base dark:text-gray-300 text-gray-600 mb-5 leading-relaxed">
                启智训练营是围绕企业实施能力打造的混合制训练体系，本期为北京首发站。
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

        {/* 模块 5：管理层实施认知工作坊 */}
        <section id="workshop" className="mb-14">
          <div className="glass rounded-2xl border dark:border-white/8 border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl dark:bg-purple-500/15 bg-purple-50 shrink-0">
                <BookOpen className="w-5 h-5 dark:text-purple-400 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                  企业实施认知工作坊（1天）
                </h2>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-4">帮助管理层建立实施判断能力。</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['企业AI实施路线图', '风险与合规边界', '投入产出结构', '组织变革逻辑'].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/40 border-gray-100">
                      <CheckCircle className="w-3.5 h-3.5 dark:text-purple-300 text-purple-500 shrink-0" />
                      <span className="text-sm dark:text-slate-100 text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 模块 6：企业定制部署支持 */}
        <section id="enterprise" className="mb-14">
          <div className="glass rounded-2xl border dark:border-blue-500/25 border-blue-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl dark:bg-blue-500/15 bg-blue-50 shrink-0">
                <Building2 className="w-5 h-5 dark:text-blue-400 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                  企业定制部署支持
                </h2>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-5">为企业提供从评估到运维的全流程实施支持。</p>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {['评估', '架构', '部署', '集成', '安全验证', '运维支持'].map((step, idx, arr) => (
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
                  预约企业架构评估
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 模块 7：认证价值与实施者网络 */}
        <section id="network" className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">认证之后，你将进入实施者网络</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">完成认证的实施者将获得以下长期权益。</p>
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
          {/* 预留成果展示区 V1 占位 */}
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
              认证展示墙 · 学员案例 · 现场照片 · 成果视频
            </p>
          </div>
        </section>

        {/* 模块 8：三路 CTA 收口 */}
        <section id="cta" className="mb-6">
          <div className="glass rounded-2xl border dark:border-white/8 border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              为企业部署与落地选择合适路径
            </h2>
            <p className="text-sm dark:text-gray-400 text-gray-500 mb-8">
              无论您是企业决策者、技术负责人，还是希望成为认证实施者，都有对应的入口。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/about#contact"
                className="flex flex-col items-center gap-2 p-5 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/50 border-gray-200 hover:dark:bg-slate-600/60 hover:bg-gray-100 transition-all group"
              >
                <Building2 className="w-6 h-6 dark:text-blue-300 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold dark:text-white text-gray-900">预约企业架构评估</span>
                <span className="text-xs dark:text-slate-400 text-gray-400">适合企业决策者与技术负责人</span>
              </a>
              <a
                href="/events/qizhi-bootcamp-2026"
                className="flex flex-col items-center gap-2 p-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all group shadow-lg shadow-indigo-500/20"
              >
                <Award className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold">申请实施认证营席位</span>
                <span className="text-xs text-indigo-200">限20席 · 申请制 · 3月28日开营</span>
              </a>
              <a
                href="/about#join"
                className="flex flex-col items-center gap-2 p-5 rounded-xl dark:bg-slate-700/50 bg-gray-50 border dark:border-slate-600/50 border-gray-200 hover:dark:bg-slate-600/60 hover:bg-gray-100 transition-all group"
              >
                <Network className="w-6 h-6 dark:text-indigo-300 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span className="text-base font-semibold dark:text-white text-gray-900">加入实施者网络</span>
                <span className="text-xs dark:text-slate-400 text-gray-400">认证后自动加入，共享生态资源</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
