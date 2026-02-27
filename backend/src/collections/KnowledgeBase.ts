import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const KnowledgeBase: CollectionConfig = {
  slug: 'knowledge-base',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'category', 'status', 'featured', 'published_at'],
    description: '管理 OpenClaw 知识库文章',
  },
  labels: {
    singular: '知识库文章',
    plural: '知识库',
  },
  fields: [
    ...baseContentFields,
    ...seoFields,
  ],
}
