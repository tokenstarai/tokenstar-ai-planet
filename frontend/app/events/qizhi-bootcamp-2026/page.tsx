'use client'

import {
  MapPin, Calendar, Users, Clock, Award, CheckCircle,
  ArrowRight, Shield, ChevronRight, Zap, MessageCircle,
  Building2, Network, BookOpen, Star
} from 'lucide-react'

// ─── 5天日程 ──────────────────────────────────────────────────────────────────
const schedule = [
  {
    day: 'Day 1',
    mode: '线上',
    online: true,
    title: 'OpenCLAW 架构与内网部署逻辑',
    topics: ['OpenCLAW 核心架构解析', '企业内网部署前置条件', '网络隔离与安全边界设计'],
  },
  {
    day: 'Day 2',
    mode: '线上',
    online: true,
    title: '权限模型与审计链路设计',
    topics: ['企业级权限分层模型', '操作审计链路构建', '等保 2.0 合规对齐'],
  },
  {
    day: 'Day 3',
    mode: '线上',
    online: true,
    title: '企业系统集成设计与联调',
    topics: ['OA / CRM / ERP 接口对接', '知识库集成方案', '接口标准化与联调测试'],
  },
  {
    day: 'Day 4',
    mode: '线下 · 中国尊',
    online: false,
    title: '实战部署与排错',
    topics: ['真实网络环境部署实操', '常见故障排查演练', '系统稳定性验证'],
  },
  {
    day: 'Day 5',
    mode: '线下 · 中国尊',
    online: false,
    title: '多 Agent 流程优化 + 认证答辩',
    topics: ['多 Agent 协作流程调优', '交付物完整性检查', '评审委员会现场答辩'],
  },
]

// ─── 核心卖点 ──────────────────────────────────────────────────────────────────
const highlights = [
  {
    icon: Award,
    title: '交付导向，不是学习导向',
    desc: '5天结束时，你需要交付一个可运行的企业内网 Agent 系统，而不只是完成课程。',
  },
  {
    icon: Shield,
    title: '认证编号，可查可验',
    desc: '通过答辩者获得北京首发期实施认证编号（0001–0020），进入官方实施者名录。',
  },
  {
    icon: Building2,
    title: '中国尊现场，顶级环境',
    desc: '后2天在北京中信大厦中国尊现场进行，与行业顶尖实践者面对面交流。',
  },
  {
    icon: Network,
    title: '进入实施者生态网络',
    desc: '认证后自动加入 TokenStar 实施者网络，获得企业项目优先参与资格。',
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: '我需要具备什么技术背景才能参加？',
    a: '建议具备基础的 Linux 操作能力和企业网络基础知识。有 AI 系统部署经验者优先，但非必须。我们会在报名审核时评估匹配度。',
  },
  {
    q: '线下2天必须到场吗？',
    a: '是的，Day 4 和 Day 5 的线下环节是认证的必要条件。现场答辩必须本人到场，无法远程参与。',
  },
  {
    q: '认证之后能获得什么？',
    a: '通过答辩后，你将获得：北京首发期实施认证编号（0001–0020）、TokenStar 官方实施者名录收录、企业项目优先参与资格，以及后续治理模块内测资格。',
  },
]

