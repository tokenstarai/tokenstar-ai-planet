import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '企业与 AI | 决策者的 AI 认知与转型资源中心',
  description: '专为企业决策者打造的 AI 认知与转型资源中心。涵盖企业 AI 转型三阶段模型、AI 管理指南、Skills 用例库和 OpenClaw 框架解析，用管理语言讲清楚 AI 对企业的真实价值。',
  keywords: ['企业AI', 'AI转型', 'AI认知', '企业决策者', 'AI资源', 'TokenStar', '数字化转型', 'AI管理', '企业智能化'],
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
