import { News, KnowledgeBase, Blog, Case, Skill, Hardware, Event, Signup, Category, Tag } from '@/types'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'
const PAYLOAD_TOKEN = process.env.PAYLOAD_API_TOKEN || ''

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${PAYLOAD_URL}/api${endpoint}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(PAYLOAD_TOKEN ? { Authorization: `Bearer ${PAYLOAD_TOKEN}` } : {}),
    ...options.headers,
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for ${url}`)
      return null as T
    }

    return res.json()
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error)
    return null as T
  }
}

// ==================== News ====================
export async function getNewsList(params?: {
  page?: number
  pageSize?: number
  featured?: boolean
  categorySlug?: string
}) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')
  if (params?.categorySlug) qs.set('where[category.slug][equals]', params.categorySlug)

  return fetchAPI<any>(`/news?${qs}`)
}

export async function getNewsDetail(slug: string) {
  return fetchAPI<any>(`/news?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Knowledge Base ====================
export async function getKnowledgeList(params?: { page?: number; pageSize?: number; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/knowledge-base?${qs}`)
}

export async function getKnowledgeDetail(slug: string) {
  return fetchAPI<any>(`/knowledge-base?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Blog ====================
export async function getBlogList(params?: { page?: number; pageSize?: number; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/blogs?${qs}`)
}

export async function getBlogDetail(slug: string) {
  return fetchAPI<any>(`/blogs?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Cases ====================
export async function getCaseList(params?: { page?: number; pageSize?: number; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/cases?${qs}`)
}

export async function getCaseDetail(slug: string) {
  return fetchAPI<any>(`/cases?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Skills ====================
export async function getSkillList(params?: { page?: number; pageSize?: number; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/skills?${qs}`)
}

export async function getSkillDetail(slug: string) {
  return fetchAPI<any>(`/skills?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Hardware ====================
export async function getHardwareList(params?: { page?: number; pageSize?: number; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', '-publishedAt')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/hardware?${qs}`)
}

export async function getHardwareDetail(slug: string) {
  return fetchAPI<any>(`/hardware?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Events ====================
export async function getEventList(params?: { page?: number; pageSize?: number; status?: string; featured?: boolean }) {
  const qs = new URLSearchParams()
  qs.set('depth', '1')
  qs.set('sort', 'startTime')
  if (params?.page) qs.set('page', String(params.page))
  if (params?.pageSize) qs.set('limit', String(params.pageSize))
  if (params?.status) qs.set('where[status][equals]', params.status)
  if (params?.featured) qs.set('where[featured][equals]', 'true')

  return fetchAPI<any>(`/events?${qs}`)
}

export async function getEventDetail(slug: string) {
  return fetchAPI<any>(`/events?where[slug][equals]=${slug}&depth=2`)
}

// ==================== Signup ====================
export async function createSignup(data: Partial<Signup>) {
  return fetchAPI<any>('/signups', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ==================== Categories ====================
export async function getCategories(typeScope?: string) {
  const qs = typeScope ? `?where[typeScope][equals]=${typeScope}&sort=order` : '?sort=order'
  return fetchAPI<any>(`/categories${qs}`)
}

// ==================== Tags ====================
export async function getTags(typeScope?: string) {
  const qs = typeScope ? `?where[typeScope][equals]=${typeScope}` : ''
  return fetchAPI<any>(`/tags${qs}`)
}

// ==================== Helpers ====================
export function getImageUrl(image?: any): string {
  if (!image) return '/images/placeholder.jpg'
  const url = image?.url || image?.filename
  if (!url) return '/images/placeholder.jpg'
  if (url.startsWith('http')) return url
  return `${PAYLOAD_URL}${url}`
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function formatDateTime(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

export function getEventStatusLabel(status: string): string {
  const map: Record<string, string> = {
    upcoming: '即将开始',
    open: '报名中',
    finished: '已结束',
  }
  return map[status] || status
}

export function getEventStatusColor(status: string): string {
  const map: Record<string, string> = {
    upcoming: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    open: 'text-green-400 border-green-500/30 bg-green-500/10',
    finished: 'text-gray-400 border-gray-500/30 bg-gray-500/10',
  }
  return map[status] || 'text-gray-400 border-gray-500/30'
}

export function getEventTypeLabel(type: string): string {
  const map: Record<string, string> = {
    public: '公开课',
    bootcamp: '训练营',
    enterprise: '企业专场',
  }
  return map[type] || type
}
