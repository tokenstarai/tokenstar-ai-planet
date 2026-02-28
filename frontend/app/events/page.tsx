import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import { mockEvents } from '@/lib/mock-data'
import { formatDate, getEventStatusLabel, getEventStatusColor, getEventTypeLabel } from '@/lib/api'

export const metadata: Metadata = {
  title: '培训活动',
  description: 'OpenClaw 培训活动，包括公开课、训练营、企业专场，线上线下全覆盖。',
}

export default function EventsPage() {
  const upcoming = mockEvents.filter(e => e.status !== 'finished')
  const finished = mockEvents.filter(e => e.status === 'finished')

  return (
    <div className="min-h-screen">
      <div className="page-header bg-gradient-to-b from-pink-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-pink-500/30 text-xs text-pink-400 mb-4">
            <Calendar className="w-3 h-3" />
            培训活动
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">培训活动</h1>
          <p className="text-gray-400 max-w-xl">
            线上线下全覆盖，从公开课到企业专场，持续提升 OpenClaw 技能与实战能力。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              即将举办
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Finished Events */}
        {finished.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-gray-500 rounded-full" />
              往期活动
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finished.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block glass rounded-xl p-5 card-hover border border-white/5 hover:border-pink-500/30">
      <div className="flex items-center justify-between mb-3">
        <span className="tag-badge">{getEventTypeLabel(event.type)}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getEventStatusColor(event.status)}`}>
          {getEventStatusLabel(event.status)}
        </span>
      </div>

      <h3 className="text-base font-semibold text-white group-hover:text-pink-400 transition-colors mb-3 line-clamp-2">
        {event.title}
      </h3>

      <p className="text-sm text-gray-400 line-clamp-2 mb-4">{event.summary}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="w-3.5 h-3.5 text-pink-400" />
          <span>{formatDate(event.start_time)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-pink-400" />
          <span>{event.location}</span>
        </div>
        {event.status !== 'finished' && event.signup_deadline && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5 text-yellow-400" />
            <span>报名截止：{formatDate(event.signup_deadline)}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
