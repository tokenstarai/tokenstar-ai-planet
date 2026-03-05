import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '知识库 | AI 开发者资源与技术参考中心',
  description: 'TokenStar 知识库汇聚 AI 开发者必备资源，包括主流 LLM 大模型入口、Agent 框架对比、基础设施工具和最佳实践，帮助企业技术团队高效构建 AI 应用。',
  keywords: ['AI知识库', 'LLM大模型', 'Agent框架', 'AI开发资源', 'TokenStar', 'OpenClaw', 'AI基础设施', '开发者工具', 'AI技术参考'],
}

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return children
}
