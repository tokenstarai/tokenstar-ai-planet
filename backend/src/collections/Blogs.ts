import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'category', 'status', 'featured', 'published_at'],
    description: '管理 Blog 文章',
  },
  labels: {
    singular: 'Blog 文章',
    plural: 'Blog',
  },
  fields: [
    ...baseContentFields,
    {
      name: 'author',
      type: 'text',
      label: '作者',
    },
    ...seoFields,
  ],
}
