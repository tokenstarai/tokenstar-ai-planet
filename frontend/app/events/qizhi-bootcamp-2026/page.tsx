'use client'

import {
  Calendar, MapPin, Users, Clock, ArrowRight,
  Lightbulb, TrendingUp, Target, Compass,
  ChevronRight, Building2, Network, Zap, Star,
  Globe, BarChart3, RefreshCw, MessageSquare,
  CheckCircle, AlertCircle, Briefcase
} from 'lucide-react'

const schedule = [
  {
    day: 'Day 1',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'AI 时代企业格局变化',
    points: ['从产业视角理解 AI 浪潮的结构性变化', '未来 3 年哪些行业将被重塑', '企业的机会窗口在哪里'],
  },
  {
    day: 'Day 2',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'Agent 智能体与企业组织升级',
    points: ['智能体如何改变企业的组织结构与工作方式', 'AI 不只是工具，而是一次深层的管理变革', '哪些岗位会升级，哪些流程会重构'],
  },
  {
    day: 'Day 3',
    mode: '线上',
    modeColor: 'dark:bg-blue-500/20 bg-blue-50 dark:text-blue-300 text-blue-700',
    title: 'OpenCLAW 在企业中的真实应用案例',
    points: ['真实企业 AI 转型案例拆解', '不同行业的落地方式对比', '从"工具使用"升级为"系统重构"的路径'],
  },
  {
    day: 'Day 4',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '企业转型路径工作坊',
    points: ['结合自身企业现状设计专属 AI 转型路径', '在引导师带领下明确优先级与行动节奏', '小组交流，互相碰撞想法'],
  },
  {
    day: 'Day 5',
    mode: '线下 · 中国尊',
    modeColor: 'dark:bg-amber-500/20 bg-amber-50 dark:text-amber-300 text-amber-700',
    title: '企业升级方案共创与交流',
    points: ['与同频企业家共同打磨升级方案', '带走一份可落地的企业 AI 行动清单', '建立长期同频企业家圈层'],
  },
]

const whyBoss = [
  {
    icon: AlertCircle,
    title: 'AI 决策不能外包',
    desc: '企业 AI 转型是战略决策，不是技术问题。老板不亲自理解，就无法做出正确判断，也无法带领团队前进。',
  },
  {
    icon: TrendingUp,
    title: '企业升级是战略问题',
    desc: '未来 3 年，AI 将重塑每个行业的竞争格局。谁先看清、谁先行动，谁就占据先机。这是老板必须亲自思考的问题。',
  },
  {
    icon: Network,
    title: '智能体不是工具，而是组织重构',
    desc: '智能体的引入会改变工作流程、岗位职责乃至组织结构。这种变革需要管理层主导，而不是交给技术部门自行探索。',
  },
]

const takeaways = [
  { icon: Compass, text: '企业 AI 转型路径草案' },
  { icon: RefreshCw, text: '组织升级思路' },
  { icon: Target, text: '可落地行动清单' },
  { icon: Users, text: '同频企业家圈层' },
]

const targetAudience = [
  '企业老板',
  '总经理',
  '事业部负责人',
  '有管理经验的创业者',
]

const faq = [
  {
    q: '我不懂技术，能参加吗？',
    a: '完全可以。本期训练营专为企业管理层设计，全程不涉及技术细节，不需要任何技术背景。我们关注的是战略视角、商业判断和转型路径，而不是系统架构或代码实现。',
  },
  {
    q: '线下2天必须到场吗？',
    a: '是的，Day 4 和 Day 5 的线下工作坊是本期训练营的核心环节。现场共创和交流无法远程替代，这也是席位限制在20人的原因。',
  },
  {
    q: '参加之后能获得什么？',
    a: '你将带走：企业 AI 转型路径草案、组织升级思路、可落地行动清单，以及进入 TokenStar 同频企业家圈层，获得企业项目优先参与资格。',
  },
  {
    q: '和技术培训有什么区别？',
    a: '本期是思想升级营，不是技术实操营。我们不讲系统架构、不讲部署细节、不讲工程能力。我们讲的是：AI 时代的产业机会、企业如何转型、管理层如何决策。',
  },
]

