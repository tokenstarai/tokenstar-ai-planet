'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react'

export function ROICalculator() {
  const [employees, setEmployees] = useState(100)
  const [avgSalary, setAvgSalary] = useState(15000)
  const [aiEfficiency, setAiEfficiency] = useState(20)
  const [deploymentType, setDeploymentType] = useState<'cloud' | 'box-s' | 'box-m'>('box-s')

  const deploymentCosts = {
    'cloud': { name: 'Cloud Pro', monthly: 2999, oneTime: 0 },
    'box-s': { name: 'Box Pro S', monthly: 0, oneTime: 83000 },
    'box-m': { name: 'Box Pro M', monthly: 0, oneTime: 214000 },
  }

  const roi = useMemo(() => {
    const selectedCost = deploymentCosts[deploymentType]
    // 年度人力成本节省
    const annualSalaryTotal = employees * avgSalary * 12
    const annualSaving = annualSalaryTotal * (aiEfficiency / 100)
    // 年度部署成本
    const annualDeploymentCost = selectedCost.oneTime > 0
      ? selectedCost.oneTime / 3  // 3年折旧
      : selectedCost.monthly * 12
    // 净收益
    const netBenefit = annualSaving - annualDeploymentCost
    // 回收周期（月）
    const totalCost = selectedCost.oneTime > 0 ? selectedCost.oneTime : selectedCost.monthly * 12
    const monthlyBenefit = annualSaving / 12
    const paybackMonths = monthlyBenefit > 0 ? Math.ceil(totalCost / monthlyBenefit) : 0
    // ROI 百分比（第一年）
    const roiPercent = annualDeploymentCost > 0
      ? Math.round((netBenefit / annualDeploymentCost) * 100)
      : 0

    return {
      annualSaving: Math.round(annualSaving),
      annualDeploymentCost: Math.round(annualDeploymentCost),
      netBenefit: Math.round(netBenefit),
      paybackMonths,
      roiPercent,
      monthlySaving: Math.round(annualSaving / 12),
    }
  }, [employees, avgSalary, aiEfficiency, deploymentType])

  const formatMoney = (n: number) => {
    if (n >= 10000) return `¥${(n / 10000).toFixed(1)}万`
    return `¥${n.toLocaleString()}`
  }

  return (
    <section className="mb-14" id="roi-calculator">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-5 h-5 dark:text-yellow-400 text-yellow-600" />
        <h2 className="text-xl font-bold dark:text-white text-gray-900">ROI 投资回报测算</h2>
      </div>
      <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">输入企业基本信息，估算 AI 部署的投资回报周期与年度净收益。</p>

      <div className="glass rounded-2xl border dark:border-yellow-500/20 border-yellow-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x dark:divide-white/8 divide-gray-100">

          {/* 左侧：输入区 */}
          <div className="p-6">
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-5">企业基本信息</h3>

            {/* 部署方案选择 */}
            <div className="mb-5">
              <label className="block text-xs dark:text-gray-400 text-gray-500 mb-2">选择部署方案</label>
              <div className="grid grid-cols-3 gap-2">
                {(['cloud', 'box-s', 'box-m'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setDeploymentType(type)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all border ${
                      deploymentType === type
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'dark:border-white/15 border-gray-200 dark:text-gray-400 text-gray-600 dark:hover:border-white/30 hover:border-gray-300'
                    }`}
                  >
                    {deploymentCosts[type].name}
                  </button>
                ))}
              </div>
            </div>

            {/* 员工数量 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs dark:text-gray-400 text-gray-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 使用 AI 的员工数量
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">{employees} 人</span>
              </div>
              <input
                type="range" min={10} max={1000} step={10}
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-200
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-600 text-gray-400 mt-1">
                <span>10</span><span>500</span><span>1000</span>
              </div>
            </div>

            {/* 平均月薪 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs dark:text-gray-400 text-gray-500 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> 员工平均月薪（元）
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">¥{avgSalary.toLocaleString()}</span>
              </div>
              <input
                type="range" min={5000} max={50000} step={1000}
                value={avgSalary}
                onChange={e => setAvgSalary(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-200
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-600 text-gray-400 mt-1">
                <span>¥5,000</span><span>¥25,000</span><span>¥50,000</span>
              </div>
            </div>

            {/* AI 效率提升 */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs dark:text-gray-400 text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 预期效率提升比例
                </label>
                <span className="text-sm font-semibold dark:text-white text-gray-900">{aiEfficiency}%</span>
              </div>
              <input
                type="range" min={5} max={50} step={5}
                value={aiEfficiency}
                onChange={e => setAiEfficiency(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  dark:bg-white/10 bg-gray-200
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs dark:text-gray-600 text-gray-400 mt-1">
                <span>5%</span><span>25%</span><span>50%</span>
              </div>
              <p className="text-xs dark:text-gray-600 text-gray-400 mt-1.5">行业平均 15–25%，保守估算建议选 15%</p>
            </div>
          </div>

          {/* 右侧：结果区 */}
          <div className="p-6 dark:bg-white/2 bg-gray-50/50">
            <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-5">测算结果</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-400 mb-1">年度人力节省</div>
                <div className="text-xl font-bold dark:text-green-400 text-green-600">{formatMoney(roi.annualSaving)}</div>
                <div className="text-xs dark:text-gray-600 text-gray-400 mt-0.5">月均 {formatMoney(roi.monthlySaving)}</div>
              </div>
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-400 mb-1">年度部署成本</div>
                <div className="text-xl font-bold dark:text-white text-gray-900">{formatMoney(roi.annualDeploymentCost)}</div>
                <div className="text-xs dark:text-gray-600 text-gray-400 mt-0.5">
                  {deploymentType === 'cloud' ? '按月订阅' : '3年折旧'}
                </div>
              </div>
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-400 mb-1">年度净收益</div>
                <div className={`text-xl font-bold ${roi.netBenefit > 0 ? 'dark:text-blue-400 text-blue-600' : 'dark:text-red-400 text-red-600'}`}>
                  {roi.netBenefit > 0 ? '+' : ''}{formatMoney(roi.netBenefit)}
                </div>
                <div className="text-xs dark:text-gray-600 text-gray-400 mt-0.5">ROI {roi.roiPercent}%</div>
              </div>
              <div className="dark:bg-white/5 bg-white rounded-xl p-4 border dark:border-white/8 border-gray-200">
                <div className="text-xs dark:text-gray-500 text-gray-400 mb-1">投资回收周期</div>
                <div className="text-xl font-bold dark:text-yellow-400 text-yellow-600">
                  {roi.paybackMonths > 0 ? `${roi.paybackMonths} 个月` : '—'}
                </div>
                <div className="text-xs dark:text-gray-600 text-gray-400 mt-0.5">
                  {roi.paybackMonths > 0 && roi.paybackMonths <= 12 ? '优秀' : roi.paybackMonths <= 24 ? '良好' : '偏长'}
                </div>
              </div>
            </div>

            {/* 进度条 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs dark:text-gray-400 text-gray-500">
                <span>收益 vs 成本比</span>
                <span>{roi.roiPercent > 0 ? `+${roi.roiPercent}%` : `${roi.roiPercent}%`}</span>
              </div>
              <div className="h-2 rounded-full dark:bg-white/8 bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-green-500"
                  style={{ width: `${Math.min(100, Math.max(0, (roi.annualSaving / (roi.annualSaving + roi.annualDeploymentCost)) * 100))}%` }}
                />
              </div>
            </div>

            <p className="text-xs dark:text-gray-600 text-gray-400 mt-4">
              * 以上为估算数据，实际效果因企业规模、行业、使用深度而异。建议联系顾问获取精准评估。
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
