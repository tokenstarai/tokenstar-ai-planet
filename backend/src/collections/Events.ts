import type { CollectionConfig } from 'payload'
import { seoFields } from './shared-fields'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
    defaultColumns: ['title', 'type', 'status', 'start_time', 'location'],
    description: '管理培训活动与线下沙龙',
  },
  labels: {
    singular: '活动',
    plural: '培训活动',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '活动名称',
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
      name: 'summary',
      type: 'textarea',
      label: '活动简介',
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
      label: '封面图片',
    },
    {
      name: 'type',
      type: 'select',
      label: '活动类型',
      required: true,
      options: [
        { label: '公开活动', value: 'public' },
        { label: '训练营', value: 'bootcamp' },
        { label: '企业专场', value: 'enterprise' },
      ],
      defaultValue: 'public',
    },
    {
      name: 'status',
      type: 'select',
      label: '活动状态',
      required: true,
      options: [
        { label: '即将开始', value: 'upcoming' },
        { label: '报名中', value: 'open' },
        { label: '已结束', value: 'finished' },
      ],
      defaultValue: 'upcoming',
    },
    {
      name: 'start_time',
      type: 'date',
      label: '开始时间',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'end_time',
      type: 'date',
      label: '结束时间',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: '活动地点',
    },
    {
      name: 'signup_deadline',
      type: 'date',
      label: '报名截止时间',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'max_attendees',
      type: 'number',
      label: '最大参与人数',
    },
    {
      name: 'agenda',
      type: 'richText',
      label: '活动议程',
    },
    {
      name: 'gallery',
      type: 'array',
      label: '活动图集',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '图片',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: '图片说明',
        },
      ],
    },
    {
      name: 'recap_content',
      type: 'richText',
      label: '活动回顾',
      admin: {
        description: '活动结束后填写回顾内容',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: '推荐活动',
      defaultValue: false,
    },
    ...seoFields,
  ],
}
