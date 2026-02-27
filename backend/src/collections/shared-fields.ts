import type { Field } from 'payload'

export const baseContentFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: '标题',
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
    name: 'summary',
    type: 'textarea',
    label: '摘要',
  },
  {
    name: 'cover_image',
    type: 'upload',
    relationTo: 'media',
    label: '封面图片',
  },
  {
    name: 'content',
    type: 'richText',
    label: '正文内容',
  },
  {
    name: 'category',
    type: 'relationship',
    relationTo: 'categories',
    label: '分类',
  },
  {
    name: 'tags',
    type: 'relationship',
    relationTo: 'tags',
    hasMany: true,
    label: '标签',
  },
  {
    name: 'featured',
    type: 'checkbox',
    label: '推荐内容',
    defaultValue: false,
    admin: {
      description: '勾选后将在首页推荐区域展示',
    },
  },
  {
    name: 'status',
    type: 'select',
    label: '状态',
    options: [
      { label: '草稿', value: 'draft' },
      { label: '已发布', value: 'published' },
    ],
    defaultValue: 'draft',
  },
  {
    name: 'published_at',
    type: 'date',
    label: '发布时间',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
    },
  },
]

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO 设置',
    fields: [
      {
        name: 'seo_title',
        type: 'text',
        label: 'SEO 标题',
        admin: {
          description: '留空则使用文章标题',
        },
      },
      {
        name: 'seo_description',
        type: 'textarea',
        label: 'SEO 描述',
        admin: {
          description: '建议 120-160 个字符',
        },
      },
    ],
  },
]
