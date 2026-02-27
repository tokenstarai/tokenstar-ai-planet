import Link from 'next/link'
import { Zap, Github, Twitter, Mail, MessageCircle } from 'lucide-react'

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
  return (
    <footer className="border-t border-white/10 bg-dark-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm leading-tight block">TokenStar</span>
                <span className="text-xs text-blue-400 leading-tight block">AI星球</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              OpenClaw 中国生态门户网站，聚焦 OpenClaw 新闻、教程、Skills、案例、硬件部署方案与培训活动。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/tokenstar_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@tokenstar.ai"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#wechat"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
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
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 TokenStar · AI星球. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              服务条款
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              站点地图
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
