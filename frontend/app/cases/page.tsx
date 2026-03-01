import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, ChevronRight, Building2, TrendingUp,
  Clock, BarChart3, CheckCircle2, Users, Factory,
  MessageSquare, Database, Layers,
} from 'lucide-react'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: '成功案例 - TokenStar · OpenClaw',
  description: '真实企业场景验证 OpenClaw 部署价值，覆盖小型、中型、大型企业全规模，保守量化 ROI 数据。',
}

/*
 * ─── 配色规范（Design Token 语义化类）────────────────────────────────────────
 *
 * 所有卡片使用 token-card / token-card-nested（在 globals.css 中定义）
 * 所有 CTA 使用 cta-block / cta-title / cta-body / btn-cta-primary / btn-cta-secondary
 * 禁止使用 bg-white/xx、bg-black/xx 透明叠加
 * 禁止使用硬编码 hex 颜色
 */

// ─── 企业规模配置（与 /scenarios 完全统一）────────────────────────────────────
const SCALE_CONFIG = {
  small: {
    label: '小型企业',
    range: '150 人以内',
    deploy: 'Cloud Pro / Box Pro S',
    dot: 'bg-sky-400',
    labelColor: 'dark:text-sky-300 text-sky-700',
    deployColor: 'dark:text-sky-300 text-sky-700',
    badgeBg: 'dark:bg-sky-500/15 bg-sky-50',
    badgeBorder: 'dark:border-sky-400/30 border-sky-200',
  },
  mid: {
    label: '中型企业',
    range: '150–500 人',
    deploy: 'Box Pro S / Box Pro M',
    dot: 'bg-violet-400',
    labelColor: 'dark:text-violet-300 text-violet-700',
    deployColor: 'dark:text-violet-300 text-violet-700',
    badgeBg: 'dark:bg-violet-500/15 bg-violet-50',
    badgeBorder: 'dark:border-violet-400/30 border-violet-200',
  },
  large: {
    label: '大型企业',
    range: '500 人以上',
    deploy: 'Box Pro M / 集群定制',
    dot: 'bg-amber-400',
    labelColor: 'dark:text-amber-300 text-amber-700',
    deployColor: 'dark:text-amber-300 text-amber-700',
    badgeBg: 'dark:bg-amber-500/15 bg-amber-50',
    badgeBorder: 'dark:border-amber-400/30 border-amber-200',
  },
}

