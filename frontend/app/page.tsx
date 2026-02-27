import Link from 'next/link'
import { ArrowRight, Zap, Brain, Shield, Layers, Code, Globe, Star, Calendar, MapPin, ExternalLink, Package } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContentCard } from '@/components/ui/ContentCard'
import { mockNews, mockSkills, mockHardware, mockEvents, mockBlogs, mockCases } from '@/lib/mock-data'
import { formatDate, getEventStatusLabel, getEventStatusColor } from '@/lib/api'

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 text-sm text-blue-400 mb-8">
            <Zap className="w-3.5 h-3.5" />
            <span>OpenClaw 中国生态门户 · 正式上线</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="gradient-text">TokenStar</span>
            <br />
            <span className="text-white">AI星球</span>
          </h1>

          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            OpenClaw 中国生态门户，聚焦 AI Agent 新闻、教程、Skills、案例、硬件部署与培训活动
          </p>

          <p className="text-base text-gray-400 mb-10 max-w-xl mx-auto">
            与 10,000+ 开发者一起，探索 AI Agent 的无限可能
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/openclaw"
              className="btn-primary flex items-center gap-2 group"
            >
              了解 OpenClaw
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/skills"
              className="btn-secondary flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              浏览 Skills 市场
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-16 flex-wrap">
            {[
              { value: '500+', label: 'Skills 技能包' },
              { value: '10,000+', label: '开发者社区' },
              { value: '200+', label: '企业客户' },
              { value: '20+', label: '行业覆盖' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs">向下滚动</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">OpenClaw 核心能力</h2>
            <p className="text-gray-400">企业级 AI Agent 平台，赋能各行各业智能化转型</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreCapabilities.map((cap) => (
              <div key={cap.title} className="glass rounded-xl p-6 card-hover border border-white/5 hover:border-blue-500/30 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mx-auto mb-4`}>
                  <cap.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="热门新闻"
            subtitle="OpenClaw 生态最新动态"
            viewAllHref="/news"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Featured Skills */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="精选 Skills"
            subtitle="开箱即用的 AI 技能包"
            viewAllHref="/skills"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Featured Cases */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="精选案例"
            subtitle="真实企业落地实践"
            viewAllHref="/cases"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Hardware Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="推荐硬件 & 云方案"
            subtitle="从边缘到云端，全场景 AI 部署"
            viewAllHref="/hardware"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHardware.map((hw) => (
              <div key={hw.id} className="glass rounded-xl p-5 card-hover border border-white/5 hover:border-blue-500/30 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="tag-badge">硬件方案</span>
                  {hw.featured && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      推荐
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{hw.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{hw.summary}</p>
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                  <Link
                    href={`/hardware/${hw.slug}`}
                    className="flex-1 text-center py-1.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                  >
                    查看详情
                  </Link>
                  <a
                    href={hw.buy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-1"
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

      {/* Events Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="最新培训活动"
            subtitle="线上线下活动，持续学习成长"
            viewAllHref="/events"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                <div className="glass rounded-xl p-5 card-hover border border-white/5 hover:border-blue-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag-badge">{event.type === 'bootcamp' ? '训练营' : event.type === 'enterprise' ? '企业专场' : '公开活动'}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getEventStatusColor(event.status)}`}>
                      {getEventStatusLabel(event.status)}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(event.start_time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="最新 Blog"
            subtitle="技术洞察与行业观察"
            viewAllHref="/blog"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10 text-center border border-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">准备好开始了吗？</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                加入 TokenStar AI星球社区，与全球开发者一起探索 OpenClaw 的无限可能。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/openclaw" className="btn-primary flex items-center gap-2 group">
                  开始探索
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/events" className="btn-secondary flex items-center gap-2">
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
