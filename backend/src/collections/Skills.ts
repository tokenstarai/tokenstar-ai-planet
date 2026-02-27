import type { CollectionConfig } from 'payload'
import { baseContentFields, seoFields } from './shared-fields'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'version', 'status', 'featured', 'published_at'],
    description: '管理 OpenClaw Skills 技能包',
  },
  labels: {
    singular: 'Skill',
    plural: 'Skills 市场',
  },
  fields: [
    ...baseContentFields,
    {
      name: 'version',
      type: 'text',
      label: '版本号',
      admin: {
        description: '例如：1.0.0',
      },
    },
    {
      name: 'repo_link',
      type: 'text',
      label: '代码仓库链接',
    },
    {
      name: 'install_guide',
      type: 'richText',
      label: '安装指南',
    },
    {
      name: 'usage_examples',
      type: 'richText',
      label: '使用示例',
    },
    {
      name: 'compatibility',
      type: 'text',
      label: '兼容版本',
      admin: {
        description: '例如：OpenClaw >= 2.0.0',
      },
    },
    ...seoFields,
  ],
}
