import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PWAUpdateToast } from '@/components/pwa/PWAUpdateToast'
import { DynamicThemeColor } from '@/components/pwa/DynamicThemeColor'

export const metadata: Metadata = {
  title: {
    default: 'TokenStar | 面向中国用户的 OpenClaw 生态资源导航站',
    template: '%s | TokenStar',
  },
  description: 'TokenStar 是面向中国用户的 OpenClaw 生态资源导航站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。',
  keywords: ['OpenClaw', 'AI Agent', 'TokenStar', 'AI星球', 'Skills', 'AI部署', '大模型'],
  authors: [{ name: 'TokenStar Team' }],
  creator: 'TokenStar',
  publisher: 'TokenStar',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName: 'TokenStar',
    title: 'TokenStar | 面向中国用户的 OpenClaw 生态资源导航站',
    description: '面向中国用户的 OpenClaw 生态资源导航站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TokenStar',
    description: '面向中国用户的 OpenClaw 生态资源导航站',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // 支持 iOS 刘海屏 safe-area
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
    { media: '(prefers-color-scheme: light)', color: '#F4F6FA' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* iOS PWA 专项适配 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TokenStar" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Android / Windows PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="TokenStar" />
        <meta name="msapplication-TileColor" content="#0B1220" />
        <meta name="msapplication-TileImage" content="/icons/icon-192.png" />

        {/* 防止主题闪烁的内联脚本（同步更新 theme-color meta） */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('tokenstar_theme');
                  var isManual = localStorage.getItem('tokenstar_theme_manual') === 'true';
                  var theme;
                  if (saved && isManual) {
                    theme = saved;
                  } else {
                    var hour = new Date().getHours();
                    theme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
                  }
                  document.documentElement.classList.add(theme);
                  // 同步更新 theme-color meta（PWA 状态栏颜色）
                  try {
                    var tcMeta = document.querySelector('meta[name="theme-color"]');
                    if (!tcMeta) {
                      tcMeta = document.createElement('meta');
                      tcMeta.setAttribute('name', 'theme-color');
                      document.head.appendChild(tcMeta);
                    }
                    tcMeta.setAttribute('content', theme === 'dark' ? '#0B1220' : '#F4F6FA');
                  } catch(e2) {}
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {/* 动态 theme-color：跟随用户主题切换实时更新 meta */}
          <DynamicThemeColor />
          {/* PWA 更新提示 Toast */}
          <PWAUpdateToast />
          <Navbar />
          {/*
            修复叠压：header 高度 = 64px (h-16) + safe-area-inset-top
            使用 CSS 变量 --header-height 统一管理，在 globals.css 中定义
          */}
          <main
            className="flex-1"
            style={{ paddingTop: 'var(--header-height)' }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
