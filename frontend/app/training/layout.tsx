import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 认证与培训 | 企业管理层 AI 认知课程与实战营',
  description: '通过 TokenStar 的 AI 认证与培训项目，快速提升企业 AI 应用能力。提供面向管理层的 AI 认知课程、企业实战训练营和定制化部署支持，帮助企业从认知到落地全程陪跑。',
  keywords: ['AI认证', 'AI培训', '企业AI课程', '管理层AI', 'AI实战营', 'TokenStar', 'OpenClaw培训', 'AI转型培训', '企业数字化'],
}

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children
}
