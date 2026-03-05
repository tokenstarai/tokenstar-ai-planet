import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, Target, TrendingUp, Shield, Lightbulb, ChevronRight, ExternalLink, Cpu, Layers, Database } from 'lucide-react'
import { mockBlogs } from '@/lib/mock-data'
import { formatDate } from '@/lib/api'
import { SubtleGridBackground } from '@/components/backgrounds/SubtleGridBackground'

export const metadata: Metadata = {
  title: 'AI 管理指南 | 企业决策者的 AI 战略与转型必读',
  description: '专为企业管理者打造的 AI 管理指南。从战略认知、组织升级到应用规划，获取专家级洞察，理解 AI Agent 如何重塑商业模式，并制定清晰的 AI 转型路线图。',
  keywords: ['AI管理', 'AI战略', '企业AI转型', '数字化转型', 'AI决策', '组织升级', 'TokenStar', 'AI指南', 'AI Agent应用', '管理者AI'],
}

const guideCategories = [
  {
    icon: Brain,
    title: 'AI 战略认知',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    articles: [
      { title: '什么是 AI Agent？管理者必读的 10 分钟入门', href: '/guide/what-is-ai-agent' },
      { title: 'Agent vs RPA vs 传统自动化：三者核心差异', href: '/guide/agent-vs-rpa-vs-automation' },
      { title: '企业 AI 转型的 5 个阶段与关键决策点', href: '/guide/ai-transformation-5-stages' },
      { title: '如何评估企业 AI 成熟度？自测清单', href: '/guide/ai-maturity-assessment' },
    ],
  },
  {
    icon: Target,
    title: '场景选择与规划',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    articles: [
      { title: '哪些业务场景最适合先用 AI Agent？优先级矩阵', href: '/guide/ai-agent-scenario-priority' },
      { title: '从销售到财务：6 大管理场景的 Agent 落地路径', href: '/scenarios' },
      { title: '如何做 AI 项目的 ROI 测算？模板与案例', href: '/guide/ai-roi-calculation' },
      { title: '企业 AI 试点项目的选择标准与避坑指南', href: '/guide/ai-pilot-project-guide' },
    ],
  },
  {
    icon: Shield,
    title: '安全与合规',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    articles: [
      { title: '企业 AI 数据安全的 5 道防线', href: '/guide/ai-data-security-5-layers' },
      { title: '私有化部署 vs 云端：如何选择？', href: '/deployment' },
      { title: '《生成式 AI 管理办法》企业合规要点解读', href: '/guide/generative-ai-compliance-guide' },
      { title: 'AI 使用的内部治理框架：从政策到执行', href: '/guide/ai-governance-framework' },
    ],
  },
  {
    icon: TrendingUp,
    title: '落地与推广',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    articles: [
      { title: '如何推动员工接受并使用 AI 工具？变革管理指南', href: '/guide/ai-change-management' },
      { title: '企业 AI 项目失败的 7 大原因与应对策略', href: '/guide/ai-project-failure-reasons' },
      { title: '从 PoC 到全面推广：AI 项目的规模化路径', href: '/guide/ai-poc-to-scale' },
      { title: '如何建立企业内部的 AI 能力中心？', href: '/guide/ai-coe-building' },
    ],
  },
]

const featuredInsights = [
  {
    title: '2025 年企业 AI Agent 应用白皮书',
    desc: '深度调研 200+ 家企业，揭示 AI Agent 落地的关键成功因素与常见误区。',
    tag: '白皮书',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    href: '/guide/enterprise-ai-agent-whitepaper-2025',
  },
  {
    title: '管理者 AI 素养评估框架',
    desc: '从战略认知、工具应用、团队管理三个维度，帮助管理者评估自身 AI 素养水平。',
    tag: '评估工具',
    tagColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    href: '/guide/manager-ai-literacy-assessment',
  },
  {
    title: 'OpenClaw 企业部署决策树',
    desc: '根据企业规模、行业属性、安全要求，快速找到最适合的部署方案。',
    tag: '决策工具',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    href: '/guide/openclaw-deployment-decision-tree',
  },
]

