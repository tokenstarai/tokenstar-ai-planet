import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 | TokenStar (图思达) - 领先的 AI Agent 企业服务商',
  description: '了解 TokenStar (图思达)——您的 AI 转型合作伙伴。我们专注于提供企业级的 AI Agent 解决方案与私有化部署服务，致力于让每一项 AI 创新都能在您的企业中安全、高效地落地。',
  keywords: ['TokenStar', '图思达', '关于我们', 'AI企业服务', 'AI公司', '联系我们', 'OpenClaw合作伙伴', 'AI转型', '企业AI服务商'],
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