// ─── 案例数据（保守量化，真实可信）──────────────────────────────────────────
const CASES = [
  // ── 小型企业（150 人以内）──────────────────────────────────────────────────
  {
    scale: 'small' as const,
    industry: '互联网 SaaS',
    department: '客服 + 销售',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500',
    title: '某 SaaS 初创企业',
    size: '约 80 人',
    background: '快速增长期客服压力骤增，5 名客服处理每日 200+ 工单，重复问题占比约 65%，响应时效难以保证。',
    problem: '工单积压严重，首响时间平均 45 分钟；销售跟进记录依赖人工 Excel，信息严重滞后。',
    solution: 'Cloud Pro 部署，接入工单系统与 CRM，配置客服智能体 + 销售管理智能体。',
    onlineTime: '3 周',
    metrics: [
      { label: '工单自动处理率', before: '0%', after: '约 42%', trend: 'up' },
      { label: '首响时间', before: '45 分钟', after: '约 8 分钟', trend: 'up' },
      { label: '销售报告生成时间', before: '每周 4 小时', after: '约 30 分钟', trend: 'up' },
      { label: '客服人均处理量', before: '40 单/天', after: '约 65 单/天', trend: 'up' },
    ],
    roi: '约 8–12 个月回本',
    deploy: 'Cloud Pro',
    recommend: 'small',
  },
  {
    scale: 'small' as const,
    industry: '教育培训',
    department: 'HR + 行政',
    icon: Users,
    gradient: 'from-pink-500 to-rose-500',
    title: '某在线教育机构',
    size: '约 120 人',
    background: '快速扩张期招聘需求旺盛，2 名 HR 每月处理 300+ 份简历，绩效汇总耗时 3 天，员工关怀节点经常遗漏。',
    problem: '简历初筛质量参差不齐，优质候选人流失；绩效报告月底才出，管理层决策严重滞后。',
    solution: 'Box Pro S 私有部署，接入 HRIS 与招聘系统，配置 HR 管理智能体。',
    onlineTime: '4 周',
    metrics: [
      { label: '简历初筛时间', before: '每份约 8 分钟', after: '约 2 分钟', trend: 'up' },
      { label: '绩效报告生成', before: '3 天', after: '约 4 小时', trend: 'up' },
      { label: 'HR 月均节省工时', before: '—', after: '约 35 小时', trend: 'up' },
      { label: '员工关怀覆盖率', before: '约 60%', after: '约 95%', trend: 'up' },
    ],
    roi: '约 10–14 个月回本',
    deploy: 'Box Pro S',
    recommend: 'small',
  },

  // ── 中型企业（150–500 人）──────────────────────────────────────────────────
  {
    scale: 'mid' as const,
    industry: '制造业',
    department: '供应链 + 财务',
    icon: Factory,
    gradient: 'from-orange-500 to-amber-500',
    title: '某精密零部件制造商',
    size: '约 280 人',
    background: '多品类 SKU 超 2000 种，库存分散 3 个仓库，需求预测依赖经验，积压与缺货并存；财务报表月底手工合并，耗时 4 天。',
    problem: '库存周转率偏低，年度积压损失约 ¥120 万；财务数据滞后，预算超支发现平均延迟 3 周。',
    solution: 'Box Pro M 私有部署，接入 ERP + WMS + 财务系统，配置供应链智能体 + 财务管理智能体。',
    onlineTime: '6 周',
    metrics: [
      { label: '库存周转率', before: '基准值', after: '提升约 18%', trend: 'up' },
      { label: '缺货率', before: '约 12%', after: '约 7%', trend: 'up' },
      { label: '财务报表生成', before: '4 天', after: '约 6 小时', trend: 'up' },
      { label: '预算超支发现延迟', before: '约 3 周', after: '约 2 天', trend: 'up' },
    ],
    roi: '约 14–18 个月回本',
    deploy: 'Box Pro M',
    recommend: 'mid',
  },
  {
    scale: 'mid' as const,
    industry: '零售连锁',
    department: '销售 + 数据分析',
    icon: BarChart3,
    gradient: 'from-emerald-500 to-green-600',
    title: '某区域连锁零售品牌',
    size: '约 350 人，30 家门店',
    background: '30 家门店数据分散，总部无法实时掌握各店销售与库存；数据分析需求积压，等待数据团队响应平均 3 天。',
    problem: '门店间调货决策缺乏数据支撑，错误调货率约 25%；管理层月报依赖人工汇总，决策时效性差。',
    solution: 'Box Pro S + Box Pro M 混合部署，接入 POS + ERP + 数据仓库，配置数据分析智能体 + 销售管理智能体。',
    onlineTime: '8 周',
    metrics: [
      { label: '数据分析响应时间', before: '约 3 天', after: '约 2 小时', trend: 'up' },
      { label: '调货决策准确率', before: '约 75%', after: '约 88%', trend: 'up' },
      { label: '月报生成时间', before: '5 天', after: '约 4 小时', trend: 'up' },
      { label: '数据驱动决策覆盖', before: '约 30%', after: '约 70%', trend: 'up' },
    ],
    roi: '约 12–16 个月回本',
    deploy: 'Box Pro S / Box Pro M',
    recommend: 'mid',
  },

  // ── 大型企业（500 人以上）──────────────────────────────────────────────────
  {
    scale: 'large' as const,
    industry: '金融服务',
    department: '客服中心 + 合规',
    icon: Building2,
    gradient: 'from-violet-500 to-purple-600',
    title: '某区域性商业银行',
    size: '约 1200 人',
    background: '客服中心 150 名坐席，日均处理工单 3000+，重复性咨询占比约 70%；合规文档审查依赖人工，效率低且风险高。',
    problem: '高峰期客户等待时间超 15 分钟，CSAT 评分持续下滑；合规审查覆盖率不足 40%，存在监管风险。',
    solution: 'Box Pro M 集群部署（私有化，数据不出域），接入工单系统 + 知识库 + 合规文档库，配置客服智能体 + 数据分析智能体。',
    onlineTime: '12 周',
    metrics: [
      { label: '工单自动处理率', before: '0%', after: '约 55%', trend: 'up' },
      { label: '客户等待时间', before: '约 15 分钟', after: '约 3 分钟', trend: 'up' },
      { label: '合规审查覆盖率', before: '约 40%', after: '约 95%', trend: 'up' },
      { label: '年度人力成本节省', before: '—', after: '约 ¥120 万', trend: 'up' },
    ],
    roi: '约 18–24 个月回本',
    deploy: 'Box Pro M / 集群定制',
    recommend: 'large',
  },
  {
    scale: 'large' as const,
    industry: '医疗健康',
    department: 'HR + 运营',
    icon: Database,
    gradient: 'from-teal-500 to-cyan-600',
    title: '某三甲医院集团',
    size: '约 3000 人，5 家分院',
    background: '5 家分院 HR 数据孤立，集团层面无法统一人才视图；运营数据分散在 12 个系统，管理层决策信息严重不足。',
    problem: '跨院调配人才缺乏数据支撑，关键岗位空缺平均填补周期 45 天；集团月报手工汇总耗时 7 天。',
    solution: '集群定制部署，接入 HIS + HRIS + 财务系统，配置 HR 管理智能体 + 数据分析智能体，满足医疗数据合规要求。',
    onlineTime: '16 周',
    metrics: [
      { label: '关键岗位填补周期', before: '约 45 天', after: '约 28 天', trend: 'up' },
      { label: '集团月报生成', before: '7 天', after: '约 1 天', trend: 'up' },
      { label: '跨院数据统一率', before: '约 20%', after: '约 85%', trend: 'up' },
      { label: 'HR 人效提升', before: '基准值', after: '约 +30%', trend: 'up' },
    ],
    roi: '约 20–28 个月回本',
    deploy: '集群定制',
    recommend: 'large',
  },
]

