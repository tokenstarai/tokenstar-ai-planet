import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  viewAllHref?: string
  viewAllLabel?: string
}

export function SectionHeader({ title, subtitle, viewAllHref, viewAllLabel = '查看全部' }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900">{title}</h2>
        {subtitle && <p className="dark:text-gray-400 text-gray-500 mt-1 text-xs sm:text-sm">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs sm:text-sm text-blue-500 hover:text-blue-400 transition-colors group shrink-0 ml-4"
        >
          {viewAllLabel}
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
