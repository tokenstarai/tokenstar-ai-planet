import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 成功案例 | 各行业企业智能化转型实践',
  description: '查看来自金融、制造、零售等行业的真实 AI 成功案例。了解不同规模的企业如何通过 TokenStar 的解决方案实现降本增效、优化决策，并成功迈出 AI 转型的第一步。',
  keywords: ['AI成功案例', '企业AI转型', '智能化实践', '客户案例', 'TokenStar', 'OpenClaw应用', '降本增效', '行业AI', '智能体落地'],
}

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children
}
