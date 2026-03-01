import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Server, Cloud, Smartphone, CheckCircle, Shield, Zap, Users, HelpCircle } from 'lucide-react'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'
import { ROICalculator } from '@/components/deployment/ROICalculator'
import { ConsultationForm } from '@/components/deployment/ConsultationForm'
import { DeploymentRecommendation } from '@/components/deployment/DeploymentRecommendation'

export const metadata: Metadata = {
  title: 'OpenClaw 企业智能部署解决方案 - TokenStar',
  description: '三种企业级部署路径，让企业在 1–3 天内拥有可运行的超级管理智能体系统。Box Pro 私有化部署、Cloud 云端部署、Workstation 智能终端。',
}

// ─── Box Pro 产品数据 ────────────────────────────────────────────────────────
const boxProProducts = [
  {
    id: 'box-pro-s',
    name: 'Box Pro S',
    subtitle: '入门企业版',
    color: 'border-green-500/40',
    badgeColor: 'bg-green-500/15 text-green-400 border-green-500/30',
    badge: '入门推荐',
    scale: '50–150 人',
    price: '¥68,000 – ¥98,000',
    priceNote: '一次性采购',
    cta: '立即购买',
    ctaStyle: 'bg-green-600 hover:bg-green-500',
    scenarios: ['客服自动化', '企业知识库问答', '销售线索整理', 'HR 简历筛选'],
    hardware: [
      { label: 'GPU', value: 'NVIDIA RTX A5000 24GB' },
      { label: 'CPU', value: '16 核 Xeon / EPYC' },
      { label: '内存', value: '128GB ECC' },
      { label: '存储', value: '2TB NVMe + 4TB SATA' },
      { label: '网络', value: '双千兆网口' },
      { label: '机架', value: '2U 企业服务器' },
    ],
    software: ['OpenClaw 企业版', '兼容主流开源 LLM', '10 个核心 Skills 预配置', '管理控制台', 'API 接口', '日志监控'],
    services: ['远程或上门部署', '初始模型优化', '企业数据接入指导', '3 个月技术支持', '企业管理员培训 1 场'],
  },
  {
    id: 'box-pro-m',
    name: 'Box Pro M',
    subtitle: '成长企业版',
    color: 'border-blue-500/40',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    badge: '最受欢迎',
    scale: '150–500 人',
    price: '¥168,000 – ¥260,000',
    priceNote: '一次性采购',
    cta: '立即购买',
    ctaStyle: 'bg-blue-600 hover:bg-blue-500',
    scenarios: ['多部门 AI 协同', '企业数据分析', '销售全流程自动化', '供应链智能管理'],
    hardware: [
      { label: 'GPU', value: 'NVIDIA A800 80GB' },
      { label: 'CPU', value: '32 核双路' },
      { label: '内存', value: '256GB' },
      { label: '存储', value: '4TB NVMe + 8TB RAID' },
      { label: '网络', value: '双 10G 网口' },
      { label: '机架', value: '4U 企业服务器' },
    ],
    software: ['多模型并发支持', '20+ Skills 预配置', '企业 SSO 对接', 'API 扩展能力', '高可用集群', '多租户管理'],
    services: ['企业部署方案设计', '数据隔离配置', '部门级使用培训', '6 个月技术支持', '季度巡检服务'],
  },
  {
    id: 'box-pro-l',
    name: 'Box Pro L',
    subtitle: '大型企业定制',
    color: 'border-purple-500/40',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    badge: '定制方案',
    scale: '500+ 人',
    price: '¥350,000 起',
    priceNote: '定制报价',
    cta: '预约部署评估',
    ctaStyle: 'bg-purple-600 hover:bg-purple-500',
    scenarios: ['集团级 AI 中台', '多地多分支部署', '行业专属模型定制', '全链路智能化改造'],
    hardware: [
      { label: '架构', value: '双 GPU 集群架构' },
      { label: '可用性', value: '高可用部署（99.9%）' },
      { label: '数据', value: '企业级数据隔离' },
      { label: '模型', value: '模型定制支持' },
      { label: '扩展', value: '水平扩展架构' },
      { label: '支持', value: '专属技术支持团队' },
    ],
    software: ['全功能企业版', '无限 Skills 扩展', '专属模型微调', '多集群管理', '企业级安全审计', '合规报告生成'],
    services: ['专属解决方案架构师', '驻场部署支持', '全员培训体系', '12 个月技术支持', '7×24 紧急响应'],
  },
]

