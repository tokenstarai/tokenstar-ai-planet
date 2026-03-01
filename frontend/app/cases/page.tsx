'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CASE_STUDIES, INDUSTRIES, COMPANY_SIZES, SCENARIOS, type CaseStudy } from '@/lib/caseStudies';

/*
 * ─── 参数映射表 ─────────────────────────────────────────────────────────────
 * URL 参数（英文）↔ 数据字段（中文）双向映射
 */
const INDUSTRY_TO_PARAM: Record<string, string> = {
  '电商与零售': 'ecommerce',
  '教育与培训': 'education',
  '制造与生产': 'manufacturing',
  '金融与保险': 'finance',
  '医疗与健康管理': 'healthcare',
  '互联网与科技': 'tech',
  '物流与供应链': 'logistics',
  '专业服务（律所/咨询/财税）': 'professional',
};
const PARAM_TO_INDUSTRY: Record<string, string> = Object.fromEntries(
  Object.entries(INDUSTRY_TO_PARAM).map(([k, v]) => [v, k])
);

const SIZE_TO_PARAM: Record<string, string> = {
  '小型企业（150 人以内）': 'lt150',
  '中型企业（150–500 人）': '150-500',
  '大型企业（500 人以上）': 'gt500',
};
const PARAM_TO_SIZE: Record<string, string> = Object.fromEntries(
  Object.entries(SIZE_TO_PARAM).map(([k, v]) => [v, k])
);

const SCENARIO_TO_PARAM: Record<string, string> = {
  '销售': 'sales', '客服': 'service', 'HR': 'hr',
  '财务': 'finance', '供应链': 'supply', '数据分析': 'data',
};
const PARAM_TO_SCENARIO: Record<string, string> = Object.fromEntries(
  Object.entries(SCENARIO_TO_PARAM).map(([k, v]) => [v, k])
);

/** 根据案例生成 /deployment 跳转 URL（带参数） */
function buildDeploymentUrl(c: CaseStudy): string {
  const params = new URLSearchParams();
  const ind = INDUSTRY_TO_PARAM[c.industry];
  const sz  = SIZE_TO_PARAM[c.company_size];
  const sc  = SCENARIO_TO_PARAM[c.scenario];
  if (ind) params.set('industry', ind);
  if (sz)  params.set('size', sz);
  if (sc)  params.set('scenario', sc);
  return `/deployment?${params.toString()}`;
}

/** 根据案例生成 /scenarios 锚点 URL */
function buildScenariosUrl(c: CaseStudy): string {
  const anchor = SCENARIO_TO_PARAM[c.scenario] ?? '';
  return anchor ? `/scenarios#${anchor}` : '/scenarios';
}

/*
 * ─── 配色规范 ────────────────────────────────────────────────────────────────
 */
const industryIcon: Record<string, string> = {
  '电商与零售': '🛍️', '教育与培训': '🎓', '制造与生产': '🏭',
  '金融与保险': '🏦', '医疗与健康管理': '🏥', '互联网与科技': '💻',
  '物流与供应链': '🚚', '专业服务（律所/咨询/财税）': '⚖️',
};
const SCENARIO_BADGE = 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200';
const BTN_ACTIVE   = 'bg-blue-600 dark:bg-blue-500 text-white';
const BTN_INACTIVE = 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700';

