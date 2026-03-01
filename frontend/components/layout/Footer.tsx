'use client'
import Link from 'next/link'
import { Github, Twitter, Mail, MessageCircle } from 'lucide-react'
import { LogoIcon } from '@/components/layout/Navbar'
import { useTheme } from '@/components/ThemeProvider'

const footerLinks = {
  '产品': [
    { label: 'OpenClaw 介绍', href: '/openclaw' },
    { label: 'Skills 市场', href: '/skills' },
    { label: '硬件 & 云方案', href: '/hardware' },
    { label: '案例中心', href: '/cases' },
  ],
  '资源': [
    { label: '新闻中心', href: '/news' },
    { label: '知识库', href: '/knowledge' },
    { label: 'Blog', href: '/blog' },
    { label: '培训活动', href: '/events' },
  ],
  '关于': [
    { label: '关于我们', href: '/about' },
    { label: '合作伙伴', href: '/about#partners' },
    { label: '联系我们', href: '/about#contact' },
    { label: '加入我们', href: '/about#join' },
  ],
}

export function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer
      className={`border-t ${isDark ? 'border-white/10 bg-[#0a0a0f]/80' : 'border-gray-200 bg-gray-50'} backdrop-blur-sm`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand — 与顶部 Navbar Logo 完全一致：图标 + TokenStar 单行 */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group" aria-label="TokenStar 首页">
              <LogoIcon size={30} idSuffix="footer" />
              <span
                className="font-extrabold leading-none select-none"
                style={{ fontSize: '19px', letterSpacing: '-0.01em', fontStyle: 'italic' }}
              >
                <span style={{
                  background: isDark ? 'linear-gradient(90deg, #c7d2fe 0%, #a5b4fc 100%)' : 'linear-gradient(90deg, #3730a3 0%, #4338ca 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Token</span>
                <span style={{
                  background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 60%, #10b981 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Star</span>
              </span>
            </Link>
            <p className={`text-sm leading-relaxed mb-5 max-w-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              面向中国用户的 OpenClaw 生态资源导航站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: 'https://github.com/openclaw', icon: Github, label: 'GitHub' },
                { href: 'https://twitter.com/tokenstar_ai', icon: Twitter, label: 'Twitter' },
                { href: 'mailto:contact@tokenstar.ai', icon: Mail, label: 'Email' },
                { href: '#wechat', icon: MessageCircle, label: 'WeChat' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    isDark
                      ? 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                      : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className={`text-sm font-semibold mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className={`border-t mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2026 TokenStar. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {[
              { href: '/privacy', label: '隐私政策' },
              { href: '/terms', label: '服务条款' },
              { href: '/sitemap.xml', label: '站点地图' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-xs transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