// ─── Cloud 产品数据 ──────────────────────────────────────────────────────────
const cloudProducts = [
  {
    id: 'cloud-starter',
    name: 'Cloud Starter',
    price: '¥399 / 月起',
    hardware: [
      { label: 'CPU', value: '2 核起' },
      { label: '内存', value: '2GB 起' },
      { label: '带宽', value: '2M 起' },
      { label: '存储', value: '50GB 起' },
    ],
    platforms: ['AWS', '阿里云', '腾讯云', '华为云', '火山引擎'],
    software: ['OpenClaw 轻量版', '基础 LLM 支持', '5 个核心 Skills', '控制台管理界面'],
    scenarios: ['企业试点', '培训环境', '部门实验'],
    ctaStyle: 'border dark:border-blue-500/40 border-blue-400 dark:text-blue-400 text-blue-600 dark:hover:bg-blue-500/10 hover:bg-blue-50',
  },
  {
    id: 'cloud-pro',
    name: 'Cloud Pro',
    price: '¥2,999 / 月起',
    hardware: [
      { label: 'CPU', value: '8 核起' },
      { label: '内存', value: '16GB 起' },
      { label: 'GPU', value: '支持 GPU 加速' },
      { label: '并发', value: '支持多部门并发' },
    ],
    platforms: ['AWS', '阿里云', '腾讯云', '华为云', '火山引擎'],
    software: ['OpenClaw 企业版', '多模型支持', '20+ Skills', 'API 扩展能力'],
    scenarios: ['正式生产环境', '多部门协同', '企业级应用'],
    ctaStyle: 'bg-blue-600 hover:bg-blue-500 text-white',
  },
]

// ─── Workstation 产品数据 ────────────────────────────────────────────────────
const workstationProducts = [
  {
    id: 'ws-iphone',
    name: 'iPhone 版本',
    icon: Smartphone,
    models: [
      { name: 'iPhone 14 Pro – 17 Pro', price: '¥3,999 起' },
      { name: 'iPhone 14 Pro Max – 17 Pro Max', price: '¥4,999 起' },
    ],
    software: ['OpenClaw 移动管理端', '企业智能助手', 'Skills 快捷调用', '企业数据安全访问'],
    targets: ['企业管理层', '销售团队', '外勤人员'],
  },
  {
    id: 'ws-mac',
    name: 'Mac mini 版本',
    icon: Server,
    models: [
      { name: 'M2 / 8GB / 256GB（基础版）', price: '¥2,999 起' },
      { name: 'M2 Pro / 16GB / 512GB（标准版）', price: '¥6,999 起' },
      { name: 'M3 Pro / 32GB / 1TB（高配版）', price: '¥12,999 起' },
    ],
    software: ['OpenClaw 桌面端', '本地模型推理', '企业 Skills 套件', '数据本地化处理'],
    targets: ['企业 AI 管理员', '技术负责人', '数据分析人员'],
  },
]

// ─── 统一服务承诺 ────────────────────────────────────────────────────────────
const serviceCommitments = [
  { icon: Zap, title: '部署指导', desc: '专业工程师全程陪同，确保系统顺利上线' },
  { icon: Shield, title: '模型与 Skills 预配置', desc: '开箱即用，核心场景 Skills 预先调优' },
  { icon: Users, title: '企业使用培训', desc: '管理员培训 + 员工使用指南，快速上手' },
  { icon: CheckCircle, title: '技术支持', desc: '专属技术支持团队，问题快速响应' },
  { icon: ArrowRight, title: '升级建议', desc: '定期评估使用情况，提供最优升级路径' },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q: '是否支持私有模型？', a: '支持企业自行选择授权模型部署，包括主流开源模型（Llama、Qwen、DeepSeek 等）及商业模型。' },
  { q: '是否支持企业内部数据接入？', a: '支持数据库（MySQL、PostgreSQL、MongoDB 等）、文件系统（本地/NAS/OSS）及 API 对接，数据不出企业内网。' },
  { q: '是否提供长期运维支持？', a: '可提供年度技术支持服务，包含季度巡检、版本升级指导、紧急故障响应（4 小时内响应）。' },
  { q: '是否支持定制开发？', a: '支持企业定制 Skills 与系统对接，我们的技术团队可根据企业业务流程开发专属 Skills 模块。' },
  { q: '部署周期一般多长？', a: 'Cloud 方案最快 1 天内完成；Box Pro S/M 一般 3–7 个工作日；Box Pro L 大型定制项目视规模而定，通常 2–4 周。' },
  { q: '数据安全如何保障？', a: '私有化部署方案数据完全不出企业内网；云端方案采用端到端加密传输，符合等保 2.0 三级要求。' },
]

