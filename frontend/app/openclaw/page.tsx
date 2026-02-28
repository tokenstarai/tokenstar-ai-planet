import type { Metadata } from 'next'
import Link from 'next/link'
import { Zap, Brain, Shield, Globe, Layers, Code, ArrowRight, CheckCircle, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'OpenClaw 介绍',
  description: 'OpenClaw 是新一代企业级 AI Agent 平台，支持多模态推理、Skills 生态、私有化部署，赋能各行各业智能化转型。',
}

const features = [
  {
    icon: Brain,
    title: '多模态推理引擎',
    description: '视觉、语音、文本三模态融合，支持图像理解、语音识别、文档解析，处理复杂跨模态任务。',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Skills 生态系统',
    description: '500+ 开箱即用技能包，覆盖搜索、代码执行、数据库查询、文档处理等核心场景，一键安装。',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: '企业级安全',
    description: '支持私有化部署，数据完全不出域，满足金融、政务等高安全级别场景，通过等保三级认证。',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Code,
    title: '开放 API',
    description: '兼容 OpenAI API 规范，支持 REST/GraphQL，提供完整 SDK，轻松集成到现有系统。',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Globe,
    title: '多语言支持',
    description: '原生支持中文，优化中文语境理解，同时支持英文、日文等 20+ 语言，满足全球化需求。',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: '高性能推理',
    description: '基于 vLLM 优化的推理引擎，支持 INT4/INT8 量化，推理速度比原生提升 3-5 倍。',
    color: 'from-yellow-500 to-amber-500',
  },
]

const advantages = [
  '支持 7B 到 70B+ 全系列模型',
  '推理速度业界领先，P99 延迟 < 2s',
  '99.99% SLA 高可用保障',
  '完整的可观测性与监控体系',
  '支持 Kubernetes 云原生部署',
  '7×24 小时专业技术支持',
  '定期安全审计与漏洞修复',
  '丰富的行业解决方案模板',
]

export default function OpenClawPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 sm:py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 text-sm text-blue-400 mb-8">
            <Zap className="w-3.5 h-3.5" />
            新一代企业级 AI Agent 平台
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            认识 <span className="gradient-text">OpenClaw</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            OpenClaw 是专为企业设计的 AI Agent 平台，将大语言模型的强大能力与企业级工程实践完美结合，
            让 AI 真正落地业务场景，创造可量化的商业价值。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/knowledge/quick-start" className="btn-primary flex items-center gap-2 group">
              快速入门
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/hardware" className="btn-secondary flex items-center gap-2">
              查看部署方案
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">核心功能</h2>
            <p className="text-gray-400">为企业 AI 落地而生的完整能力矩阵</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="glass rounded-xl p-6 card-hover border border-white/5 hover:border-blue-500/30">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-8 sm:py-10 px-4 bg-gradient-to-b from-transparent to-dark-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">技术架构</h2>
            <p className="text-gray-400">分层设计，模块化架构，灵活扩展</p>
          </div>
          <div className="space-y-4">
            {[
              { layer: '应用层', items: ['Web UI', 'API Gateway', 'SDK'], color: 'border-blue-500/40 bg-blue-500/5' },
              { layer: 'Agent 层', items: ['Task Planner', 'Tool Executor', 'Memory Manager', 'Multi-Agent Coordinator'], color: 'border-purple-500/40 bg-purple-500/5' },
              { layer: 'Skills 层', items: ['Web Search', 'Code Executor', 'Document Parser', '500+ Skills'], color: 'border-green-500/40 bg-green-500/5' },
              { layer: '模型层', items: ['LLM Engine', 'Vision Model', 'Speech Model', 'Embedding Model'], color: 'border-orange-500/40 bg-orange-500/5' },
              { layer: '基础设施层', items: ['PostgreSQL', 'Redis', 'MinIO', 'Kubernetes'], color: 'border-gray-500/40 bg-gray-500/5' },
            ].map(({ layer, items, color }) => (
              <div key={layer} className={`rounded-xl p-4 border ${color}`}>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-300 w-24 flex-shrink-0">{layer}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {items.map(item => (
                      <span key={item} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-8 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">为什么选择 OpenClaw？</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                OpenClaw 不仅仅是一个 AI 框架，更是一个完整的企业 AI 落地解决方案，
                从技术到服务，从开发到运营，全程陪伴企业 AI 转型之路。
              </p>
              <ul className="space-y-3">
                {advantages.map(adv => (
                  <li key={adv} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8 border border-blue-500/20">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">200+</div>
                <div className="text-gray-400 text-sm">企业客户信赖之选</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '98.7%', label: 'RAG 检索精度' },
                  { value: '3-5x', label: '推理速度提升' },
                  { value: '60%', label: '平均成本降低' },
                  { value: '99.99%', label: '服务可用性' },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">开始您的 AI 之旅</h2>
          <p className="text-gray-400 mb-8">
            无论您是个人开发者还是大型企业，OpenClaw 都有适合您的解决方案。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/knowledge/quick-start" className="btn-primary flex items-center gap-2 group">
              快速入门指南
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/events" className="btn-secondary">
              参加培训活动
            </Link>
            <Link href="/about" className="btn-outline">
              联系我们
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
