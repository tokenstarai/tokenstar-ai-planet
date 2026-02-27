// ==================== Base Types ====================
export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string
  width?: number
  height?: number
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiItem<T> {
  id: number
  attributes: T
}

// ==================== Category & Tag ====================
export interface Category {
  id: number
  name: string
  slug: string
  type_scope: 'news' | 'kb' | 'blog' | 'case' | 'skill' | 'hardware' | 'event'
  order?: number
}

export interface Tag {
  id: number
  name: string
  slug: string
  type_scope?: string
}

// ==================== Common Content Fields ====================
export interface BaseContent {
  id: number
  title: string
  slug: string
  summary?: string
  cover_image?: StrapiImage
  content?: string
  category?: Category
  tags?: Tag[]
  seo_title?: string
  seo_description?: string
  featured?: boolean
  status?: 'draft' | 'published'
  published_at?: string
  createdAt?: string
  updatedAt?: string
}

// ==================== News ====================
export interface News extends BaseContent {
  type: 'news'
}

// ==================== Knowledge Base ====================
export interface KnowledgeBase extends BaseContent {
  type: 'kb'
}

// ==================== Blog ====================
export interface Blog extends BaseContent {
  author?: string
  type: 'blog'
}

// ==================== Case ====================
export interface Case extends BaseContent {
  industry?: string
  type: 'case'
}

// ==================== Skill ====================
export interface Skill extends BaseContent {
  install_guide?: string
  usage_examples?: string
  repo_link?: string
  version?: string
  type: 'skill'
}

// ==================== Hardware ====================
export interface SellingPoint {
  title: string
  description: string
  icon?: string
}

export interface Hardware extends BaseContent {
  scenario?: string
  configuration?: string
  selling_points?: SellingPoint[]
  buy_link?: string
  type: 'hardware'
}

// ==================== Event ====================
export interface Event {
  id: number
  title: string
  slug: string
  type: 'public' | 'bootcamp' | 'enterprise'
  start_time: string
  end_time: string
  location?: string
  signup_deadline?: string
  agenda?: string
  gallery?: StrapiImage[]
  recap_content?: string
  status: 'upcoming' | 'open' | 'finished'
  cover_image?: StrapiImage
  summary?: string
  seo_title?: string
  seo_description?: string
  featured?: boolean
  createdAt?: string
}

// ==================== Signup ====================
export interface Signup {
  id?: number
  event?: number
  name: string
  phone: string
  email: string
  company?: string
  role?: string
  note?: string
  status?: 'new' | 'contacted' | 'confirmed'
  created_at?: string
}

// ==================== Search ====================
export interface SearchResult {
  id: number
  title: string
  slug: string
  summary?: string
  type: 'news' | 'kb' | 'blog' | 'case' | 'skill' | 'hardware' | 'event'
  published_at?: string
}

// ==================== Navigation ====================
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