export default function DeploymentPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4
            dark:bg-blue-500/15 dark:text-blue-400 dark:border dark:border-blue-500/30
            bg-blue-50 text-blue-600 border border-blue-200">
            <Server className="w-3.5 h-3.5" />
            企业级部署解决方案
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-4 leading-tight">
            OpenClaw 企业智能部署解决方案
          </h1>
          <p className="text-base sm:text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            三种企业级部署路径，让企业在 1–3 天内拥有可运行的超级管理智能体系统。
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* ── 个性化建议模块（来自 /cases 参数跳转）── */}
        <DeploymentRecommendation />

        {/* ── 模块一：部署路径总览 ── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">三种部署路径</h2>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">根据企业规模、安全要求与预算，选择最适合的部署方式。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Server, color: 'text-green-400', bg: 'dark:bg-green-500/10 bg-green-50', border: 'dark:border-green-500/30 border-green-200', title: '私有化部署', sub: 'OpenClaw Box Pro', desc: '适合对数据安全要求高、计划长期使用 AI 的企业。' },
              { icon: Cloud, color: 'text-blue-400', bg: 'dark:bg-blue-500/10 bg-blue-50', border: 'dark:border-blue-500/30 border-blue-200', title: '云端部署', sub: 'OpenClaw Cloud', desc: '适合希望快速上线、轻资产试点的企业。' },
              { icon: Smartphone, color: 'text-purple-400', bg: 'dark:bg-purple-500/10 bg-purple-50', border: 'dark:border-purple-500/30 border-purple-200', title: '员工智能终端', sub: 'OpenClaw Workstation', desc: '为管理层与业务人员提供随时可用的智能助手终端。' },
            ].map((item) => (
              <div key={item.title} className={`glass rounded-xl p-5 border ${item.border} flex flex-col gap-3`}>
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="text-xs dark:text-gray-500 text-gray-400 mb-0.5">{item.sub}</div>
                  <h3 className="font-semibold dark:text-white text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm dark:text-gray-400 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 模块二：Box Pro 产品体系 ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-5 h-5 dark:text-green-400 text-green-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">OpenClaw Box Pro 产品体系</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">企业级私有智能体一体化服务器 · 预装 OpenClaw + LLM + Skills · 开箱即用 · 一键启动 · 数据不出企业</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {boxProProducts.map((product) => (
              <div key={product.id} className={`glass rounded-2xl border ${product.color} flex flex-col overflow-hidden`}>
                {/* 产品头部 */}
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${product.badgeColor}`}>{product.badge}</span>
                    <span className="text-xs dark:text-gray-400 text-gray-500">适用 {product.scale}</span>
                  </div>
                  <h3 className="text-lg font-bold dark:text-white text-gray-900">{product.name}</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-500">{product.subtitle}</p>
                  <div className="mt-3">
                    <div className="text-xl font-bold dark:text-white text-gray-900">{product.price}</div>
                    <div className="text-xs dark:text-gray-500 text-gray-400">{product.priceNote}</div>
                  </div>
                </div>

                {/* 推荐场景 */}
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">推荐应用场景</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.scenarios.map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>

                {/* 硬件配置 */}
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-3">硬件配置</div>
                  <div className="space-y-1.5">
                    {product.hardware.map(h => (
                      <div key={h.label} className="flex items-center justify-between text-xs">
                        <span className="dark:text-gray-500 text-gray-400">{h.label}</span>
                        <span className="dark:text-gray-200 text-gray-700 font-medium text-right max-w-[60%]">{h.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 软件预装 */}
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">软件预装</div>
                  <ul className="space-y-1">
                    {product.software.map(s => (
                      <li key={s} className="flex items-center gap-1.5 text-xs dark:text-gray-300 text-gray-600">
                        <CheckCircle className="w-3 h-3 dark:text-green-400 text-green-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 服务内容 */}
                <div className="p-5 flex-1">
                  <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">服务内容</div>
                  <ul className="space-y-1">
                    {product.services.map(s => (
                      <li key={s} className="flex items-center gap-1.5 text-xs dark:text-gray-300 text-gray-600">
                        <CheckCircle className="w-3 h-3 dark:text-blue-400 text-blue-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-5 pt-0">
                  <a href="#consultation-form" className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${product.ctaStyle}`}>
                    {product.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 模块三：Cloud 方案 ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-5 h-5 dark:text-blue-400 text-blue-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">OpenClaw Cloud 方案</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">无需采购硬件 · 1 天内完成部署 · 适合企业试点与快速上线</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudProducts.map((product) => (
              <div key={product.id} className="glass rounded-2xl border dark:border-white/8 border-gray-200 overflow-hidden">
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{product.name}</h3>
                  <div className="text-2xl font-bold dark:text-blue-400 text-blue-600">{product.price}</div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">规格配置</div>
                    <div className="space-y-1.5">
                      {product.hardware.map(h => (
                        <div key={h.label} className="flex items-center justify-between text-xs">
                          <span className="dark:text-gray-500 text-gray-400">{h.label}</span>
                          <span className="dark:text-gray-200 text-gray-700 font-medium">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">软件功能</div>
                    <ul className="space-y-1">
                      {product.software.map(s => (
                        <li key={s} className="flex items-center gap-1.5 text-xs dark:text-gray-300 text-gray-600">
                          <CheckCircle className="w-3 h-3 dark:text-green-400 text-green-500 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-4">
                  <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">支持镜像平台</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.platforms.map(p => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600">{p}</span>
                    ))}
                  </div>
                  <a href="#consultation-form" className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${product.ctaStyle}`}>
                    立即咨询
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 模块四：Workstation 终端 ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-2">
            <Smartphone className="w-5 h-5 dark:text-purple-400 text-purple-600" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">OpenClaw Workstation 终端</h2>
          </div>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">为企业管理者与核心员工提供随时可用的智能助手终端。</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workstationProducts.map((product) => (
              <div key={product.id} className="glass rounded-2xl border dark:border-purple-500/30 border-purple-200 overflow-hidden">
                <div className="p-5 border-b dark:border-white/8 border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <product.icon className="w-5 h-5 dark:text-purple-400 text-purple-600" />
                    <h3 className="text-lg font-bold dark:text-white text-gray-900">{product.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {product.models.map(m => (
                      <div key={m.name} className="flex items-center justify-between">
                        <span className="text-sm dark:text-gray-300 text-gray-600">{m.name}</span>
                        <span className="text-sm font-semibold dark:text-white text-gray-900">{m.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">软件支持</div>
                    <ul className="space-y-1">
                      {product.software.map(s => (
                        <li key={s} className="flex items-center gap-1.5 text-xs dark:text-gray-300 text-gray-600">
                          <CheckCircle className="w-3 h-3 dark:text-purple-400 text-purple-500 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold dark:text-gray-400 text-gray-500 uppercase tracking-wide mb-2">适用对象</div>
                    <ul className="space-y-1">
                      {product.targets.map(t => (
                        <li key={t} className="flex items-center gap-1.5 text-xs dark:text-gray-300 text-gray-600">
                          <Users className="w-3 h-3 dark:text-gray-500 text-gray-400 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <a href="#consultation-form" className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all">
                    立即咨询
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 模块五：统一服务承诺 ── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">所有产品统一服务承诺</h2>
          <p className="dark:text-gray-400 text-gray-500 text-sm mb-6">无论您选择哪种部署方式，以下服务均包含在内。</p>
          <div className="glass rounded-2xl border dark:border-white/8 border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {serviceCommitments.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center gap-2 p-3">
                  <div className="w-10 h-10 rounded-xl dark:bg-blue-500/15 bg-blue-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 dark:text-blue-400 text-blue-600" />
                  </div>
                  <div className="text-sm font-semibold dark:text-white text-gray-900">{item.title}</div>
                  <div className="text-xs dark:text-gray-400 text-gray-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 模块六：ROI 测算（客户端组件） ── */}
        <ROICalculator />

        {/* ── 模块七：咨询表单（客户端组件） ── */}
        <ConsultationForm />

        {/* ── 模块八：FAQ ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 dark:text-gray-400 text-gray-500" />
            <h2 className="text-xl font-bold dark:text-white text-gray-900">常见问题</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl border dark:border-white/8 border-gray-200 p-5">
                <div className="text-sm font-semibold dark:text-white text-gray-900 mb-2">Q：{faq.q}</div>
                <div className="text-sm dark:text-gray-400 text-gray-600">A：{faq.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 底部强 CTA ── */}
        <section>
          <div className="glass rounded-2xl border dark:border-blue-500/20 border-blue-200 p-8 text-center">
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-3">开启企业智能化升级</h2>
            <p className="dark:text-gray-400 text-gray-500 text-sm mb-6 max-w-xl mx-auto">
              专业技术顾问为您量身定制部署方案，从选型到上线全程支持。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#consultation-form" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all">
                预约企业部署评估 <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border dark:border-white/20 border-gray-300 dark:text-white text-gray-700 dark:hover:bg-white/5 hover:bg-gray-50 font-semibold text-sm transition-all">
                联系我们
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
