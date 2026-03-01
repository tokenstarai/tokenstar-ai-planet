'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Users, Clock, DollarSign, Info } from 'lucide-react'

// ─── 保守系数（常量，不暴露为滑块）────────────────────────────────────────────
const APPLICABLE_RATIO = 0.25
const ADOPTION_RATE    = 0.65
const REALIZATION_RATE = 0.35

// ─── 部署方案成本参数 ────────────────────────────────────────────────────────
const DEPLOYMENT_PLANS = {
  cloud: {
    name: 'Cloud Pro',
    upfront: 0,
    depreciation_months: 0,
    monthly_opex: 699,
    label: '含基础支持',
  },
  'box-s': {
    name: 'Box Pro S',
    upfront: 88000,
    depreciation_months: 36,
    monthly_opex: 1500,
    label: '3年折旧 + 运维',
  },
  'box-m': {
    name: 'Box Pro M',
    upfront: 198000,
    depreciation_months: 36,
    monthly_opex: 2500,
    label: '3年折旧 + 运维',
  },
} as const

type PlanKey = keyof typeof DEPLOYMENT_PLANS

export function ROICalculator() {
  const [employees, setEmployees]           = useState(100)
  const [avgSalary, setAvgSalary]           = useState(15000)
  const [aiEfficiency, setAiEfficiency]     = useState(20)
  const [deploymentType, setDeploymentType] = useState<PlanKey>('box-s')

  const roi = useMemo(() => {
    const plan = DEPLOYMENT_PLANS[deploymentType]
    const WORK_HOURS_MONTH = 22 * 8
    const hourly_cost = avgSalary / WORK_HOURS_MONTH
    const hours_saved_month =
      employees * WORK_HOURS_MONTH * APPLICABLE_RATIO * (aiEfficiency / 100) * ADOPTION_RATE
    const value_month = hours_saved_month * hourly_cost * REALIZATION_RATE
    const annual_saving = Math.round(value_month * 12)
    const monthly_depreciation = plan.upfront > 0 ? plan.upfront / plan.depreciation_months : 0
    const monthly_cost = monthly_depreciation + plan.monthly_opex
    const annual_cost  = Math.round(monthly_cost * 12)
    const annual_net   = annual_saving - annual_cost
    const roi_raw      = annual_cost > 0 ? (annual_net / annual_cost) * 100 : 0
    const roi_display  = roi_raw > 500 ? '500%+' : `${Math.round(roi_raw)}%`

    let payback_months: number | null = null
    let payback_label = ''

    if (deploymentType === 'cloud') {
      const monthly_saving = value_month
      if (monthly_saving <= monthly_cost) {
        payback_label = '建议试点'
      } else {
        payback_months = Math.max(1, Math.ceil(annual_cost / monthly_saving))
      }
    } else {
      const net_monthly = value_month - plan.monthly_opex
      if (net_monthly <= 0) {
        payback_label = '建议试点'
      } else {
        payback_months = Math.max(1, Math.ceil(plan.upfront / net_monthly))
      }
    }

    if (payback_months !== null) {
      if (payback_months <= 12)      payback_label = '优秀'
      else if (payback_months <= 24) payback_label = '良好'
      else                           payback_label = '偏长'
    }

    return {
      annual_saving, annual_cost, annual_net,
      roi_display, roi_raw: Math.round(roi_raw),
      payback_months, payback_label,
      monthly_saving: Math.round(value_month),
    }
  }, [employees, avgSalary, aiEfficiency, deploymentType])

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 10000) return `¥${(n / 10000).toFixed(1)}万`
    return `¥${n.toLocaleString()}`
  }

  // ─── 滑块公共样式 ──────────────────────────────────────────────────────────
  const sliderClass = `
    w-full h-1.5 rounded-full appearance-none cursor-pointer
    dark:bg-slate-600 bg-slate-200
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-indigo-500
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:shadow-sm
    [&::-webkit-slider-thumb]:dark:bg-indigo-400
  `

  return (
    <section className="mb-14" id="roi-calculator">
      {/* 标题 */}
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">ROI 投资回报测算</h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        输入企业基本信息，估算 AI 部署的投资回报周期与年度净收益。
      </p>

      {/* 主容器 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm dark:shadow-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700">

          {/* ── 左侧：输入区 ─────────────────────────────────────────────── */}
          <div className="p-6 bg-white dark:bg-slate-800/60">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-5">企业基本信息</h3>

            {/* 部署方案选择 */}
            <div className="mb-5">
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-2">选择部署方案</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(DEPLOYMENT_PLANS) as PlanKey[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setDeploymentType(type)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                      deploymentType === type
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 bg-white dark:bg-slate-700/50'
                    }`}
                  >
                    {DEPLOYMENT_PLANS[type].name}
                  </button>
                ))}
              </div>
            </div>

            {/* 员工数量 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 使用 AI 的员工数量
                </label>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{employees} 人</span>
              </div>
              <input
                type="range" min={10} max={1000} step={10}
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>10</span><span>500</span><span>1000</span>
              </div>
            </div>

            {/* 平均月薪 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> 员工平均月薪（元）
                </label>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">¥{avgSalary.toLocaleString()}</span>
              </div>
              <input
                type="range" min={5000} max={50000} step={1000}
                value={avgSalary}
                onChange={e => setAvgSalary(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>¥5,000</span><span>¥25,000</span><span>¥50,000</span>
              </div>
            </div>

            {/* AI 效率提升 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 预期效率提升比例
                </label>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{aiEfficiency}%</span>
              </div>
              <input
                type="range" min={5} max={50} step={5}
                value={aiEfficiency}
                onChange={e => setAiEfficiency(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
                <span>5%</span><span>25%</span><span>50%</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">行业平均 15–25%，保守估算建议选 15%</p>
            </div>

            {/* 保守系数说明 */}
            <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-3">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-medium text-indigo-700 dark:text-indigo-300">保守估算说明：</span>
                  计算已考虑 AI 可覆盖工作占比（25%）、采用率（65%）与价值兑现率（35%），
                  效率提升并不等于等额成本节省。
                </div>
              </div>
            </div>
          </div>

          {/* ── 右侧：结果区 ─────────────────────────────────────────────── */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/40">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-5">测算结果</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">

              {/* 年度人力节省 */}
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">年度人力节省</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatMoney(roi.annual_saving)}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  月均 {formatMoney(roi.monthly_saving)}
                </div>
              </div>

              {/* 年度部署成本 */}
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">年度部署成本</div>
                <div className="text-xl font-bold text-slate-700 dark:text-slate-200">
                  {formatMoney(roi.annual_cost)}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {DEPLOYMENT_PLANS[deploymentType].label}
                </div>
              </div>

              {/* 年度净收益 */}
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">年度净收益</div>
                {roi.annual_net <= -roi.annual_cost * 0.5 ? (
                  <>
                    <div className="text-base font-bold text-slate-400 dark:text-slate-500 leading-tight">
                      建议试点
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      规模偏小，建议先 Cloud 试点
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`text-xl font-bold ${
                      roi.annual_net > 0
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {roi.annual_net > 0 ? '+' : ''}{formatMoney(roi.annual_net)}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      ROI {roi.roi_display}
                    </div>
                  </>
                )}
              </div>

              {/* 投资回收周期 */}
              <div className="bg-white dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">投资回收周期</div>
                {roi.payback_months === null ? (
                  <>
                    <div className="text-base font-bold text-slate-400 dark:text-slate-500 leading-tight">
                      不可回本
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      建议先 Cloud 试点
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {roi.payback_months} 个月
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {roi.payback_label}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 进度条 */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>收益 vs 成本比</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {roi.roi_display}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-blue-400"
                  style={{
                    width: `${Math.min(100, Math.max(0,
                      roi.annual_saving + roi.annual_cost > 0
                        ? (roi.annual_saving / (roi.annual_saving + roi.annual_cost)) * 100
                        : 0
                    ))}%`
                  }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mb-4">
              * 以上为保守估算，已考虑 AI 可覆盖工作占比、采用率与价值兑现率；实际效果与行业、流程及使用深度有关。建议联系顾问获取精准评估。
            </p>

            <a
              href="#consultation-form"
              className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold
                bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                dark:bg-indigo-600 dark:hover:bg-indigo-500
                text-white transition-all shadow-sm"
            >
              获取专业 ROI 评估报告
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
