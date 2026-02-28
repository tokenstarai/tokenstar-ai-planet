import type { Metadata } from 'next'
import Link from 'next/link'
import { Package, Github, Star, ArrowRight, Download } from 'lucide-react'
import { mockSkills } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Skills 市场',
  description: 'OpenClaw Skills 市场，500+ 开箱即用的 AI 技能包，覆盖搜索、代码执行、文档处理、数据库查询等场景。',
}

export default function SkillsPage() {
  const featured = mockSkills.filter(s => s.featured)
  const rest = mockSkills.filter(s => !s.featured)

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-green-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-green-500/30 text-xs text-green-400 mb-4">
            <Package className="w-3 h-3" />
            Skills 市场
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">OpenClaw Skills 市场</h1>
          <p className="text-gray-400 max-w-xl">
            500+ 开箱即用的 AI 技能包，一键安装，即插即用，覆盖 20+ 行业场景。
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-xs text-gray-500">技能包</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">20+</div>
              <div className="text-xs text-gray-500">行业覆盖</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">10K+</div>
              <div className="text-xs text-gray-500">月下载量</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Featured Skills */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              精选 Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* All Skills */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            全部 Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ skill }: { skill: any }) {
  return (
    <div className="glass rounded-xl p-5 card-hover border border-white/5 hover:border-green-500/30 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center">
            <Package className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <span className="text-xs font-mono text-green-400">v{skill.version}</span>
          </div>
        </div>
        {skill.featured && (
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{skill.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">{skill.summary}</p>

      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
        {skill.tags?.slice(0, 2).map((tag: any) => (
          <span key={tag.slug} className="tag-badge text-xs">{tag.name}</span>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Link
          href={`/skills/${skill.slug}`}
          className="flex-1 text-center py-1.5 rounded-lg text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-1"
        >
          查看详情
          <ArrowRight className="w-3 h-3" />
        </Link>
        {skill.repo_link && (
          <a
            href={skill.repo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}
