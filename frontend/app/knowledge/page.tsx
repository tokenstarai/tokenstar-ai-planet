'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, BookOpen, Code2, Server, Brain, Zap } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

// LLM 大模型入口
const LLM_PRODUCTS = [
  {
    name: 'ChatGPT / GPT-4',
    company: 'OpenAI',
    desc: '全球最广泛使用的 LLM，企业 API 接入首选',
    href: 'https://platform.openai.com/docs',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    logoFallback: '🤖',
    tag: '闭源商业',
    tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  {
    name: 'Claude',
    company: 'Anthropic',
    desc: '长上下文、安全对齐能力突出，适合企业合规场景',
    href: 'https://docs.anthropic.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Claude_AI_logo.svg',
    logoFallback: '🧠',
    tag: '闭源商业',
    tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    name: 'Gemini',
    company: 'Google DeepMind',
    desc: '多模态能力强，与 Google Workspace 深度集成',
    href: 'https://ai.google.dev/docs',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    logoFallback: '✨',
    tag: '闭源商业',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  {
    name: 'DeepSeek',
    company: 'DeepSeek AI',
    desc: '国产高性能开源大模型，推理能力突出，成本极低',
    href: 'https://platform.deepseek.com/docs',
    logoFallback: '🐋',
    tag: '开源 / 商业',
    tagColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  },
  {
    name: 'Qwen（通义千问）',
    company: '阿里云',
    desc: '阿里开源大模型，中文理解能力强，支持私有化部署',
    href: 'https://help.aliyun.com/zh/model-studio/',
    logoFallback: '🌐',
    tag: '开源 / 商业',
    tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
  {
    name: 'Llama',
    company: 'Meta AI',
    desc: '全球最流行的开源 LLM，适合私有化部署与微调',
    href: 'https://llama.meta.com/docs/',
    logoFallback: '🦙',
    tag: '开源',
    tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
]

// Agent 框架入口
const AGENT_FRAMEWORKS = [
  {
    name: 'OpenClaw',
    company: 'TokenStar',
    desc: '企业级超级 Agent 平台，支持私有化部署与多 Agent 协作',
    href: '/openclaw',
    isInternal: true,
    logoUrl: '/images/openclaw-lobster.svg',
    logoFallback: '🦞',
    tag: '企业首选',
    tagColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    highlight: true,
  },
  {
    name: 'LangChain',
    company: 'LangChain Inc.',
    desc: '最流行的 LLM 应用开发框架，生态丰富',
    href: 'https://python.langchain.com/docs/',
    logoFallback: '🔗',
    tag: '开源',
    tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  {
    name: 'AutoGen',
    company: 'Microsoft',
    desc: '微软多 Agent 对话框架，支持复杂任务自动化',
    href: 'https://microsoft.github.io/autogen/',
    logoFallback: '🤝',
    tag: '开源',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  },
  {
    name: 'CrewAI',
    company: 'CrewAI',
    desc: '角色化多 Agent 协作框架，适合复杂业务流程',
    href: 'https://docs.crewai.com/',
    logoFallback: '👥',
    tag: '开源',
    tagColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
  {
    name: 'Dify',
    company: 'LangGenius',
    desc: '可视化 LLM 应用开发平台，支持工作流编排',
    href: 'https://docs.dify.ai/',
    logoFallback: '🎨',
    tag: '开源 / 商业',
    tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  },
  {
    name: 'LlamaIndex',
    company: 'LlamaIndex',
    desc: '专注 RAG 与知识库构建的 LLM 数据框架',
    href: 'https://docs.llamaindex.ai/',
    logoFallback: '📚',
    tag: '开源',
    tagColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  },
]

// 基础设施入口
const INFRA_TOOLS = [
  {
    name: 'Ollama',
    company: 'Ollama',
    desc: '本地运行开源大模型的最简工具，一键启动',
    href: 'https://ollama.com/',
    logoFallback: '🏠',
    tag: '本地部署',
    tagColor: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
  {
    name: 'Chroma',
    company: 'Chroma',
    desc: '开源向量数据库，RAG 应用首选',
    href: 'https://docs.trychroma.com/',
    logoFallback: '🗄️',
    tag: '向量数据库',
    tagColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  },
  {
    name: 'Milvus',
    company: 'Zilliz',
    desc: '企业级向量数据库，支持亿级向量检索',
    href: 'https://milvus.io/docs',
    logoFallback: '⚡',
    tag: '向量数据库',
    tagColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  },
  {
    name: 'vLLM',
    company: 'UC Berkeley',
    desc: '高吞吐量 LLM 推理引擎，GPU 利用率极高',
    href: 'https://docs.vllm.ai/',
    logoFallback: '🚀',
    tag: '推理框架',
    tagColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    name: 'Hugging Face',
    company: 'Hugging Face',
    desc: 'AI 模型与数据集的 GitHub，开源生态核心',
    href: 'https://huggingface.co/docs',
    logoFallback: '🤗',
    tag: '模型平台',
    tagColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  {
    name: 'LangSmith',
    company: 'LangChain Inc.',
    desc: 'LLM 应用调试、评估与监控平台',
    href: 'https://docs.smith.langchain.com/',
    logoFallback: '🔍',
    tag: '监控评估',
    tagColor: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  },
]

function ProductCard({ product, isDark, isLarge = false }: { product: any; isDark: boolean; isLarge?: boolean }) {
  const CardWrapper = product.isInternal ? Link : 'a'
  const linkProps = product.isInternal
    ? { href: product.href }
    : { href: product.href, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <CardWrapper
      {...linkProps}
      className={`group flex flex-col p-4 rounded-xl border transition-all hover:shadow-md ${
        product.highlight
          ? isDark
            ? 'bg-red-950/30 border-red-900/50 hover:border-red-700'
            : 'bg-red-50 border-red-200 hover:border-red-300'
          : isDark
            ? 'bg-neutral-800/60 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600'
            : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        {/* Logo */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl overflow-hidden ${
          isDark ? 'bg-neutral-700' : 'bg-neutral-100'
        }`}>
          {product.logoUrl ? (
            <div className="relative w-8 h-8">
              <Image
                src={product.logoUrl}
                alt={product.name}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement?.parentElement
                  if (parent) parent.textContent = product.logoFallback
                }}
              />
            </div>
          ) : (
            <span>{product.logoFallback}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
              {product.name}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${product.tagColor}`}>
              {product.tag}
            </span>
          </div>
          <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            {product.company}
          </div>
        </div>
        <ExternalLink className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-opacity opacity-0 group-hover:opacity-100 ${isDark ? 'text-neutral-400' : 'text-neutral-400'}`} />
      </div>
      <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {product.desc}
      </p>
    </CardWrapper>
  )
}

function SectionTitle({ icon: Icon, title, id, isDark }: { icon: any; title: string; id: string; isDark: boolean }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
        <Icon className={`w-5 h-5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`} />
      </div>
      <h2 className={`text-xl font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
        {title}
      </h2>
    </div>
  )
}

export default function KnowledgePage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>

      {/* Hero */}
      <section className={`py-16 sm:py-20 border-b ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border mb-6 ${isDark ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
            <BookOpen className="w-3.5 h-3.5" />
            知识库
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
            AI 官方文档与开源入口
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-4 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            LLM 大模型 · Agent 框架 · 基础设施工具
          </p>
          <p className={`text-sm max-w-xl mx-auto mb-8 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            精选主流 AI 产品官方文档入口，中文整理，一站直达。
          </p>
          {/* 快速跳转 */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'LLM 大模型', href: '#llm' },
              { label: 'Agent 框架', href: '#agent' },
              { label: '基础设施', href: '#infra' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  isDark
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* LLM 大模型 */}
        <section>
          <SectionTitle icon={Brain} title="LLM 大模型" id="llm" isDark={isDark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LLM_PRODUCTS.map(product => (
              <ProductCard key={product.name} product={product} isDark={isDark} />
            ))}
          </div>
        </section>

        {/* Agent 框架 */}
        <section>
          <SectionTitle icon={Zap} title="Agent 框架" id="agent" isDark={isDark} />
          {/* OpenClaw 高亮展示 */}
          <div className={`mb-4 p-5 rounded-2xl border flex items-center gap-5 ${
            isDark
              ? 'bg-gradient-to-r from-red-950/50 to-orange-950/30 border-red-900/50'
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
          }`}>
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src="/images/openclaw-hero-lobster.svg"
                alt="OpenClaw"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-base font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>OpenClaw</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 font-semibold">企业首选</span>
                <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>by TokenStar</span>
              </div>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                企业级超级 Agent 平台，支持私有化部署、多 Agent 协作与全流程安全合规，是 OpenCLAW + Antigravity 的完整企业解决方案。
              </p>
            </div>
            <Link
              href="/openclaw"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all"
            >
              了解更多 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENT_FRAMEWORKS.filter(f => !f.highlight).map(product => (
              <ProductCard key={product.name} product={product} isDark={isDark} />
            ))}
          </div>
        </section>

        {/* 基础设施 */}
        <section>
          <SectionTitle icon={Server} title="基础设施工具" id="infra" isDark={isDark} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INFRA_TOOLS.map(product => (
              <ProductCard key={product.name} product={product} isDark={isDark} />
            ))}
          </div>
        </section>

        {/* 底部提示 */}
        <div className={`text-center py-8 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            以上均为第三方官方文档链接，TokenStar 持续更新维护。如需推荐新工具，欢迎联系我们。
          </p>
          <Link
            href="/about#contact"
            className={`inline-flex items-center gap-1.5 mt-3 text-sm font-medium ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
          >
            联系我们 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
