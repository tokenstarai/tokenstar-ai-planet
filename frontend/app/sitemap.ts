import { MetadataRoute } from 'next'
import { mockNews, mockKnowledge, mockSkills, mockCases, mockHardware, mockEvents, mockBlogs } from '@/lib/mock-data'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/openclaw',
    '/news',
    '/knowledge',
    '/skills',
    '/cases',
    '/hardware',
    '/events',
    '/blog',
    '/about',
    '/search',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as ChangeFrequency,
    priority: route === '/' ? 1 : 0.8,
  }))

  const createDynamicRoutes = (
    items: any[],
    prefix: string,
    changeFrequency: ChangeFrequency = 'weekly',
    priority = 0.7
  ): MetadataRoute.Sitemap => {
    return items.map(item => ({
      url: `${SITE_URL}/${prefix}/${item.slug}`,
      lastModified: item.published_at ? new Date(item.published_at) : new Date(),
      changeFrequency,
      priority,
    }))
  }

  const newsRoutes = createDynamicRoutes(mockNews, 'news', 'daily', 0.9)
  const knowledgeRoutes = createDynamicRoutes(mockKnowledge, 'knowledge', 'weekly', 0.8)
  const skillRoutes = createDynamicRoutes(mockSkills, 'skills', 'monthly', 0.7)
  const caseRoutes = createDynamicRoutes(mockCases, 'cases', 'monthly', 0.7)
  const hardwareRoutes = createDynamicRoutes(mockHardware, 'hardware', 'monthly', 0.6)
  const eventRoutes = createDynamicRoutes(mockEvents, 'events', 'weekly', 0.8)
  const blogRoutes = createDynamicRoutes(mockBlogs, 'blog', 'weekly', 0.8)

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...knowledgeRoutes,
    ...skillRoutes,
    ...caseRoutes,
    ...hardwareRoutes,
    ...eventRoutes,
    ...blogRoutes,
  ]
}
