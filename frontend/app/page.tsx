import Link from 'next/link'
import { ArrowRight, Zap, Brain, Shield, Layers, Code, Globe, Star, Calendar, MapPin, ExternalLink, Package } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockNews, mockSkills, mockHardware, mockEvents, mockBlogs, mockCases } from '@/lib/mock-data'
import { formatDate, getEventStatusLabel, getEventStatusColor } from '@/lib/api'
import { InteractiveParticleBackground } from '@/components/backgrounds/InteractiveParticleBackground'

const coreCapabilities = [
  {
    icon: Brain,
    title: '多模态推理',
    description: '视觉、语音、文本三模态融合，支持复杂场景的跨模态理解与生成。',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Skills 生态',
    description: '500+ 开箱即用技能包，覆盖 20+ 行业场景，一键安装，即插即用。',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: '企业级安全',
    description: '私有化部署，数据不出域，满足金融、政务等高安全级别场景需求。',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: '开放生态',
    description: '兼容主流 AI 框架，支持 100+ 工具集成，构建开放的 AI Agent 生态。',
    color: 'from-orange-500 to-red-500',
  },
]

export default function HomePage() {
  const featuredNews = mockNews.filter(n => n.featured).slice(0, 3)
  const featuredSkills = mockSkills.filter(s => s.featured).slice(0, 4)
  const featuredHardware = mockHardware.filter(h => h.featured).slice(0, 3)
  const upcomingEvents = mockEvents.filter(e => e.status !== 'finished').slice(0, 3)
  const latestBlogs = mockBlogs.slice(0, 3)
  const featuredCases = mockCases.filter(c => c.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section =====
          注意：layout.tsx 中的 <main> 已经有 padding-top: var(--header-height)
          所以这里不需要额外的 padding-top，直接从内容区顶部开始
      */}
      <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Interactive particle canvas - z-index:1, below glow and content */}
        <InteractiveParticleBackground />

        {/* Glow effects - z-index:2 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ zIndex: 2 }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ zIndex: 2, animationDelay: '1s' }} />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 hero-overlay" style={{ zIndex: 3 }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-10 sm:py-14" style={{ zIndex: 10 }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 text-sm text-blue-400 mb-6 sm:mb-8">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs sm:text-sm">面向中国用户的 OpenClaw 生态资源导航站</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6 leading-tight">
            <span className="gradient-text">TokenStar</span>
            <br />
            <span className="dark:text-white text-gray-900">AI星球</span>
          </h1>

          <p className="text-base sm:text-xl dark:text-gray-300 text-gray-600 mb-3 sm:mb-4 max-w-2xl mx-auto leading-relaxed">
            面向中国用户的 OpenClaw 生态资源导航站，聚焦 AI Agent 新闻、教程、Skills、案例、硬件部署与培训活动
          </p>

          <p className="text-sm sm:text-base dark:text-gray-400 text-gray-500 mb-8 sm:mb-10 max-w-xl mx-auto">
            与 10,000+ 开发者一起，探索 AI Agent 的无限可能
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/openclaw"
              className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              了解 OpenClaw
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/skills"
              className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Package className="w-4 h-4" />
              浏览 Skills 市场
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-8 sm:mt-10 flex-wrap">
            {[
              { value: '500+', label: 'Skills 技能包' },
              { value: '10,000+', label: '开发者社区' },
              { value: '200+', label: '企业客户' },
              { value: '20+', label: '行业覆盖' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs dark:text-gray-500 text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 dark:text-gray-500 text-gray-400">
          <span className="text-xs">向下滚动</span>
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* ===== Core Capabilities ===== */}
      <section className="py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-3 section-fade-in">OpenClaw 核心能力</h2>
            <p className="dark:text-gray-400 text-gray-500 text-sm sm:text-base">企业级 AI Agent 平台，赋能各行各业智能化转型</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="glass rounded-xl p-5 sm:p-6 card-hover dark:border-white/5 border-black/5 border hover:border-blue-500/30 text-center"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mx-auto mb-4`}>
                  <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-900 mb-2">{cap.title}</h3>
                <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured News ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6 dark:bg-gradient-to-b dark:from-transparent dark:to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="热门新闻"
            subtitle="OpenClaw 生态最新动态"
            viewAllHref="/news"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredNews.map((item) => (
              <ContentCard
                key={item.id}
                {...item}
                href={`/news/${item.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Skills ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="精选 Skills"
            subtitle="开箱即用的 AI 技能包"
            viewAllHref="/skills"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredSkills.map((skill) => (
              <ContentCard
                key={skill.id}
                {...skill}
                href={`/skills/${skill.slug}`}
                badge={`v${skill.version}`}
                extra={
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-blue-400 font-mono">{skill.version}</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Cases ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6 dark:bg-gradient-to-b dark:from-transparent dark:to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="精选案例"
            subtitle="真实企业落地实践"
            viewAllHref="/cases"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredCases.map((item) => (
              <ContentCard
                key={item.id}
                {...item}
                href={`/cases/${item.slug}`}
                badge={item.category?.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Hardware Section ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="推荐硬件 & 云方案"
            subtitle="从边缘到云端，全场景 AI 部署"
            viewAllHref="/hardware"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredHardware.map((hw) => (
              <div
                key={hw.id}
                className="glass rounded-xl p-4 sm:p-5 card-hover dark:border-white/5 border-black/5 border hover:border-blue-500/30 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="tag-badge">硬件方案</span>
                  {hw.featured && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      推荐
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-900 mb-2">{hw.title}</h3>
                <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-500 line-clamp-2 mb-4 flex-1">{hw.summary}</p>
                <div className="flex items-center gap-2 sm:gap-3 mt-auto pt-3 dark:border-white/5 border-black/5 border-t">
                  <Link
                    href={`/hardware/${hw.slug}`}
                    className="flex-1 text-center py-2 rounded-lg text-xs sm:text-sm dark:text-gray-300 text-gray-600 dark:border-white/10 border-gray-200 border dark:hover:border-white/30 hover:border-gray-400 transition-all"
                  >
                    查看详情
                  </Link>
                  <a
                    href={hw.buy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-1"
                  >
                    立即购买
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Events Section ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6 dark:bg-gradient-to-b dark:from-transparent dark:to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="最新培训活动"
            subtitle="线上线下活动，持续学习成长"
            viewAllHref="/events"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                <div className="glass rounded-xl p-4 sm:p-5 card-hover dark:border-white/5 border-black/5 border hover:border-blue-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-badge">
                      {event.type === 'bootcamp' ? '训练营' : event.type === 'enterprise' ? '企业专场' : '公开活动'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getEventStatusColor(event.status)}`}>
                      {getEventStatusLabel(event.status)}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-900 group-hover:text-blue-500 transition-colors mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatDate(event.start_time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Blog Section ===== */}
      <section className="py-7 sm:py-9 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="最新 Blog"
            subtitle="技术洞察与行业观察"
            viewAllHref="/blog"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {latestBlogs.map((item) => (
              <ContentCard
                key={item.id}
                {...item}
                href={`/blog/${item.slug}`}
                badge={item.category?.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 text-center dark:border-blue-500/20 border-blue-200/50 border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-4">准备好开始了吗？</h2>
              <p className="dark:text-gray-300 text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                加入 TokenStar AI星球社区，与全球开发者一起探索 OpenClaw 的无限可能。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link href="/openclaw" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
                  开始探索
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/events" className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Calendar className="w-4 h-4" />
                  参加培训活动
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
