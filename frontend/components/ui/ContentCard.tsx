import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/api'

interface ContentCardProps {
  title: string
  slug: string
  summary?: string
  cover_image?: any
  published_at?: string
  category?: { name: string; slug: string }
  tags?: { name: string; slug: string }[]
  featured?: boolean
  href: string
  type?: string
  badge?: string
  extra?: React.ReactNode
}

export function ContentCard({
  title,
  summary,
  published_at,
  category,
  tags,
  featured,
  href,
  badge,
  extra,
}: ContentCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="glass rounded-xl p-4 sm:p-5 card-hover dark:border-white/5 border-black/5 border hover:border-blue-500/30 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                推荐
              </span>
            )}
            {badge && (
              <span className="tag-badge">{badge}</span>
            )}
            {category && (
              <span className="tag-badge">{category.name}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold dark:text-white text-gray-900 group-hover:text-blue-500 transition-colors line-clamp-2 mb-2 flex-1">
          {title}
        </h3>

        {/* Summary */}
        {summary && (
          <p className="text-xs sm:text-sm dark:text-gray-400 text-gray-500 line-clamp-2 mb-3 sm:mb-4">
            {summary}
          </p>
        )}

        {/* Extra content */}
        {extra && <div className="mb-3">{extra}</div>}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 dark:border-white/5 border-gray-100 border-t">
          <div className="flex items-center gap-3">
            {published_at && (
              <span className="flex items-center gap-1 text-xs dark:text-gray-500 text-gray-400">
                <Calendar className="w-3 h-3" />
                {formatDate(published_at)}
              </span>
            )}
            {tags && tags.length > 0 && (
              <span className="flex items-center gap-1 text-xs dark:text-gray-500 text-gray-400">
                <Tag className="w-3 h-3" />
                {tags[0].name}
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 dark:text-gray-500 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  )
}
