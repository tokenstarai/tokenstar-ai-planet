import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'category', 'status', 'featured', 'published_at'],
    description: '管理 OpenClaw 应用案例',
  },
  labels: {
    singular: '案例',
    plural: '案例中心',
  },
  fields: [
    ...baseContentFields,
    {
      name: 'industry',
      type: 'text',
      label: '所属行业',
    },
    {
      name: 'client',
      type: 'text',
      label: '客户名称',
    },
    {
      name: 'results',
      type: 'array',
      label: '核心成果',
      fields: [
        {
          name: 'metric',
          type: 'text',
          label: '指标',
        },
        {
          name: 'value',
          type: 'text',
          label: '数值',
        },
      ],
    },
    ...seoFields,
  ],
}
