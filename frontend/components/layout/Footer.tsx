import Link from 'next/link'
import { Github, Twitter, Mail, MessageCircle } from 'lucide-react'

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

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="url(#footerGrad1)"/>
      <path d="M16 5 L17.8 12.2 L25 10.5 L20.2 16 L25 21.5 L17.8 19.8 L16 27 L14.2 19.8 L7 21.5 L11.8 16 L7 10.5 L14.2 12.2 Z" fill="white" opacity="0.95"/>
      <circle cx="16" cy="16" r="3" fill="url(#footerGrad2)"/>
      <defs>
        <linearGradient id="footerGrad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="footerGrad2" x1="13" y1="13" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="dark:border-white/10 border-gray-200 border-t dark:bg-[#0a0a0f]/80 bg-white/80 backdrop-blur-sm"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="TokenStar 首页">
              <LogoIcon />
              <div>
                <span className="font-bold dark:text-white text-gray-900 text-sm leading-tight block">TokenStar</span>
                <span className="text-xs text-blue-500 leading-tight block">AI星球</span>
              </div>
            </Link>
            <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed mb-5 max-w-xs">
              OpenClaw 中国生态门户网站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。
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
                  className="w-8 h-8 rounded-lg dark:bg-white/10 bg-gray-100 flex items-center justify-center dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/20 hover:bg-gray-200 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold dark:text-white text-gray-900 mb-3 sm:mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
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
        <div className="dark:border-white/10 border-gray-200 border-t mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs dark:text-gray-500 text-gray-400">
            © 2026 TokenStar · AI星球. All rights reserved.
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
                className="text-xs dark:text-gray-500 text-gray-400 dark:hover:text-gray-300 hover:text-gray-600 transition-colors"
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
