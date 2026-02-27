import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: '分类与标签',
    defaultColumns: ['name', 'slug', 'type_scope', 'order'],
  },
  labels: {
    singular: '分类',
    plural: '分类管理',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '分类名称',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: '用于 URL 的唯一标识符，只能包含小写字母、数字和连字符',
      },
    },
    {
      name: 'type_scope',
      type: 'select',
      label: '适用范围',
      required: true,
      options: [
        { label: '新闻', value: 'news' },
        { label: '知识库', value: 'kb' },
        { label: 'Blog', value: 'blog' },
        { label: '案例', value: 'case' },
        { label: 'Skills', value: 'skill' },
        { label: '硬件方案', value: 'hardware' },
        { label: '培训活动', value: 'event' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: '排序',
      defaultValue: 0,
    },
    {
      name: 'description',
      type: 'text',
      label: '描述',
    },
  ],
}
