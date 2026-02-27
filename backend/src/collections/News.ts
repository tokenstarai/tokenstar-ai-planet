import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'category', 'status', 'featured', 'published_at'],
    description: '管理 OpenClaw 新闻资讯',
  },
  labels: {
    singular: '新闻',
    plural: '新闻中心',
  },
  fields: [
    ...baseContentFields,
    ...seoFields,
  ],
}
