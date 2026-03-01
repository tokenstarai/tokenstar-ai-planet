import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, TrendingUp, BarChart3, Users,
  Building2, Factory, CheckCircle2, ChevronRight,
  Layers, Database, Cpu, MessageSquare,
} from 'lucide-react'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: '企业应用场景 - TokenStar · OpenClaw',
  description: '从销售到供应链，OpenClaw 为每个部门提供可落地的企业级智能体解决方案，覆盖小型、中型、大型企业全规模。',
}

/*
 * ─── 配色规范（WCAG AA，对比度 ≥ 4.5:1）────────────────────────────────────
 *
 * 深色主题背景层级：
 *   页面背景      ≈ #0f1117  (near-black)
 *   glass 卡片    ≈ #1a1d27  (dark:bg-white/5 over page bg)
 *   嵌套卡片      dark:bg-slate-800  (#1e2130, 实色，避免透明叠加失控)
 *   表格 header   dark:bg-white/4
 *   表格行悬停    dark:hover:bg-white/6
 *
 * 文字层级：
 *   主标题        dark:text-white        (#ffffff, 21:1)
 *   正文/副标题   dark:text-gray-200     (#e5e7eb, ~14:1)
 *   次要说明      dark:text-gray-400     (#9ca3af, ~4.6:1) ← WCAG AA 最低线
 *   标签/caption  dark:text-gray-400     (#9ca3af, ~4.6:1)
 *   禁用/装饰     dark:text-gray-500     (#6b7280, ~3.5:1) — 仅用于纯装饰元素
 *
 * 彩色文字（深色背景）：
 *   sky/blue      dark:text-sky-300      (#7dd3fc, ~8:1)
 *   violet        dark:text-violet-300   (#c4b5fd, ~7:1)
 *   amber         dark:text-amber-300    (#fcd34d, ~8:1)
 *   emerald       dark:text-emerald-400  (#34d399, ~5.5:1)
 *   rose          dark:text-rose-300     (#fda4af, ~7:1)
 *
 * 按钮：
 *   主按钮        bg-blue-600 hover:bg-blue-500 text-white  (solid, always readable)
 *   次要按钮      dark:bg-white/15 dark:hover:bg-white/25 dark:text-white
 *                 light:bg-gray-100 light:hover:bg-gray-200 light:text-gray-900
 *
 * 规模卡片（深色）：
 *   sky 卡片      dark:bg-slate-800 dark:border-sky-500/40
 *   violet 卡片   dark:bg-slate-800 dark:border-violet-500/40
 *   amber 卡片    dark:bg-slate-800 dark:border-amber-500/40
 *   (实色背景确保文字对比度可控)
 */

// ─── 企业规模配置（全页统一）────────────────────────────────────────────────
const SCALES = [
  {
    key: 'small',
    label: '小型企业',
    range: '150 人以内',
    deploy: 'Cloud Pro / Box Pro S',
    // 文字：深色用亮色，浅色用深色，均 ≥ 4.5:1
    deployColor: 'dark:text-sky-300 text-sky-700',
    labelColor:  'dark:text-sky-300 text-sky-700',
    // 卡片背景：深色用实色 slate-800，浅色用淡色
    cardBg:      'dark:bg-slate-800 bg-sky-50',
    cardBorder:  'dark:border-sky-500/40 border-sky-200',
    dot:         'bg-sky-400',
    // ROI 卡片（嵌套在场景卡片内）
    roiBg:       'dark:bg-slate-700 bg-sky-50',
    roiBorder:   'dark:border-sky-500/30 border-sky-200',
  },
  {
    key: 'mid',
    label: '中型企业',
    range: '150–500 人',
    deploy: 'Box Pro S / Box Pro M',
    deployColor: 'dark:text-violet-300 text-violet-700',
    labelColor:  'dark:text-violet-300 text-violet-700',
    cardBg:      'dark:bg-slate-800 bg-violet-50',
    cardBorder:  'dark:border-violet-500/40 border-violet-200',
    dot:         'bg-violet-400',
    roiBg:       'dark:bg-slate-700 bg-violet-50',
    roiBorder:   'dark:border-violet-500/30 border-violet-200',
  },
  {
    key: 'large',
    label: '大型企业',
    range: '500 人以上',
    deploy: 'Box Pro M / 集群定制',
    deployColor: 'dark:text-amber-300 text-amber-700',
    labelColor:  'dark:text-amber-300 text-amber-700',
    cardBg:      'dark:bg-slate-800 bg-amber-50',
    cardBorder:  'dark:border-amber-500/40 border-amber-200',
    dot:         'bg-amber-400',
    roiBg:       'dark:bg-slate-700 bg-amber-50',
    roiBorder:   'dark:border-amber-500/30 border-amber-200',
  },
]


