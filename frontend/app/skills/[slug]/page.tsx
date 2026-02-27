import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Package, Github, ArrowLeft, Copy, Download, Star, Tag } from 'lucide-react'
import { mockSkills } from '@/lib/mock-data'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = mockSkills.find(s => s.slug === params.slug)
  if (!item) return { title: 'Skill 未找到' }
  return { title: `${item.title} - OpenClaw Skills`, description: item.summary }
}

export async function generateStaticParams() {
  return mockSkills.map(s => ({ slug: s.slug }))
}

export default function SkillDetailPage({ params }: Props) {
  const item = mockSkills.find(s => s.slug === params.slug)
  if (!item) notFound()

  const related = mockSkills.filter(s => s.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <span>/</span>
          <Link href="/skills" className="hover:text-gray-300">Skills 市场</Link>
          <span>/</span>
          <span className="text-gray-300">{item.title}</span>
        </div>

        {/* Header */}
        <div className="glass rounded-2xl p-8 border border-green-500/20 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                <Package className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{item.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-mono text-green-400">v{item.version}</span>
                  {item.featured && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      精选
                    </span>
                  )}
                </div>
              </div>
            </div>
            {item.repo_link && (
              <a
                href={item.repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass border border-white/20 hover:border-white/40 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">{item.summary}</p>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {item.tags?.map((tag: any) => (
              <span key={tag.slug} className="tag-badge">{tag.name}</span>
            ))}
          </div>

          {/* Install Command */}
          <div className="mt-6 p-4 bg-black/40 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">安装命令</span>
              <button className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
                <Copy className="w-3 h-3" />
                复制
              </button>
            </div>
            <code className="text-sm text-green-400 font-mono">
              openclaw skill install {item.slug}
            </code>
          </div>
        </div>

        {/* Install Guide */}
        {item.install_guide && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-green-400" />
              安装指南
            </h2>
            <div
              className="prose-dark glass rounded-xl p-6 border border-white/5"
              dangerouslySetInnerHTML={{ __html: item.install_guide }}
            />
          </div>
        )}

        {/* Usage Examples */}
        {item.usage_examples && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">使用示例</h2>
            <div
              className="prose-dark glass rounded-xl p-6 border border-white/5"
              dangerouslySetInnerHTML={{ __html: item.usage_examples }}
            />
          </div>
        )}

        {/* Related Skills */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-6">相关 Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.id} href={`/skills/${r.slug}`} className="group block glass rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-mono text-green-400">v{r.version}</span>
                  </div>
                  <h4 className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">{r.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/skills" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回 Skills 市场
          </Link>
        </div>
      </div>
    </div>
  )
}
