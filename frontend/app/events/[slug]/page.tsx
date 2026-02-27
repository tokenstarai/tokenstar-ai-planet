import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react'
import { mockEvents } from '@/lib/mock-data'
import { formatDate, getEventStatusLabel, getEventStatusColor, getEventTypeLabel } from '@/lib/api'
import EventSignupForm from './SignupForm'

export async function generateStaticParams() {
  return mockEvents.map(e => ({ slug: e.slug }))
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = mockEvents.find(e => e.slug === params.slug)
  if (!event) notFound()

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-300">首页</Link>
          <span>/</span>
          <Link href="/events" className="hover:text-gray-300">培训活动</Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-xs">{event.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="glass rounded-2xl p-8 border border-pink-500/20 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="tag-badge">{getEventTypeLabel(event.type)}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getEventStatusColor(event.status)}`}>
                  {getEventStatusLabel(event.status)}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white mb-6">{event.title}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">活动时间</div>
                    <div>{formatDate(event.start_time)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">活动地点</div>
                    <div>{event.location}</div>
                  </div>
                </div>
                {event.signup_deadline && (
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">报名截止</div>
                      <div>{formatDate(event.signup_deadline)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="glass rounded-xl p-5 border border-white/5 mb-8">
              <p className="text-gray-300 leading-relaxed">{event.summary}</p>
            </div>

            {/* Agenda */}
            {event.agenda && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">活动议程</h2>
                <div
                  className="prose-dark glass rounded-xl p-6 border border-white/5"
                  dangerouslySetInnerHTML={{ __html: event.agenda }}
                />
              </div>
            )}

            {/* Recap (for finished events) */}
            {event.status === 'finished' && event.recap_content && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">活动回顾</h2>
                <div
                  className="prose-dark glass rounded-xl p-6 border border-white/5"
                  dangerouslySetInnerHTML={{ __html: event.recap_content }}
                />
              </div>
            )}
          </div>

          {/* Signup Form (Client Component) */}
          <div className="lg:col-span-1">
            <EventSignupForm eventStatus={event.status} eventTitle={event.title} />
          </div>
        </div>

        <div className="mt-12">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回培训活动
          </Link>
        </div>
      </div>
    </div>
  )
}