// ─── 规模分组──────────────────────────────────────────────────────────────────
const SCALE_GROUPS = [
  { key: 'small' as const, cases: CASES.filter(c => c.scale === 'small') },
  { key: 'mid' as const, cases: CASES.filter(c => c.scale === 'mid') },
  { key: 'large' as const, cases: CASES.filter(c => c.scale === 'large') },
]

export default function CasesPage() {
  return (
    <div className="min-h-screen">

      {/* ── 顶部定位区 ──────────────────────────────────────────────────── */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
            dark:bg-blue-500/15 bg-blue-50
            dark:border dark:border-blue-400/30 border border-blue-200
            dark:text-blue-300 text-blue-700
            text-sm mb-4">
            <Layers className="w-3.5 h-3.5" />
            企业信任背书
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">
            成功案例与落地实践
          </h1>
          <p className="dark:text-gray-200 text-gray-700 text-base max-w-2xl mx-auto mb-2">
            真实企业场景验证 OpenClaw 部署价值。
          </p>
          <p className="dark:text-gray-400 text-gray-500 text-sm max-w-xl mx-auto mb-7">
            所有数据均为保守估算，基于实际部署反馈，不夸大效果。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                text-white font-semibold text-sm transition-all"
            >
              预约企业场景评估 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scenarios"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                dark:bg-white/15 bg-gray-100
                dark:hover:bg-white/25 hover:bg-gray-200
                dark:text-white text-gray-900
                font-semibold text-sm transition-all
                dark:border dark:border-white/20 border border-gray-200"
            >
              查看应用场景 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── 三规模分层案例展示 ──────────────────────────────────────────── */}
        {SCALE_GROUPS.map(group => {
          const cfg = SCALE_CONFIG[group.key]
          return (
            <section key={group.key} className="mb-16">
              {/* 规模标题 */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                <h2 className="text-xl font-bold dark:text-white text-gray-900">
                  {cfg.label}
                  <span className="text-sm font-normal dark:text-gray-400 text-gray-500 ml-2">
                    （{cfg.range}）
                  </span>
                </h2>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.deployColor}`}>
                  推荐：{cfg.deploy}
                </span>
              </div>

              {/* 案例卡片网格 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {group.cases.map((c, idx) => (
                  <CaseCard key={idx} c={c} cfg={cfg} />
                ))}
              </div>
            </section>
          )
        })}

        {/* ── 底部收口 CTA ────────────────────────────────────────────────── */}
        <section>
          <div className="cta-block p-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
              dark:bg-blue-500/15 bg-blue-50
              dark:border dark:border-blue-400/30 border border-blue-200
              dark:text-blue-300 text-blue-700
              text-xs font-medium mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              企业成功案例
            </div>

            <h3 className="cta-title text-2xl mb-3">
              您的企业也可以成为下一个成功案例
            </h3>
            <p className="cta-body text-sm max-w-xl mx-auto mb-7">
              从 PoC 验证到规模化部署，我们为企业提供全程技术与服务支持，48 小时内响应。
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/about#contact" className="btn-cta-primary shadow-lg shadow-blue-500/20">
                预约企业部署评估 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/deployment" className="btn-cta-secondary">
                查看部署方案 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="cta-body text-xs mt-5">
              专属顾问 1 对 1 评估 · 48 小时内响应 · 免费出具场景匹配报告
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── 案例卡片组件────────────────────────────────────────────────────────────
function CaseCard({ c, cfg }: { c: typeof CASES[0]; cfg: typeof SCALE_CONFIG['small'] }) {
  return (
    <div className="token-card overflow-hidden">
      {/* 卡片头部 */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${c.gradient} shrink-0`}>
            <c.icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs dark:text-gray-400 text-gray-500 font-medium">
                {c.industry}
              </span>
              <span className="text-xs dark:text-gray-600 text-gray-300">·</span>
              <span className="text-xs dark:text-gray-400 text-gray-500">
                {c.department}
              </span>
            </div>
            <h3 className="text-base font-bold dark:text-white text-gray-900">
              {c.title}
            </h3>
            <p className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">
              规模：{c.size}
            </p>
          </div>
        </div>

        {/* 企业背景 */}
        <div className="mb-4">
          <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-1.5">
            企业背景
          </div>
          <p className="text-xs dark:text-gray-200 text-gray-700 leading-relaxed">
            {c.background}
          </p>
        </div>

        {/* 面临问题 */}
        <div className="mb-4">
          <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-1.5">
            面临问题
          </div>
          <p className="text-xs dark:text-gray-200 text-gray-700 leading-relaxed">
            {c.problem}
          </p>
        </div>

        {/* 部署方案 */}
        <div className="mb-4">
          <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-1.5">
            部署方案
          </div>
          <p className="text-xs dark:text-gray-200 text-gray-700 leading-relaxed">
            {c.solution}
          </p>
        </div>
      </div>

      {/* 关键指标变化 */}
      <div className="px-6 pb-4">
        <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">
          关键指标变化（保守估算）
        </div>
        <div className="space-y-2">
          {c.metrics.map((m, i) => (
            <div key={i} className="token-card-nested p-3 flex items-center justify-between gap-4">
              <span className="text-xs dark:text-gray-300 text-gray-600 flex-1">
                {m.label}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs dark:text-gray-500 text-gray-400 line-through">
                  {m.before}
                </span>
                <span className="text-xs">→</span>
                <span className="text-xs font-semibold dark:text-emerald-300 text-emerald-700">
                  {m.after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部信息栏 */}
      <div className="px-6 pb-6">
        <div className="pt-4 border-t dark:border-white/10 border-gray-100">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* 上线时间 */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3 h-3 dark:text-gray-400 text-gray-500" />
                <span className="text-xs dark:text-gray-400 text-gray-500">上线时间</span>
              </div>
              <div className="text-xs font-semibold dark:text-white text-gray-900">
                {c.onlineTime}
              </div>
            </div>
            {/* ROI 回收 */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 dark:text-gray-400 text-gray-500" />
                <span className="text-xs dark:text-gray-400 text-gray-500">回收周期</span>
              </div>
              <div className="text-xs font-semibold dark:text-emerald-300 text-emerald-700">
                {c.roi}
              </div>
            </div>
            {/* 部署版本 */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Building2 className="w-3 h-3 dark:text-gray-400 text-gray-500" />
                <span className="text-xs dark:text-gray-400 text-gray-500">部署版本</span>
              </div>
              <div className={`text-xs font-semibold ${cfg.deployColor}`}>
                {c.deploy}
              </div>
            </div>
          </div>

          {/* 场景 CTA */}
          <div className="flex gap-2">
            <Link
              href="/about#contact"
              className="flex-1 text-center py-2 rounded-lg text-xs font-semibold
                bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                text-white transition-all"
            >
              预约同类场景部署
            </Link>
            <Link
              href="/scenarios"
              className="flex-1 text-center py-2 rounded-lg text-xs font-semibold
                dark:bg-white/15 bg-gray-100
                dark:hover:bg-white/25 hover:bg-gray-200
                dark:text-white text-gray-800
                transition-all
                dark:border dark:border-white/20 border border-gray-200"
            >
              查看场景详情
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