export default function QizhiBootcampPage() {
  return (
    <main className="min-h-screen dark:bg-[#0a0a0f] bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Hero */}
        <section className="text-center mb-14">
          <div className="flex justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold dark:bg-indigo-500/15 bg-indigo-50 dark:text-indigo-300 text-indigo-700 dark:border dark:border-indigo-500/25 border border-indigo-200">
              <Zap className="w-3 h-3" />
              启智训练营
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold dark:bg-amber-500/15 bg-amber-50 dark:text-amber-300 text-amber-700 dark:border dark:border-amber-500/25 border border-amber-200">
              <Star className="w-3 h-3" />
              北京首发站
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4 leading-tight">
            启智训练营 · 企业管理层专场
            <br />
            <span className="dark:text-indigo-300 text-indigo-600">（北京站）</span>
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            在 AI 大时代背景下，帮助企业决策者看清未来方向，设计公司转型升级路径。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            {[
              { icon: Calendar, label: '开营时间', value: '2026年3月28日' },
              { icon: MapPin, label: '线下地点', value: '北京 · 中国尊' },
              { icon: Clock, label: '形式', value: '线上3天 + 线下2天' },
              { icon: Users, label: '规模', value: '限20席 · 申请制' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-3 rounded-xl dark:bg-slate-700/50 bg-white border dark:border-slate-600/40 border-gray-200 shadow-sm">
                <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600 mx-auto mb-1.5" />
                <div className="text-xs dark:text-slate-400 text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-semibold dark:text-white text-gray-900 leading-tight">{value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/about#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
            >
              立即申请席位
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/training"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-slate-700/60 bg-white border dark:border-slate-500/40 border-gray-200 dark:text-slate-100 text-gray-700 font-semibold text-base hover:dark:bg-slate-600/70 hover:bg-gray-50 transition-all"
            >
              了解认证培训体系
            </a>
          </div>
        </section>

        {/* 为什么老板必须亲自参加 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">为什么老板必须亲自参加？</h2>
          </div>
          <div className="space-y-4">
            {whyBoss.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 dark:bg-slate-800/60 bg-white rounded-xl border dark:border-slate-700/50 border-gray-100 shadow-sm">
                <div className="p-2.5 rounded-xl dark:bg-indigo-500/20 bg-indigo-50 shrink-0 h-fit">
                  <Icon className="w-5 h-5 dark:text-indigo-300 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-1.5">{title}</h3>
                  <p className="text-sm dark:text-slate-300 text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 你将带走什么 */}
        <section className="mb-14">
          <div className="rounded-2xl border dark:border-indigo-500/25 border-indigo-200 overflow-hidden dark:bg-slate-800/40 bg-white shadow-sm">
            <div className="px-6 pt-6 pb-5 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-transparent bg-gradient-to-r from-indigo-50 to-transparent border-b dark:border-white/8 border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
                <h2 className="text-xl font-bold dark:text-white text-gray-900">你将带走什么？</h2>
              </div>
              <p className="text-sm dark:text-gray-400 text-gray-500">5天结束时，你将带走以下实质性成果。</p>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {takeaways.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 p-4 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-gray-100">
                  <div className="p-2 rounded-lg dark:bg-indigo-500/20 bg-indigo-50 shrink-0">
                    <Icon className="w-4 h-4 dark:text-indigo-300 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold dark:text-slate-100 text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5天日程 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">5天混合制日程</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">前3天线上认知升级，后2天北京中国尊现场工作坊与共创交流。</p>
          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div key={idx} className="p-4 dark:bg-slate-800/60 bg-white rounded-xl border dark:border-slate-700/50 border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-base font-bold dark:text-white text-gray-900">{item.day}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.modeColor}`}>{item.mode}</span>
                  <h3 className="text-base font-semibold dark:text-white text-gray-900">{item.title}</h3>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm dark:text-slate-300 text-gray-500">
                      <ChevronRight className="w-3.5 h-3.5 dark:text-indigo-300 text-indigo-500 shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/25 border-amber-200">
            <p className="text-sm dark:text-amber-300 text-amber-700 font-semibold text-center">
              这是思想升级营，不是技术实操营。全程不涉及技术细节，不需要任何技术背景。
            </p>
          </div>
        </section>

        {/* 适合对象 */}
        <section className="mb-14">
          <div className="rounded-2xl border dark:border-amber-500/25 border-amber-200 p-6 dark:bg-slate-800/40 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 dark:text-amber-400 text-amber-600" />
              <h2 className="text-xl font-bold dark:text-white text-gray-900">适合对象</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {targetAudience.map((item) => (
                <div key={item} className="flex items-center justify-center gap-2 p-3 rounded-xl dark:bg-slate-700/50 bg-gray-50 dark:border dark:border-slate-600/40 border border-gray-100 text-center">
                  <span className="text-sm font-semibold dark:text-slate-100 text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl dark:bg-white/5 bg-gray-50 border dark:border-white/8 border-gray-100">
              <h3 className="text-sm font-semibold dark:text-gray-200 text-gray-700 mb-2">报名说明</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="dark:text-gray-400 text-gray-500">报名方式：</span>
                  <span className="dark:text-gray-200 text-gray-700">申请制，审核通过后确认席位</span>
                </div>
                <div>
                  <span className="dark:text-gray-400 text-gray-500">席位限制：</span>
                  <span className="dark:text-gray-200 text-gray-700">全期限20席，先到先得</span>
                </div>
                <div>
                  <span className="dark:text-gray-400 text-gray-500">技术要求：</span>
                  <span className="dark:text-gray-200 text-gray-700">无需任何技术背景</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">常见问题</h2>
          </div>
          <div className="space-y-3">
            {faq.map(({ q, a }, idx) => (
              <div key={idx} className="p-5 dark:bg-slate-800/60 bg-white rounded-xl border dark:border-slate-700/50 border-gray-100 shadow-sm">
                <h3 className="text-base font-semibold dark:text-white text-gray-900 mb-2 flex items-start gap-2">
                  <span className="dark:text-indigo-300 text-indigo-600 shrink-0">{idx + 1}</span>
                  {q}
                </h3>
                <p className="text-sm dark:text-slate-300 text-gray-500 leading-relaxed pl-5">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-6">
          <div className="rounded-2xl bg-gradient-to-br dark:from-indigo-500/15 dark:to-slate-800/60 from-indigo-50 to-white border dark:border-indigo-500/25 border-indigo-200 p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              席位有限，申请制入场
            </h2>
            <p className="text-sm dark:text-gray-300 text-gray-600 mb-6">
              全期限20席，北京中国尊现场，3月28日开营。
            </p>
            <a
              href="/about#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-500/20"
            >
              立即申请席位
              <ArrowRight className="w-4 h-4" />
            </a>
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

        {/* 返回 */}
        <div className="text-center">
          <a
            href="/training"
            className="inline-flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500 hover:dark:text-gray-200 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            返回认证培训页
          </a>
        </div>

      </div>
    </main>
  )
}
