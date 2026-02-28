'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Users, Clock, DollarSign, Info } from 'lucide-react'

// ─── 保守系数（常量，不暴露为滑块）────────────────────────────────────────────
// 这三个系数让结果保守可信，避免"效率提升 ≈ 等额成本节省"的误判
const APPLICABLE_RATIO = 0.25   // AI 可覆盖工作占比 25%（文档/检索/总结/报表类）
const ADOPTION_RATE    = 0.65   // 采用率 65%（非所有员工天天用，且有爬坡期）
const REALIZATION_RATE = 0.35   // 价值兑现率 35%（节省的时间只有一部分能兑现为成本）

// ─── 部署方案成本参数（月度成本，含折旧/运维/电费）────────────────────────────
const DEPLOYMENT_PLANS = {
  cloud: {
    name: 'Cloud Pro',
    upfront: 0,
    depreciation_months: 0,
    // 月费 399 + 基础支持 300
    monthly_opex: 699,
    label: '含基础支持',
  },
  'box-s': {
    name: 'Box Pro S',
    upfront: 88000,
    depreciation_months: 36,
    // 支持服务 1200 + 电费/杂费 300
    monthly_opex: 1500,
    label: '3年折旧 + 运维',
  },
  'box-m': {
    name: 'Box Pro M',
    upfront: 198000,
    depreciation_months: 36,
    // 支持服务 2000 + 电费/杂费 500
    monthly_opex: 2500,
    label: '3年折旧 + 运维',
  },
} as const

type PlanKey = keyof typeof DEPLOYMENT_PLANS