// ─── 适用企业类型数据（8 类行业）────────────────────────────────────────────
const INDUSTRY_TYPES = [
  {
    key: 'ecommerce',
    name: '电商与零售企业',
    icon: BarChart3,
    gradient: 'from-blue-500 to-cyan-500',
    dot: 'bg-blue-400',
    deploy: 'Cloud Pro / Box Pro S',
    deployColor: 'dark:text-sky-300 text-sky-700',
    linkColor: 'dark:text-sky-300 text-sky-700',
    anchor: 'sales',
    reasons: ['客服自动化', '销售预测', '库存智能补货', '数据驱动营销'],
  },
  {
    key: 'education',
    name: '教育与培训机构',
    icon: Users,
    gradient: 'from-purple-500 to-violet-500',
    dot: 'bg-purple-400',
    deploy: 'Cloud Pro / Box Pro S',
    deployColor: 'dark:text-violet-300 text-violet-700',
    linkColor: 'dark:text-violet-300 text-violet-700',
    anchor: 'hr',
    reasons: ['智能招生助手', '课程内容生成', '学员数据分析', '自动答疑'],
  },
  {
    key: 'manufacturing',
    name: '制造与生产企业',
    icon: Factory,
    gradient: 'from-orange-500 to-amber-500',
    dot: 'bg-orange-400',
    deploy: 'Box Pro S / Box Pro M',
    deployColor: 'dark:text-amber-300 text-amber-700',
    linkColor: 'dark:text-amber-300 text-amber-700',
    anchor: 'supply',
    reasons: ['供应链预测', '生产排程优化', '设备维护分析', '成本控制'],
  },
  {
    key: 'finance',
    name: '金融与保险企业',
    icon: Building2,
    gradient: 'from-emerald-500 to-teal-500',
    dot: 'bg-emerald-400',
    deploy: 'Box Pro M / 定制集群',
    deployColor: 'dark:text-emerald-300 text-emerald-700',
    linkColor: 'dark:text-emerald-300 text-emerald-700',
    anchor: 'finance',
    reasons: ['风控辅助分析', '客户分层管理', '自动报告生成', '合规审计辅助'],
  },
  {
    key: 'healthcare',
    name: '医疗与健康管理',
    icon: Database,
    gradient: 'from-rose-500 to-pink-500',
    dot: 'bg-rose-400',
    deploy: 'Box Pro M / 定制集群',
    deployColor: 'dark:text-rose-300 text-rose-700',
    linkColor: 'dark:text-rose-300 text-rose-700',
    anchor: 'data',
    reasons: ['数据归档', '辅助诊断分析', '患者随访管理', '合规文档处理'],
  },
  {
    key: 'tech',
    name: '互联网与科技公司',
    icon: Cpu,
    gradient: 'from-sky-500 to-blue-600',
    dot: 'bg-sky-400',
    deploy: 'Cloud Pro / Box Pro S',
    deployColor: 'dark:text-sky-300 text-sky-700',
    linkColor: 'dark:text-sky-300 text-sky-700',
    anchor: 'data',
    reasons: ['产品数据分析', '用户行为洞察', '研发效能提升', '客服智能化'],
  },
  {
    key: 'logistics',
    name: '物流与供应链企业',
    icon: TrendingUp,
    gradient: 'from-yellow-500 to-orange-500',
    dot: 'bg-yellow-400',
    deploy: 'Box Pro S / Box Pro M',
    deployColor: 'dark:text-amber-300 text-amber-700',
    linkColor: 'dark:text-amber-300 text-amber-700',
    anchor: 'supply',
    reasons: ['路线优化', '仓储智能调度', '异常预警', '成本分析报告'],
  },
  {
    key: 'professional',
    name: '专业服务型企业',
    icon: MessageSquare,
    gradient: 'from-indigo-500 to-violet-600',
    dot: 'bg-indigo-400',
    deploy: 'Cloud Pro / Box Pro S',
    deployColor: 'dark:text-violet-300 text-violet-700',
    linkColor: 'dark:text-violet-300 text-violet-700',
    anchor: 'finance',
    reasons: ['报告自动生成', '案件整理', '文档处理', '数据归档'],
  },
]