// 知识库精选外部资源（整合自 /knowledge/ 页面）
const knowledgeResources = [
  {
    category: 'LLM 大模型',
    icon: Brain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    items: [
      { name: 'DeepSeek 开放平台', desc: '国产高性能开源大模型，推理能力突出，成本极低', href: 'https://platform.deepseek.com/docs', tag: '开源/商业' },
      { name: 'Qwen 通义千问', desc: '阿里开源大模型，中文理解能力强，支持私有化部署', href: 'https://help.aliyun.com/zh/model-studio/', tag: '开源/商业' },
      { name: 'OpenAI 开发者文档', desc: '全球最广泛使用的 LLM，企业 API 接入首选', href: 'https://platform.openai.com/docs', tag: '闭源商业' },
      { name: 'Anthropic Claude 文档', desc: '长上下文、安全对齐能力突出，适合企业合规场景', href: 'https://docs.anthropic.com', tag: '闭源商业' },
    ],
  },
  {
    category: 'Agent 框架',
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    items: [
      { name: 'OpenClaw 文档', desc: '企业级超级 Agent 平台，支持私有化部署与多 Agent 协作', href: '/openclaw', tag: '企业首选', isInternal: true },
      { name: 'LangChain 文档', desc: '最流行的 LLM 应用开发框架，生态丰富', href: 'https://python.langchain.com/docs/', tag: '开源' },
      { name: 'Dify 文档', desc: '可视化 LLM 应用开发平台，支持工作流编排', href: 'https://docs.dify.ai/', tag: '开源' },
      { name: 'AutoGen 文档', desc: '微软多 Agent 对话框架，支持复杂任务自动化', href: 'https://microsoft.github.io/autogen/', tag: '开源' },
    ],
  },
  {
    category: '基础设施',
    icon: Database,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    items: [
      { name: 'Ollama', desc: '本地运行开源大模型的最简工具，一键启动', href: 'https://ollama.com/', tag: '开源' },
      { name: 'Milvus 向量数据库', desc: '企业级向量数据库，支持亿级向量检索', href: 'https://milvus.io/docs', tag: '开源' },
      { name: 'vLLM 推理引擎', desc: '高吞吐量 LLM 推理引擎，GPU 利用率极高', href: 'https://docs.vllm.ai/', tag: '开源' },
      { name: 'Hugging Face', desc: 'AI 模型与数据集的 GitHub，开源生态核心', href: 'https://huggingface.co/docs', tag: '开源' },
    ],
  },
]

export default function GuidePage() {
  const latestBlogs = mockBlogs.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="page-header relative overflow-hidden">
        <SubtleGridBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            管理指南
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3">AI 管理指南</h1>
          <p className="dark:text-gray-400 text-gray-600 text-base max-w-xl mx-auto">
            面向企业管理者的 AI 应用知识体系，从战略认知到实操落地，帮助你在 Agent 时代做出正确决策
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* 精选资源 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">精选资源</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredInsights.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${item.tagColor} mb-3 inline-block`}>{item.tag}</span>
                <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-xs dark:text-gray-400 text-gray-500 mb-4">{item.desc}</p>
                <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300">
                  立即查看 <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 指南分类 */}
        <section className="mb-14">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-8">指南分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guideCategories.map(cat => (
              <div key={cat.title} className="glass rounded-2xl p-6 border dark:border-white/8 border-gray-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg ${cat.bg} border ${cat.border}`}>
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="text-base font-bold dark:text-white text-gray-900">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.articles.map(article => (
                    <Link
                      key={article.title}
                      href={article.href}
                      className="flex items-start gap-2 group"
                    >
                      <ArrowRight className={`w-3.5 h-3.5 ${cat.color} shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform`} />
                      <span className="text-sm dark:text-gray-300 text-gray-700 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 知识库：开发者资源入口 */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold dark:text-white text-gray-900">开发者知识库</h2>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">主流 AI 产品的开放接口与开发者文档集合</p>
            </div>
            <Link href="/knowledge" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 shrink-0">
              查看全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {knowledgeResources.map(section => (
              <div key={section.category} className="glass rounded-2xl p-5 border dark:border-white/8 border-gray-200">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`p-1.5 rounded-lg ${section.bg} border ${section.border}`}>
                    <section.icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <h3 className="text-sm font-bold dark:text-white text-gray-900">{section.category}</h3>
                </div>
                <div className="space-y-3">
                  {section.items.map(item => (
                    item.isInternal ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start justify-between gap-2 group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs font-medium dark:text-white text-gray-900 group-hover:text-blue-400 transition-colors truncate">{item.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded dark:bg-red-900/40 bg-red-100 dark:text-red-300 text-red-700 shrink-0">{item.tag}</span>
                          </div>
                          <p className="text-xs dark:text-gray-500 text-gray-400 line-clamp-1">{item.desc}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 dark:text-gray-500 text-gray-400 shrink-0 mt-1 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-2 group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs font-medium dark:text-white text-gray-900 group-hover:text-blue-400 transition-colors truncate">{item.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded dark:bg-gray-800 bg-gray-100 dark:text-gray-400 text-gray-500 shrink-0">{item.tag}</span>
                          </div>
                          <p className="text-xs dark:text-gray-500 text-gray-400 line-clamp-1">{item.desc}</p>
                        </div>
                        <ExternalLink className="w-3 h-3 dark:text-gray-500 text-gray-400 shrink-0 mt-1 group-hover:text-blue-400 transition-colors" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog - 管理者洞察 */}
        {latestBlogs.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">管理者洞察</h2>
              <Link href="/blog" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                查看全部 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {latestBlogs.map(blog => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group glass rounded-xl p-5 border dark:border-white/8 border-gray-200 hover:border-green-500/30 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs dark:text-gray-500 text-gray-400">{formatDate(blog.published_at)}</span>
                  </div>
                  <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs dark:text-gray-400 text-gray-500 line-clamp-3">{blog.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 border dark:border-green-500/20 border-green-200 max-w-2xl mx-auto">
            <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">想要系统学习？</h3>
            <p className="dark:text-gray-400 text-gray-600 text-sm mb-6">参加我们的企业培训课程，在专家指导下系统掌握 AI 管理知识与实操技能。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/training" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all">
                查看培训课程 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border dark:border-white/20 border-gray-300 dark:text-white text-gray-700 font-semibold text-sm transition-all dark:hover:bg-white/8 hover:bg-gray-50">
                联系专家顾问
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
