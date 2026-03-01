'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/*
 * ─── 参数映射表 ──────────────────────────────────────────────────────────────
 */
const INDUSTRY_LABEL: Record<string, string> = {
  ecommerce: '电商与零售',
  education: '教育与培训',
  manufacturing: '制造与生产',
  finance: '金融与保险',
  healthcare: '医疗与健康管理',
  tech: '互联网与科技',
  logistics: '物流与供应链',
  professional: '专业服务（律所/咨询/财税）',
};

const SIZE_LABEL: Record<string, string> = {
  'lt150': '小型企业（150 人以内）',
  '150-500': '中型企业（150–500 人）',
  'gt500': '大型企业（500 人以上）',
};

const SCENARIO_LABEL: Record<string, string> = {
  sales: '销售管理',
  service: '客服中心',
  hr: '人力资源',
  finance: '财务管理',
  supply: '供应链管理',
  data: '数据分析',
};

// 规模 → 推荐产品 id 列表（最多 2 个）
const SIZE_TO_PRODUCTS: Record<string, string[]> = {
  'lt150': ['cloud-pro', 'box-pro-s'],
  '150-500': ['box-pro-s', 'box-pro-m'],
  'gt500': ['box-pro-m', 'box-pro-l'],
};

// 产品 id → 展示名称
const PRODUCT_LABEL: Record<string, string> = {
  'cloud-pro': 'Cloud Pro',
  'box-pro-s': 'Box Pro S',
  'box-pro-m': 'Box Pro M',
  'box-pro-l': 'Box Pro L（定制）',
};

// 场景 → 建议文案
const SCENARIO_ADVICE: Record<string, string> = {
  sales: '建议优先部署销售漏斗追踪与线索评分 Skills，通常 2–4 周可完成试点验证。',
  service: '建议优先部署客服自动分流与工单分类 Skills，可在 1–2 周内实现 20–35% 的自动化覆盖率。',
  hr: '建议优先部署简历筛选与离职预警 Skills，HR 团队每月可节省 30–50 小时重复性工作。',
  finance: '建议优先部署报表自动生成与预算追踪 Skills，报表生成时间可缩短 30–45%。',
  supply: '建议优先部署库存预测与采购建议 Skills，库存周转率提升通常在 10–20% 区间。',
  data: '建议优先部署自助数据查询与自动报告 Skills，让非技术人员也能直接获取数据洞察。',
};

function RecommendationContent() {
  const searchParams = useSearchParams();

  const industry = searchParams.get('industry') ?? '';
  const size     = searchParams.get('size') ?? '';
  const scenario = searchParams.get('scenario') ?? '';

  // 没有参数时不渲染
  if (!industry && !size && !scenario) return null;

  const industryLabel  = INDUSTRY_LABEL[industry]  ?? '';
  const sizeLabel      = SIZE_LABEL[size]           ?? '';
  const scenarioLabel  = SCENARIO_LABEL[scenario]   ?? '';
  const products       = SIZE_TO_PRODUCTS[size]     ?? [];
  const scenarioAdvice = SCENARIO_ADVICE[scenario]  ?? '';

  return (
    <div className="mb-10 rounded-2xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6">
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-blue-800 dark:text-blue-200">为您的企业生成的部署建议</h2>
      </div>

      {/* 标签行 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {industryLabel && (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium border border-blue-200 dark:border-blue-700">
            行业：{industryLabel}
          </span>
        )}
        {sizeLabel && (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium border border-blue-200 dark:border-blue-700">
            规模：{sizeLabel.split('（')[0]}
          </span>
        )}
        {scenarioLabel && (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium border border-blue-200 dark:border-blue-700">
            场景：{scenarioLabel}
          </span>
        )}
      </div>

      {/* 建议内容 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 推荐产品 */}
        {products.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">推荐部署方案</div>
            <div className="flex flex-wrap gap-2">
              {products.map((pid) => (
                <a
                  key={pid}
                  href={`#${pid}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  {PRODUCT_LABEL[pid]} ↓
                </a>
              ))}
            </div>
            {sizeLabel && (
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                根据您的企业规模（{sizeLabel.split('（')[0]}），以上方案最适合您的部署需求。
              </p>
            )}
          </div>
        )}

        {/* 场景建议 */}
        {scenarioAdvice && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
              {scenarioLabel} 场景建议
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{scenarioAdvice}</p>
          </div>
        )}
      </div>

      {/* 来源提示 + 清除 */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-blue-600 dark:text-blue-400">
          以上建议来自您浏览的成功案例，基于同类行业与规模的实际部署经验。
        </p>
        <a
          href="/deployment"
          className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline"
        >
          查看全部方案
        </a>
      </div>
    </div>
  );
}

export function DeploymentRecommendation() {
  return (
    <Suspense fallback={null}>
      <RecommendationContent />
    </Suspense>
  );
}