// ─── 六大场景数据────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'sales',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500',
    borderHover: 'hover:border-blue-500/50',
    // 流程步骤标签颜色（深色背景上必须足够亮）
    stepColor: 'dark:text-sky-300 text-blue-700',
    title: '销售管理智能体',
    tagline: '让销售总监实时掌握全局，让每一条线索都不再流失。',
    pains: [
      '销售漏斗数据分散在多个系统，无法实时汇总',
      '拜访记录依赖人工填报，信息滞后且失真',
      '成交概率全靠经验判断，缺乏数据支撑',
      '销售目标达成情况只能月底复盘，无法及时干预',
      'CRM 数据更新不及时，管理层决策信息严重滞后',
    ],
    flow: [
      { step: '数据接入', desc: 'CRM / 邮件 / 通话记录 / 拜访日志多源同步' },
      { step: '智能分析', desc: '漏斗健康度评分、成交概率预测、异常线索识别' },
      { step: '自动执行', desc: '生成拜访报告、触发跟进提醒、推送销售简报' },
      { step: '管理反馈', desc: '实时销售看板、目标达成预警、团队绩效对比' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '10 名销售，月均节省报告整理 40 小时，漏单率降低约 15%' },
      { scale: '中型企业（150–500 人）', example: '50 名销售，季度销售预测准确率提升 20%，管理成本降低约 ¥3 万/月' },
      { scale: '大型企业（500 人以上）', example: '200+ 销售，全渠道数据统一，年度销售效率提升约 25–35%' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '销售效率提升 30–40%，漏单率降低 15–25%',
  },
  {
    id: 'cs',
    icon: MessageSquare,
    gradient: 'from-green-500 to-teal-500',
    borderHover: 'hover:border-green-500/50',
    stepColor: 'dark:text-emerald-300 text-emerald-700',
    title: '客服中心智能体',
    tagline: '让客服团队从重复问答中解放，专注处理高价值复杂诉求。',
    pains: [
      '80% 的工单是重复性问题，人工处理效率低下',
      '高峰期排队时间长，客户满意度下降',
      '知识库分散，客服查找答案耗时过长',
      '工单分类和优先级全靠人工判断，误判率高',
      '客服质检依赖抽样，问题发现严重滞后',
    ],
    flow: [
      { step: '数据接入', desc: '工单系统 / 聊天记录 / 知识库 / 产品文档统一接入' },
      { step: '智能分析', desc: '意图识别、情绪判断、优先级评分、知识匹配' },
      { step: '自动执行', desc: '自动回复标准问题、智能分配工单、生成处理建议' },
      { step: '管理反馈', desc: '客服质检报告、满意度趋势、高频问题归因分析' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '5 名客服，自动处理率达 50%，人均处理量提升约 1 倍' },
      { scale: '中型企业（150–500 人）', example: '20 名客服，首响时间从 8 分钟降至 1 分钟，CSAT 提升约 12%' },
      { scale: '大型企业（500 人以上）', example: '100+ 客服，年度人力成本节省约 ¥80–150 万，质检覆盖率达 100%' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '自动处理率 40–60%，客户满意度提升 10–15%',
  },
  {
    id: 'hr',
    icon: Users,
    gradient: 'from-pink-500 to-rose-500',
    borderHover: 'hover:border-pink-500/50',
    stepColor: 'dark:text-rose-300 text-rose-700',
    title: '人力资源智能体',
    tagline: '让 HR 从事务性工作中解放，聚焦组织发展与人才战略。',
    pains: [
      '简历筛选耗费大量时间，初筛质量参差不齐',
      '绩效数据分散在多个表格，汇总分析耗时数天',
      '员工关怀节点（生日、周年）依赖人工记录，经常遗漏',
      '离职风险无法提前识别，关键人才流失被动应对',
      '培训需求调研周期长，与实际业务脱节',
    ],
    flow: [
      { step: '数据接入', desc: 'HRIS / 招聘系统 / 绩效表格 / 考勤数据多源同步' },
      { step: '智能分析', desc: '简历匹配评分、绩效趋势分析、离职风险预测' },
      { step: '自动执行', desc: '推送关怀提醒、生成绩效报告、触发培训推荐' },
      { step: '管理反馈', desc: '人才地图、组织健康度看板、招聘漏斗分析' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '2 名 HR，招聘初筛时间减少 60%，月均节省约 30 小时' },
      { scale: '中型企业（150–500 人）', example: '5 名 HR，绩效报告生成从 3 天缩至 2 小时，人效提升约 35%' },
      { scale: '大型企业（500 人以上）', example: '20+ HR，离职预警准确率约 70%，关键岗位保留率提升约 10%' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '招聘效率提升 40–60%，HR 人效提升 30–40%',
  },
  {
    id: 'finance',
    icon: BarChart3,
    gradient: 'from-emerald-500 to-green-600',
    borderHover: 'hover:border-emerald-500/50',
    stepColor: 'dark:text-emerald-300 text-emerald-700',
    title: '财务管理智能体',
    tagline: '让财务从报表制作中解放，成为企业经营决策的核心支撑。',
    pains: [
      '月度财务报表制作耗时 3–5 天，数据来源繁杂',
      '多子公司/多项目数据合并，错误率高且耗时',
      '预算执行情况无法实时追踪，超支发现严重滞后',
      '现金流预测依赖经验，准确率低',
      '财务异常（大额支出、异常报销）发现不及时',
    ],
    flow: [
      { step: '数据接入', desc: 'ERP / 银行流水 / 报销系统 / 预算表格自动同步' },
      { step: '智能分析', desc: '多维财务分析、预算偏差识别、现金流预测建模' },
      { step: '自动执行', desc: '自动生成管理报表、触发异常预警、推送执行简报' },
      { step: '管理反馈', desc: '实时财务看板、经营分析报告、决策建议摘要' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '1–2 名财务，月报制作时间从 3 天缩至 4 小时，错误率降低约 80%' },
      { scale: '中型企业（150–500 人）', example: '5 名财务，多项目数据合并自动化，月均节省约 60 人时' },
      { scale: '大型企业（500 人以上）', example: '20+ 财务，预算执行实时监控，年度财务风险损失减少约 15–20%' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '报表生成时间缩短 80%，财务异常响应速度提升 10 倍',
  },
  {
    id: 'supply',
    icon: Factory,
    gradient: 'from-orange-500 to-amber-500',
    borderHover: 'hover:border-orange-500/50',
    stepColor: 'dark:text-amber-300 text-amber-700',
    title: '供应链管理智能体',
    tagline: '让供应链从被动响应转为主动预判，降低库存风险与交付延误。',
    pains: [
      '库存数据分散，积压与缺货并存，难以平衡',
      '供应商交期预测依赖人工跟进，信息不透明',
      '需求预测准确率低，导致备货过多或不足',
      '多仓库调拨决策缺乏数据支撑，效率低下',
      '采购审批流程繁琐，紧急采购响应慢',
    ],
    flow: [
      { step: '数据接入', desc: 'ERP / WMS / 供应商系统 / 销售预测数据多源同步' },
      { step: '智能分析', desc: '需求预测建模、库存健康度评分、供应商风险评估' },
      { step: '自动执行', desc: '触发补货建议、生成采购计划、推送交期预警' },
      { step: '管理反馈', desc: '供应链健康看板、库存周转分析、供应商绩效报告' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '库存周转率提升约 15%，缺货率降低约 20%' },
      { scale: '中型企业（150–500 人）', example: '需求预测准确率提升约 18%，年度库存积压减少约 ¥50–100 万' },
      { scale: '大型企业（500 人以上）', example: '多仓协同效率提升约 25%，供应链整体成本降低约 8–12%' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '库存周转率提升 15–25%，供应链响应速度提升 40%',
  },
  {
    id: 'data',
    icon: Database,
    gradient: 'from-violet-500 to-purple-600',
    borderHover: 'hover:border-violet-500/50',
    stepColor: 'dark:text-violet-300 text-violet-700',
    title: '数据分析智能体',
    tagline: '让每位业务负责人都能直接获取数据洞察，无需等待数据团队。',
    pains: [
      '数据分析需求积压，数据团队成为业务瓶颈',
      '业务人员无法自助获取数据，决策依赖经验',
      '报表制作耗时，数据时效性差，决策滞后',
      '多系统数据孤岛，跨部门数据整合困难',
      '数据质量问题难以发现，影响分析结论可信度',
    ],
    flow: [
      { step: '数据接入', desc: '多数据源统一接入（数据库 / BI 工具 / Excel / API）' },
      { step: '智能分析', desc: '自然语言查询、自动图表生成、异常检测、趋势预测' },
      { step: '自动执行', desc: '定时推送分析报告、触发数据异常告警、生成决策摘要' },
      { step: '管理反馈', desc: '业务看板自助查询、数据质量监控、分析结论追溯' },
    ],
    roi: [
      { scale: '小型企业（150 人以内）', example: '无专职数据分析师也能自助获取报表，决策响应速度提升约 5 倍' },
      { scale: '中型企业（150–500 人）', example: '数据分析需求响应时间从 3 天降至 30 分钟，数据团队人效提升约 3 倍' },
      { scale: '大型企业（500 人以上）', example: '全公司数据民主化，年度数据驱动决策覆盖率从 30% 提升至 80%+' },
    ],
    deploys: ['Cloud Pro / Box Pro S', 'Box Pro S / Box Pro M', 'Box Pro M / 定制集群'],
    benefit: '分析响应速度提升 5–10 倍，数据驱动决策覆盖率提升 2–3 倍',
  },
]

// ─── 横向对比表数据────────────────────────────────────────────────────────────
const COMPARE_TABLE = [
  {
    scenario: '销售管理智能体',
    benefit: '漏单率降低 15–25%，销售效率 +30%',
    deploy: 'Cloud Pro / Box Pro S',
    scales: ['150 人以内', '150–500 人', '500 人以上'],
  },
  {
    scenario: '客服中心智能体',
    benefit: '自动处理率 40–60%，CSAT +10%',
    deploy: 'Cloud Pro / Box Pro S',
    scales: ['150 人以内', '150–500 人', '500 人以上'],
  },
  {
    scenario: '人力资源智能体',
    benefit: '招聘效率 +40%，HR 人效 +35%',
    deploy: 'Cloud Pro / Box Pro S',
    scales: ['150 人以内', '150–500 人'],
  },
  {
    scenario: '财务管理智能体',
    benefit: '报表生成时间缩短 80%',
    deploy: 'Box Pro S / Box Pro M',
    scales: ['150–500 人', '500 人以上'],
  },
  {
    scenario: '供应链管理智能体',
    benefit: '库存周转率 +15%，响应速度 +40%',
    deploy: 'Box Pro S / Box Pro M',
    scales: ['150–500 人', '500 人以上'],
  },
  {
    scenario: '数据分析智能体',
    benefit: '分析响应速度提升 5–10 倍',
    deploy: 'Box Pro M / 定制集群',
    scales: ['150 人以内', '150–500 人', '500 人以上'],
  },
]

export default function ScenariosPage() {
  return (
    <div className="min-h-screen">

      {/* ── 页面定位区 ──────────────────────────────────────────────────── */}
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
            企业级智能体解决方案
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">
            企业级智能体应用场景
          </h1>
          <p className="dark:text-gray-200 text-gray-700 text-base max-w-2xl mx-auto mb-2">
            从销售到供应链，让 OpenClaw 成为每个部门的超级管理 Agent。
          </p>
          <p className="dark:text-gray-400 text-gray-500 text-sm max-w-xl mx-auto mb-7">
            企业真正需要的不是 AI 工具，而是可落地的部门级智能解决方案。
          </p>

          {/* CTA 按钮组 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* 主按钮：solid，始终可读 */}
            <Link
              href="/about#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                text-white font-semibold text-sm transition-all"
            >
              预约企业场景评估 <ArrowRight className="w-4 h-4" />
            </Link>
            {/* 次要按钮：深色 bg-white/15，浅色 bg-gray-100 */}
            <Link
              href="/deployment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                dark:bg-white/15 bg-gray-100
                dark:hover:bg-white/25 hover:bg-gray-200
                dark:active:bg-white/30 active:bg-gray-300
                dark:text-white text-gray-900
                font-semibold text-sm transition-all
                dark:border dark:border-white/20 border border-gray-200"
            >
              查看部署方案 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── 企业规模引导区 ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              按企业规模选择方案
            </h2>
            <p className="text-sm dark:text-gray-400 text-gray-500">
              不同规模企业适配不同部署架构与智能体能力配置
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SCALES.map(s => (
              <div
                key={s.key}
                className={`rounded-2xl p-5 border ${s.cardBg} ${s.cardBorder}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  <span className={`font-bold text-sm ${s.labelColor}`}>{s.label}</span>
                  <span className="text-xs dark:text-gray-400 text-gray-500">（{s.range}）</span>
                </div>
                <div className="text-xs dark:text-gray-300 text-gray-600 mb-3 leading-relaxed">
                  适合初步引入 AI 能力，快速验证场景价值，控制初期投入成本。
                </div>
                <div className="text-xs">
                  <span className="dark:text-gray-400 text-gray-500">推荐部署：</span>
                  <span className={`ml-1 font-semibold ${s.deployColor}`}>{s.deploy}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 适用企业类型模块 ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              哪些企业适合部署 OpenClaw 智能体？
            </h2>
            <p className="text-sm dark:text-gray-400 text-gray-500 max-w-xl mx-auto">
              从数字化升级到智能化转型，以下类型企业最容易率先实现 ROI 回收。
            </p>
          </div>

          {/* 8 类行业卡片：PC 4 列，移动 1 列 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRY_TYPES.map((ind) => (
              <Link
                key={ind.key}
                href={`/scenarios#${ind.anchor}`}
                className="group block rounded-xl p-5 border transition-all
                  dark:bg-neutral-900 bg-white
                  dark:border-neutral-800 border-neutral-200
                  hover:shadow-md dark:hover:border-neutral-700 hover:border-neutral-300
                  min-h-[44px]"
              >
                {/* 图标 + 标题 */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${ind.gradient} shrink-0`}>
                    <ind.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold dark:text-neutral-100 text-neutral-900 leading-tight">
                    {ind.name}
                  </h3>
                </div>

                {/* 4 条适用说明 */}
                <ul className="space-y-1.5 mb-4">
                  {ind.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${ind.dot}`} />
                      <span className="text-xs dark:text-neutral-400 text-neutral-600 leading-relaxed">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 底部：推荐部署 + 查看场景 */}
                <div className="pt-3 border-t dark:border-neutral-800 border-neutral-100">
                  <div className="text-xs dark:text-neutral-500 text-neutral-400 mb-1.5">
                    推荐部署：
                    <span className={`ml-1 font-semibold ${ind.deployColor}`}>
                      {ind.deploy}
                    </span>
                  </div>
                  <div className={`text-xs font-semibold flex items-center gap-1 ${ind.linkColor} group-hover:underline`}>
                    查看对应场景 <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 六大场景完整模块 ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-8">
            六大部门智能解决方案
          </h2>
          <div className="space-y-8">
            {SCENARIOS.map((sc, idx) => (
              <div
                key={sc.id}
                id={sc.id}
                className={`glass rounded-2xl border dark:border-white/10 border-gray-200 ${sc.borderHover} transition-all overflow-hidden`}
              >
                {/* 场景头部 */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${sc.gradient} shrink-0`}>
                      <sc.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-bold dark:text-white text-gray-900">
                          {sc.title}
                        </h3>
                        <span className="text-xs dark:text-gray-500 text-gray-400 font-mono">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-sm dark:text-gray-200 text-gray-700 font-medium">
                        {sc.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x dark:divide-white/10 divide-gray-100">

                  {/* ── 左列：痛点 + 流程 ── */}
                  <div className="p-6">
                    {/* 企业痛点 */}
                    <div className="mb-5">
                      <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">
                        企业痛点
                      </div>
                      <ul className="space-y-2">
                        {sc.pains.map((pain, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span className="text-sm dark:text-gray-200 text-gray-700 leading-relaxed">
                              {pain}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 解决逻辑流程 */}
                    <div>
                      <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">
                        OpenClaw 解决逻辑
                      </div>
                      <div className="space-y-3">
                        {sc.flow.map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            {/* 步骤圆圈 */}
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${sc.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
                              {i + 1}
                            </div>
                            <div>
                              <span className={`text-xs font-semibold ${sc.stepColor}`}>
                                {f.step}
                              </span>
                              <span className="text-xs dark:text-gray-300 text-gray-600 ml-1.5">
                                {f.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── 右列：ROI 示例 + 推荐部署 ── */}
                  <div className="p-6">
                    {/* ROI 示例 */}
                    <div className="mb-5">
                      <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">
                        ROI 参考示例（保守估算）
                      </div>
                      <div className="space-y-2">
                        {sc.roi.map((r, i) => (
                          <div
                            key={i}
                            className={`rounded-xl p-3 border ${SCALES[i].roiBg} ${SCALES[i].roiBorder}`}
                          >
                            <div className={`text-xs font-semibold mb-1 ${SCALES[i].labelColor}`}>
                              {r.scale}
                            </div>
                            <div className="text-xs dark:text-gray-300 text-gray-600 leading-relaxed">
                              {r.example}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 推荐部署版本 */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">
                        推荐部署版本
                      </div>
                      <div className="space-y-2">
                        {SCALES.map((s, i) => (
                          <div key={s.key} className="flex items-center justify-between text-xs">
                            <span className="dark:text-gray-300 text-gray-600">
                              {s.label}（{s.range}）
                            </span>
                            <span className={`font-semibold ${s.deployColor}`}>
                              {sc.deploys[i]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 综合收益 */}
                    <div className="pt-3 border-t dark:border-white/10 border-gray-100 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <p className="text-xs font-medium dark:text-emerald-300 text-emerald-700">
                          {sc.benefit}
                        </p>
                      </div>
                    </div>

                    {/* 场景 CTA 按钮 */}
                    <div className="flex gap-2">
                      {/* 主按钮：solid blue */}
                      <Link
                        href="/about#contact"
                        className="flex-1 text-center py-2 rounded-lg text-xs font-semibold
                          bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                          text-white transition-all"
                      >
                        预约该场景部署
                      </Link>
                      {/* 次要按钮：深色有足够不透明度 */}
                      <Link
                        href="/about#contact"
                        className="flex-1 text-center py-2 rounded-lg text-xs font-semibold
                          dark:bg-white/15 bg-gray-100
                          dark:hover:bg-white/25 hover:bg-gray-200
                          dark:text-white text-gray-800
                          transition-all
                          dark:border dark:border-white/20 border border-gray-200"
                      >
                        获取解决方案
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 场景横向对比表 ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">
            场景横向对比
          </h2>
          {/* 表格容器：深色用实色背景，禁止透明叠加 */}
          <div className="rounded-2xl border dark:border-slate-700 border-gray-200 overflow-hidden
            dark:bg-slate-900 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  {/* 表头：深色用 slate-800 实色，浅色用 gray-50 */}
                  <tr className="dark:bg-slate-800 bg-gray-50 border-b dark:border-slate-700 border-gray-200">
                    <th className="text-left py-3.5 px-5 text-xs font-semibold dark:text-slate-200 text-gray-600 uppercase tracking-wide">
                      场景
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold dark:text-slate-200 text-gray-600 uppercase tracking-wide">
                      主要收益
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold dark:text-slate-200 text-gray-600 uppercase tracking-wide">
                      推荐部署
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold dark:text-slate-200 text-gray-600 uppercase tracking-wide">
                      适用规模
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-slate-700/60 divide-gray-100">
                  {COMPARE_TABLE.map((row, i) => (
                    <tr
                      key={i}
                      className="dark:hover:bg-slate-800 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <span className="font-semibold dark:text-white text-gray-900 text-sm">
                          {row.scenario}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs dark:text-slate-200 text-gray-700">
                          {row.benefit}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-semibold dark:text-sky-300 text-blue-700">
                          {row.deploy}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {row.scales.map(sc => (
                            <span
                              key={sc}
                              className="inline-block px-2 py-0.5 rounded-full text-xs
                                dark:bg-slate-700 bg-gray-100
                                dark:text-slate-100 text-gray-700
                                dark:border dark:border-slate-600 border border-gray-200"
                            >
                              {sc}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 底部收口 CTA（Design Token 驱动，禁止透明叠加）── */}
        <section>
          <div className="cta-block p-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
              dark:bg-blue-500/15 bg-blue-50
              dark:border dark:border-blue-400/30 border border-blue-200
              dark:text-blue-300 text-blue-700
              text-xs font-medium mb-4">
              <Cpu className="w-3.5 h-3.5" />
              企业专属智能体架构设计
            </div>

            <h3 className="cta-title text-2xl mb-3">
              为您的企业设计专属智能体架构
            </h3>
            <p className="cta-body text-sm max-w-xl mx-auto mb-7">
              从试点部署到规模化智能转型，我们为企业提供完整技术与服务支持。
            </p>

            {/* 按钮组 */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/about#contact" className="btn-cta-primary shadow-lg shadow-blue-500/20">
                预约企业部署评估 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about#contact" className="btn-cta-secondary">
                获取完整解决方案 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 信任背书 */}
            <p className="cta-body text-xs mt-5">
              专属顾问 1 对 1 评估 · 48 小时内响应 · 免费出具场景匹配报告
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
