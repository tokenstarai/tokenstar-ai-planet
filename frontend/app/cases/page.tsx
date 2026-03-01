'use client';

import { useState, useMemo } from 'react';
import { CASE_STUDIES, INDUSTRIES, COMPANY_SIZES, type CaseStudy } from '@/lib/caseStudies';

const industryIcon: Record<string, string> = {
  '电商与零售': '🛍️', '教育与培训': '🎓', '制造与生产': '🏭',
  '金融与保险': '🏦', '医疗与健康管理': '🏥', '互联网与科技': '💻',
  '物流与供应链': '🚚', '专业服务（律所/咨询/财税）': '⚖️',
};

const scenarioColor: Record<string, string> = {
  '销售': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  '客服': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'HR': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  '财务': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  '供应链': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  '数据分析': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
};

function CaseDetailModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 p-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {industryIcon[c.industry] ?? '🏢'} {c.industry}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {c.company_size}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${scenarioColor[c.scenario] ?? 'bg-neutral-100 text-neutral-600'}`}>
                {c.scenario}
              </span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{c.title}</h2>
          </div>
          <button onClick={onClose} className="shrink-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-2xl leading-none mt-1" aria-label="关闭">×</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '部署方案', value: c.deployment },
              { label: '上线周期', value: c.timeline },
              { label: '部门场景', value: c.scenario },
              { label: 'ROI 回收', value: c.roi_payback },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.value}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">背景与挑战</h3>
            <ul className="space-y-2">
              {c.challenges.map((ch, i) => (
                <li key={i} className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="shrink-0 text-neutral-400 dark:text-neutral-500">▸</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">解决方案架构</h3>
            <div className="space-y-3">
              {c.solution_steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">{i + 1}</div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{step.title}</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">指标提升</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-neutral-200 dark:border-neutral-700">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  {m}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <a href="/deployment" className="flex-1 text-center py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-semibold transition-colors">
              预约同类行业部署评估
            </a>
            <a href="/scenarios" className="flex-1 text-center py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold transition-colors">
              查看对应场景方案
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c, onClick }: { c: CaseStudy; onClick: () => void }) {
  return (
    <div
      className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5 pb-4 flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
            {industryIcon[c.industry] ?? '🏢'} {c.industry}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${scenarioColor[c.scenario] ?? 'bg-neutral-100 text-neutral-600'}`}>
            {c.scenario}
          </span>
        </div>
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-3 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {c.title}
        </h3>
        <ul className="space-y-1 mb-4">
          {c.metrics.slice(0, 2).map((m, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">✓</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            {c.company_size.split('（')[0]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            回本 {c.roi_payback}
          </span>
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium shrink-0">查看详情 →</span>
      </div>
    </div>
  );
}

export default function CasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('全部行业');
  const [selectedSize, setSelectedSize] = useState<string>('全部规模');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      const industryMatch = selectedIndustry === '全部行业' || c.industry === selectedIndustry;
      const sizeMatch = selectedSize === '全部规模' || c.company_size === selectedSize;
      return industryMatch && sizeMatch;
    });
  }, [selectedIndustry, selectedSize]);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium mb-6">
            <span>🏆</span>
            <span>成功案例与落地实践</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            成功案例与落地实践
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-3 max-w-2xl mx-auto">
            覆盖 8 大行业与 6 大部门场景，验证 OpenClaw 企业部署的真实价值。
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-8 max-w-xl mx-auto">
            以下案例为典型落地路径汇总，指标为保守区间估算，实际效果取决于企业规模、流程成熟度与使用深度。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/deployment" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors">
              预约企业部署评估 →
            </a>
            <a href="/scenarios" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-sm transition-colors">
              查看企业应用场景
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${
                      selectedIndustry === ind
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {ind === '全部行业' ? ind : `${industryIcon[ind] ?? ''} ${ind}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              {COMPANY_SIZES.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${
                    selectedSize === sz
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {sz === '全部规模' ? sz : sz.split('（')[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
            共 {filtered.length} 个案例
            {selectedIndustry !== '全部行业' && `，行业：${selectedIndustry}`}
            {selectedSize !== '全部规模' && `，规模：${selectedSize}`}
          </div>
        </div>
      </section>

      {/* Case Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400 dark:text-neutral-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>暂无符合条件的案例，请调整筛选条件。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <CaseCard key={c.slug} c={c} onClick={() => setSelectedCase(c)} />
            ))}
          </div>
        )}
      </section>

      {/* Landing Path */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              从试点到规模化：行业落地三步走
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-sm">
              无论行业与规模，成功落地都遵循相同的路径节奏。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: '试点阶段', duration: '2–4 周', desc: '选择 1 个高频、低风险的部门场景（如客服自动分流或报表生成），优先使用 Cloud Pro 快速验证价值，控制初期投入。', cta: '查看部署方案', href: '/deployment', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { step: '02', title: '推广阶段', duration: '1–3 个月', desc: '在试点验证后，沉淀 Skills 与数据处理流程，向 2–3 个部门横向扩展，建议升级至 Box Pro S 以满足本地化数据安全需求。', cta: '查看企业应用场景', href: '/scenarios', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { step: '03', title: '规模化阶段', duration: '3–6 个月', desc: '建立跨部门智能体协同体系与数据治理框架，多个 Agent 协同工作，建议 Box Pro M 或定制集群，并配套企业培训计划。', cta: '预约部署评估', href: '/deployment', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            ].map((s) => (
              <div key={s.step} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.bg} ${s.color} font-bold text-lg mb-4`}>{s.step}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{s.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">{s.duration}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">{s.desc}</p>
                <a href={s.href} className={`text-sm font-semibold ${s.color} hover:underline`}>{s.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            让您的企业成为下一个成功案例
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
            提交基本信息，我们将为您输出行业匹配的部署建议与 ROI 评估。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/deployment" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors">
              预约企业部署评估 →
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-sm transition-colors">
              获取行业解决方案白皮书
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-400 dark:text-neutral-500">
            已服务 8 大行业 · 覆盖小型至大型企业全规模段 · 部署周期最短 1 周
          </p>
        </div>
      </section>

      {selectedCase && (
        <CaseDetailModal c={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </main>
  );
}
