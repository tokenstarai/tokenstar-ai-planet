import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const Hardware: CollectionConfig = {
  slug: 'hardware',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'status', 'featured', 'published_at'],
    description: '管理硬件与云方案',
  },
  labels: {
    singular: '硬件方案',
    plural: '硬件 & 云方案',
  },
  fields: [
    ...baseContentFields,
    {
      name: 'scenario',
      type: 'textarea',
      label: '适用场景',
    },
    {
      name: 'configuration',
      type: 'richText',
      label: '配置规格',
    },
    {
      name: 'selling_points',
      type: 'array',
      label: '核心卖点',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: '卖点标题',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: '卖点描述',
        },
        {
          name: 'icon',
          type: 'text',
          label: '图标名称',
          admin: {
            description: 'Lucide 图标名称，例如：Zap, Shield, Server',
          },
        },
      ],
    },
    {
      name: 'buy_link',
      type: 'text',
      label: '购买链接',
      admin: {
        description: '点击"立即购买"按钮后跳转的外链 URL',
      },
    },
    {
      name: 'price_label',
      type: 'text',
      label: '价格标签',
      admin: {
        description: '例如：¥29,800 起 / 按需付费',
      },
    },
    ...seoFields,
  ],
}