export default function QizhiBootcampPage() {
  return (
    <main className="min-h-screen dark:bg-[#0a0a0f] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* ── Hero ── */}
        <section className="text-center mb-16">
          {/* 活动标签 */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-amber-500/15 bg-amber-50 dark:border dark:border-amber-500/30 border border-amber-200">
              <Zap className="w-3.5 h-3.5 dark:text-amber-400 text-amber-600" />
              <span className="text-sm font-semibold dark:text-amber-300 text-amber-700">启智训练营</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-red-500/15 bg-red-50 dark:border dark:border-red-500/30 border border-red-200">
              <Star className="w-3.5 h-3.5 dark:text-red-400 text-red-600" />
              <span className="text-sm font-semibold dark:text-red-300 text-red-700">北京首发站</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4 leading-tight">
            启智训练营 · 北京站
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            OpenCLAW + Antigravity 企业实施认证营（5天混合制）
            <br />
            <span className="dark:text-amber-300 text-amber-700 font-semibold">交付一个可运行的企业内网 Agent 系统，通过答辩获得实施认证编号。</span>
          </p>

          {/* 关键信息 4格 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
            {[
              { icon: Calendar, label: '开营时间', value: '2026年3月28日' },
              { icon: MapPin, label: '线下地点', value: '北京 · 中国尊' },
              { icon: Clock, label: '形式', value: '线上3天 + 线下2天' },
              { icon: Users, label: '规模', value: '限20席 · 申请制' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-3 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 shadow-sm text-center">
                <Icon className="w-4 h-4 dark:text-indigo-400 text-indigo-600 mx-auto mb-1.5" />
                <div className="text-xs dark:text-gray-500 text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-semibold dark:text-white text-gray-900">{value}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/about#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
            >
              申请席位
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/training"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-white/8 bg-white border dark:border-white/15 border-gray-200 dark:text-gray-200 text-gray-700 font-semibold text-base hover:dark:bg-white/12 hover:bg-gray-50 transition-all"
            >
              了解认证体系
            </a>
          </div>
        </section>

        {/* ── 核心卖点 ── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6 text-center">为什么选择这个训练营</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl border dark:border-white/8 border-gray-100 p-5 flex gap-4">
                <div className="p-2.5 rounded-xl dark:bg-indigo-500/15 bg-indigo-50 shrink-0 h-fit">
                  <Icon className="w-4 h-4 dark:text-indigo-400 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5天日程 ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">5天混合制日程</h2>
          </div>
          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className={`glass rounded-xl border p-5 ${
                  item.online
                    ? 'dark:border-blue-500/20 border-blue-100'
                    : 'dark:border-amber-500/20 border-amber-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1.5 shrink-0 w-16">
                    <span className="text-base font-bold dark:text-white text-gray-900">{item.day}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.online
                        ? 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700'
                        : 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700'
                    }`}>
                      {item.online ? '线上' : '线下'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <span key={topic} className="flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500">
                          <ChevronRight className="w-3 h-3 dark:text-indigo-400 text-indigo-500" />
                          {topic}
                        </span>
                      ))}
                    </div>
                    {!item.online && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs dark:text-amber-400 text-amber-600 font-medium">
                        <MapPin className="w-3 h-3" />
                        北京 · 中信大厦中国尊
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 认证机制 ── */}
        <section className="mb-14">
          <div className="glass rounded-2xl border dark:border-indigo-500/25 border-indigo-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">认证机制</h2>
            </div>
            <p className="text-sm dark:text-gray-400 text-gray-500 mb-5">
              认证不是学习证明，而是交付能力证明。以下四项缺一不可。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { icon: CheckCircle, text: '完成所有交付物（内网部署环境 + 集成场景 + 流程设计）' },
                { icon: MapPin, text: 'Day 4 & Day 5 线下必须到场（北京中国尊）' },
                { icon: BookOpen, text: '现场答辩通过评审委员会评审' },
                { icon: Star, text: '获得北京首发期认证编号（0001–0020）' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 p-3 rounded-xl dark:bg-white/4 bg-indigo-50">
                  <Icon className="w-4 h-4 dark:text-indigo-400 text-indigo-600 mt-0.5 shrink-0" />
                  <span className="text-sm dark:text-gray-300 text-gray-700">{text}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/20 border-amber-100 text-center">
              <p className="text-sm dark:text-amber-300 text-amber-700 font-semibold">
                认证编号：北京首发期 0001–0020，全球可查可验
              </p>
            </div>
          </div>
        </section>

        {/* ── 报名说明 ── */}
        <section className="mb-14">
          <div className="glass rounded-2xl border dark:border-white/8 border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 dark:text-blue-400 text-blue-600" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">报名说明</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { label: '报名方式', value: '申请制，审核通过后确认席位' },
                { label: '席位限制', value: '全期限20席，先到先得' },
                { label: '适合对象', value: '企业技术负责人 / IT 架构师 / AI 工程师' },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-100">
                  <div className="text-xs dark:text-gray-500 text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium dark:text-white text-gray-900">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/about#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
              >
                立即申请席位
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/training"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl dark:bg-white/8 bg-white border dark:border-white/15 border-gray-200 dark:text-gray-200 text-gray-700 font-semibold text-base hover:dark:bg-white/12 hover:bg-gray-50 transition-all"
              >
                返回认证培训页
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">常见问题</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }, idx) => (
              <div key={idx} className="glass rounded-xl border dark:border-white/8 border-gray-100 p-5">
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-2 flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  {q}
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed pl-7">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
