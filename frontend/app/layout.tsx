import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'TokenStar · AI星球 | OpenClaw 中国生态门户',
    template: '%s | TokenStar · AI星球',
  },
  description: 'TokenStar AI星球是 OpenClaw 中国生态门户网站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。',
  keywords: ['OpenClaw', 'AI Agent', 'TokenStar', 'AI星球', 'Skills', 'AI部署', '大模型'],
  authors: [{ name: 'TokenStar Team' }],
  creator: 'TokenStar',
  publisher: 'TokenStar',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName: 'TokenStar · AI星球',
    title: 'TokenStar · AI星球 | OpenClaw 中国生态门户',
    description: 'OpenClaw 中国生态门户网站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TokenStar · AI星球',
    description: 'OpenClaw 中国生态门户网站',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