export function ROICalculator() {
  const [employees, setEmployees]       = useState(100)
  const [avgSalary, setAvgSalary]       = useState(15000)
  const [aiEfficiency, setAiEfficiency] = useState(20)
  const [deploymentType, setDeploymentType] = useState<PlanKey>('box-s')

  const roi = useMemo(() => {
    const plan = DEPLOYMENT_PLANS[deploymentType]

    // ── 1. 每小时人力成本 ──────────────────────────────────────────────────
    // 每月工作时长：22 天 × 8 小时 = 176 小时
    const WORK_HOURS_MONTH = 22 * 8
    const hourly_cost = avgSalary / WORK_HOURS_MONTH

    // ── 2. 月可兑现价值（保守三系数） ────────────────────────────────────────
    // 月可节省工时 = 员工数 × 月工时 × 可覆盖占比 × 效率提升% × 采用率
    const hours_saved_month =
      employees * WORK_HOURS_MONTH * APPLICABLE_RATIO * (aiEfficiency / 100) * ADOPTION_RATE
    // 月可兑现价值 = 节省工时 × 小时成本 × 价值兑现率
    const value_month = hours_saved_month * hourly_cost * REALIZATION_RATE
    const annual_saving = Math.round(value_month * 12)

    // ── 3. 月度部署成本 ───────────────────────────────────────────────────
    const monthly_depreciation = plan.upfront > 0
      ? plan.upfront / plan.depreciation_months
      : 0
    const monthly_cost = monthly_depreciation + plan.monthly_opex
    const annual_cost  = Math.round(monthly_cost * 12)

    // ── 4. 净收益 & ROI ───────────────────────────────────────────────────
    const annual_net = annual_saving - annual_cost
    const roi_raw    = annual_cost > 0 ? (annual_net / annual_cost) * 100 : 0
    // 显示上限：超过 500% 显示 "500%+"
    const roi_display = roi_raw > 500 ? '500%+' : `${Math.round(roi_raw)}%`

    // ── 5. 回本周期 ───────────────────────────────────────────────────────
    let payback_months: number | null = null
    let payback_label = ''

    if (deploymentType === 'cloud') {
      // Cloud：用年度成本 / 月均节省
      const monthly_saving = value_month
      if (monthly_saving <= monthly_cost) {
        payback_label = '建议试点'
      } else {
        payback_months = Math.ceil(annual_cost / monthly_saving)
        payback_months = Math.max(1, payback_months)
      }
    } else {
      // Box：用一次性投入 / (月均节省 - 月运维费)
      const net_monthly = value_month - plan.monthly_opex
      if (net_monthly <= 0) {
        payback_label = '建议试点'
      } else {
        payback_months = Math.ceil(plan.upfront / net_monthly)
        payback_months = Math.max(1, payback_months)
      }
    }

    if (payback_months !== null) {
      if (payback_months <= 12) payback_label = '优秀'
      else if (payback_months <= 24) payback_label = '良好'
      else payback_label = '偏长'
    }

    return {
      annual_saving,
      annual_cost,
      annual_net,
      roi_display,
      roi_raw: Math.round(roi_raw),
      payback_months,
      payback_label,
      monthly_saving: Math.round(value_month),
    }
  }, [employees, avgSalary, aiEfficiency, deploymentType])

  const formatMoney = (n: number) => {
    if (Math.abs(n) >= 10000) return `¥${(n / 10000).toFixed(1)}万`
    return `¥${n.toLocaleString()}`
  }

  return (
    <section className="mb-14" id="roi-calculator">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />
        <h2 className="text-xl font-bold dark:text-white text-gray-900">ROI 投资回报测算</h2>
      </div>
      <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">
        输入企业基本信息，估算 AI 部署的投资回报周期与年度净收益。
      </p>

      <div className="glass rounded-2xl border dark:border-yellow-500/20 border-yellow-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x dark:divide-white/8 divide-gray-200">

          {/* ── 左侧：输入区 ─────────────────────────────────────────────── */}
          <div className="p-6">
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-5">企业基本信息</h3>

            {/* 部署方案选择 */}
            <div className="mb-5">
              <label className="block text-xs dark:text-gray-400 text-gray-600 mb-2">选择部署方案</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(DEPLOYMENT_PLANS) as PlanKey[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setDeploymentType(type)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                      deploymentType === type
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'dark:border-white/15 border-gray-300 dark:text-gray-400 text-gray-600 dark:hover:border-white/30 hover:border-gray-400'
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
                <label className="text-xs dark:text-gray-400 text-gray-600 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 使用 AI 的员工数量
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">{employees} 人</span>
              </div>
              <input
                type="range" min={10} max={1000} step={10}
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-300
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-500 text-gray-500 mt-1">
                <span>10</span><span>500</span><span>1000</span>
              </div>
            </div>

            {/* 平均月薪 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs dark:text-gray-400 text-gray-600 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> 员工平均月薪（元）
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">¥{avgSalary.toLocaleString()}</span>
              </div>
              <input
                type="range" min={5000} max={50000} step={1000}
                value={avgSalary}
                onChange={e => setAvgSalary(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-300
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-500 text-gray-500 mt-1">
                <span>¥5,000</span><span>¥25,000</span><span>¥50,000</span>
              </div>
            </div>

            {/* AI 效率提升 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs dark:text-gray-400 text-gray-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 预期效率提升比例
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">{aiEfficiency}%</span>
              </div>
              <input
                type="range" min={5} max={50} step={5}
                value={aiEfficiency}
                onChange={e => setAiEfficiency(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-300
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-500 text-gray-500 mt-1">
                <span>5%</span><span>25%</span><span>50%</span>
              </div>
              <p className="text-xs dark:text-gray-500 text-gray-500 mt-1.5">行业平均 15–25%，保守估算建议选 15%</p>
            </div>

            {/* 保守系数说明 */}
            <div className="rounded-lg dark:bg-white/3 bg-blue-50 border dark:border-white/8 border-blue-100 p-3">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 dark:text-blue-400 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed">
                  <span className="font-medium dark:text-blue-300 text-blue-700">保守估算说明：</span>
                  计算已考虑 AI 可覆盖工作占比（25%）、采用率（65%）与价值兑现率（35%），
                  效率提升并不等于等额成本节省。
                </div>
              </div>
            </div>
          </div>

          {/* ── 右侧：结果区 ─────────────────────────────────────────────── */}
          <div className="p-6 dark:bg-white/2 bg-gray-50">
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-5">测算结果</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* 年度人力节省 */}
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-500 mb-1">年度人力节省</div>
                <div className="text-xl font-bold dark:text-emerald-400 text-emerald-700">
                  {formatMoney(roi.annual_saving)}
                </div>
                <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                  月均 {formatMoney(roi.monthly_saving)}
                </div>
              </div>

              {/* 年度部署成本 */}
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-500 mb-1">年度部署成本</div>
                <div className="text-xl font-bold dark:text-white text-gray-900">
                  {formatMoney(roi.annual_cost)}
                </div>
                <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                  {DEPLOYMENT_PLANS[deploymentType].label}
                </div>
              </div>

              {/* 年度净收益 */}
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-500 mb-1">年度净收益</div>
                {roi.annual_net <= -roi.annual_cost * 0.5 ? (
                  <>
                    <div className="text-base font-bold dark:text-gray-400 text-gray-500 leading-tight">
                      建议试点
                    </div>
                    <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                      规模偏小，建议先 Cloud 试点
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`text-xl font-bold ${
                      roi.annual_net > 0
                        ? 'dark:text-blue-400 text-blue-700'
                        : 'dark:text-red-400 text-red-700'
                    }`}>
                      {roi.annual_net > 0 ? '+' : ''}{formatMoney(roi.annual_net)}
                    </div>
                    <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                      ROI {roi.roi_display}
                    </div>
                  </>
                )}
              </div>

              {/* 投资回收周期 */}
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-500 mb-1">投资回收周期</div>
                {roi.payback_months === null ? (
                  <>
                    <div className="text-base font-bold dark:text-gray-400 text-gray-500 leading-tight">
                      不可回本
                    </div>
                    <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                      建议先 Cloud 试点
                    </div>
                  </>
                ) : (
                  <>
                    {/* amber-700 replaces yellow-600: contrast ~5.0:1 on white */}
                    <div className="text-xl font-bold dark:text-yellow-400 text-amber-700">
                      {roi.payback_months} 个月
                    </div>
                    <div className="text-xs dark:text-gray-500 text-gray-500 mt-0.5">
                      {roi.payback_label}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs dark:text-gray-400 text-gray-600">
                <span>收益 vs 成本比</span>
                <span className="font-medium dark:text-gray-300 text-gray-700">
                  {roi.roi_display}
                </span>
              </div>
              <div className="h-2 rounded-full dark:bg-white/8 bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-emerald-500"
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

            <p className="text-xs dark:text-gray-500 text-gray-500 mt-4 leading-relaxed">
              * 以上为保守估算，已考虑 AI 可覆盖工作占比、采用率与价值兑现率；实际效果与行业、流程及使用深度有关。建议联系顾问获取精准评估。
            </p>

            <a href="#consultation-form" className="mt-4 block w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all">
              获取专业 ROI 评估报告
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
