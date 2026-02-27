import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    group: '分类与标签',
    defaultColumns: ['name', 'slug', 'type_scope'],
  },
  labels: {
    singular: '标签',
    plural: '标签管理',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '标签名称',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'type_scope',
      type: 'text',
      label: '适用范围',
      admin: {
        description: '可填写 news/kb/blog/case/skill/hardware/event，留空表示通用',
      },
    },
  ],
}