/* ─── 案例详情弹窗 ─────────────────────────────────────────────────────────── */
function CaseDetailModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
        {/* 头部 */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 p-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                {industryIcon[c.industry] ?? '🏢'} {c.industry}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                {c.company_size.split('（')[0]}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${SCENARIO_BADGE}`}>
                {c.scenario}
              </span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{c.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-800 dark:hover:text-neutral-200 text-lg font-bold transition-colors mt-0.5"
            aria-label="关闭"
          >×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* 概览卡片 */}
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

          {/* 背景与挑战 */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-widest">背景与挑战</h3>
            <ul className="space-y-2">
              {c.challenges.map((ch, i) => (
                <li key={i} className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="shrink-0 text-neutral-400 dark:text-neutral-500 mt-0.5">▸</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 解决方案 */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-widest">解决方案架构</h3>
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

          {/* 指标提升 */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-widest">指标提升</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-neutral-200 dark:border-neutral-700">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 核心 CTA（动态参数跳转）── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href={buildDeploymentUrl(c)}
              className="flex-1 text-center py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
            >
              获取同类行业部署建议 →
            </a>
            <a
              href={buildScenariosUrl(c)}
              className="flex-1 text-center py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-semibold transition-colors"
            >
              查看对应场景解决方案
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 案例卡片 ─────────────────────────────────────────────────────────────── */
function CaseCard({ c, onClick }: { c: CaseStudy; onClick: () => void }) {
  return (
    <div
      className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-5 pb-4 flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
            {industryIcon[c.industry] ?? '🏢'} {c.industry}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${SCENARIO_BADGE}`}>
            {c.scenario}
          </span>
        </div>
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug mb-3 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {c.title}
        </h3>
        <ul className="space-y-1 mb-4">
          {c.metrics.slice(0, 2).map((m, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium">
            {c.company_size.split('（')[0]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium">
            回本 {c.roi_payback}
          </span>
        </div>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold shrink-0 group-hover:underline">查看详情 →</span>
      </div>
    </div>
  );
}

/* ─── 主页面内容（含 URL 参数解析）──────────────────────────────────────────── */
function CasesContent() {
  const searchParams = useSearchParams();

  // 解析 URL 参数，初始化筛选状态
  const initIndustry = useMemo(() => {
    const p = searchParams.get('industry');
    return p ? (PARAM_TO_INDUSTRY[p] ?? '全部行业') : '全部行业';
  }, [searchParams]);

  const initSize = useMemo(() => {
    const p = searchParams.get('size');
    return p ? (PARAM_TO_SIZE[p] ?? '全部规模') : '全部规模';
  }, [searchParams]);

  const initScenario = useMemo(() => {
    const p = searchParams.get('scenario');
    return p ? (PARAM_TO_SCENARIO[p] ?? '全部场景') : '全部场景';
  }, [searchParams]);

  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initIndustry);
  const [selectedSize, setSelectedSize]         = useState<string>(initSize);
  const [selectedScenario, setSelectedScenario] = useState<string>(initScenario);
  const [selectedCase, setSelectedCase]         = useState<CaseStudy | null>(null);

  // URL 参数变化时同步筛选状态
  useEffect(() => { setSelectedIndustry(initIndustry); }, [initIndustry]);
  useEffect(() => { setSelectedSize(initSize); }, [initSize]);
  useEffect(() => { setSelectedScenario(initScenario); }, [initScenario]);

  /** 清除所有筛选：重置 state + 清除 URL 参数 */
  const clearFilters = () => {
    setSelectedIndustry('全部行业');
    setSelectedSize('全部规模');
    setSelectedScenario('全部场景');
    router.replace('/cases');
  };

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      const iMatch = selectedIndustry === '全部行业' || c.industry === selectedIndustry;
      const sMatch = selectedSize === '全部规模' || c.company_size === selectedSize;
      const scMatch = selectedScenario === '全部场景' || c.scenario === selectedScenario;
      return iMatch && sMatch && scMatch;
    });
  }, [selectedIndustry, selectedSize, selectedScenario]);

  // 当前是否有任何激活的筛选（显示提示条）
  const hasActiveFilters = selectedIndustry !== '全部行业' || selectedSize !== '全部规模' || selectedScenario !== '全部场景';

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">

      {/* ── Hero ── */}
      <section className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-xs font-medium mb-6">
            <span>🏆</span>
            <span>成功案例与落地实践</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            成功案例与落地实践
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-3 max-w-2xl mx-auto">
            覆盖 8 大行业与 6 大部门场景，验证 OpenClaw 企业部署的真实价值。
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-8">
            以下案例为典型落地路径汇总，指标为保守区间估算，实际效果取决于企业规模、流程成熟度与使用深度。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/deployment" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors">
              预约企业部署评估 →
            </a>
            <a href="/scenarios" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-sm transition-colors">
              查看企业应用场景
            </a>
          </div>
        </div>
      </section>

      {/* ── 当前筛选提示条（仅当有激活筛选时显示）── */}
      {hasActiveFilters && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-blue-700 dark:text-blue-300 font-medium">当前筛选：</span>
            {selectedIndustry !== '全部行业' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium">{selectedIndustry}</span>
            )}
            {selectedSize !== '全部规模' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium">{selectedSize.split('（')[0]}</span>
            )}
            {selectedScenario !== '全部场景' && (
              <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium">{selectedScenario}场景</span>
            )}
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium underline underline-offset-2"
            >
              清除筛选
            </button>
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <section className="sticky top-0 z-20 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3">
          {/* 行业筛选 */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-1 min-w-max">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${selectedIndustry === ind ? BTN_ACTIVE : BTN_INACTIVE}`}
                >
                  {ind === '全部行业' ? ind : `${industryIcon[ind] ?? ''} ${ind}`}
                </button>
              ))}
            </div>
          </div>
          {/* 规模 + 场景筛选 */}
          <div className="flex flex-wrap gap-2">
            {COMPANY_SIZES.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${selectedSize === sz ? BTN_ACTIVE : BTN_INACTIVE}`}
              >
                {sz === '全部规模' ? sz : sz.split('（')[0]}
              </button>
            ))}
            <div className="w-px bg-neutral-200 dark:bg-neutral-700 mx-1 self-stretch" />
            {SCENARIOS.map((sc) => (
              <button
                key={sc}
                onClick={() => setSelectedScenario(sc)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${selectedScenario === sc ? BTN_ACTIVE : BTN_INACTIVE}`}
              >
                {sc}
              </button>
            ))}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            共 {filtered.length} 个案例
            {selectedIndustry !== '全部行业' && `，行业：${selectedIndustry}`}
            {selectedSize !== '全部规模' && `，规模：${selectedSize.split('（')[0]}`}
            {selectedScenario !== '全部场景' && `，场景：${selectedScenario}`}
          </div>
        </div>
      </section>

      {/* ── Case Grid ── */}
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

      {/* ── Landing Path ── */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">从试点到规模化：行业落地三步走</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">无论行业与规模，成功落地都遵循相同的路径节奏。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: '试点阶段', duration: '2–4 周', desc: '选择 1 个高频、低风险的部门场景（如客服自动分流或报表生成），优先使用 Cloud Pro 快速验证价值，控制初期投入。', cta: '查看部署方案', href: '/deployment', numBg: 'bg-blue-600 dark:bg-blue-500', tagBg: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700', linkColor: 'text-blue-600 dark:text-blue-400' },
              { step: '02', title: '推广阶段', duration: '1–3 个月', desc: '在试点验证后，沉淀 Skills 与数据处理流程，向 2–3 个部门横向扩展，建议升级至 Box Pro S 以满足本地化数据安全需求。', cta: '查看企业应用场景', href: '/scenarios', numBg: 'bg-emerald-600 dark:bg-emerald-500', tagBg: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700', linkColor: 'text-emerald-600 dark:text-emerald-400' },
              { step: '03', title: '规模化阶段', duration: '3–6 个月', desc: '建立跨部门智能体协同体系与数据治理框架，多个 Agent 协同工作，建议 Box Pro M 或定制集群，并配套企业培训计划。', cta: '预约部署评估', href: '/deployment', numBg: 'bg-violet-600 dark:bg-violet-500', tagBg: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700', linkColor: 'text-violet-600 dark:text-violet-400' },
            ].map((s) => (
              <div key={s.step} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl ${s.numBg} text-white font-bold text-sm flex items-center justify-center shrink-0`}>{s.step}</div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">{s.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.tagBg}`}>{s.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">{s.desc}</p>
                <a href={s.href} className={`text-sm font-semibold ${s.linkColor} hover:underline`}>{s.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">让您的企业成为下一个成功案例</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">提交基本信息，我们将为您输出行业匹配的部署建议与 ROI 评估。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/deployment" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors">
              预约企业部署评估 →
            </a>
            <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-semibold text-sm transition-colors">
              获取行业解决方案白皮书
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">已服务 8 大行业 · 覆盖小型至大型企业全规模段 · 部署周期最短 1 周</p>
        </div>
      </section>

      {selectedCase && (
        <CaseDetailModal c={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </main>
  );
}

/* ─── 导出（Suspense 包裹 useSearchParams）──────────────────────────────────── */
export default function CasesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-neutral-950" />}>
      <CasesContent />
    </Suspense>
  );
}
