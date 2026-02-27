import type { CollectionConfig } from 'payload'

export const Signups: CollectionConfig = {
  slug: 'signups',
  admin: {
    useAsTitle: 'name',
    group: '报名管理',
    defaultColumns: ['name', 'email', 'phone', 'company', 'event', 'status', 'createdAt'],
    description: '查看和管理活动报名信息',
  },
  labels: {
    singular: '报名记录',
    plural: '报名管理',
  },
  access: {
    create: () => true, // 允许公开提交报名
    read: ({ req: { user } }) => !!user, // 只有登录用户才能查看
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      label: '报名活动',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: '姓名',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: '手机号',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: '邮箱',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: '公司/机构',
    },
    {
      name: 'role',
      type: 'text',
      label: '职位/角色',
    },
    {
      name: 'note',
      type: 'textarea',
      label: '备注',
    },
    {
      name: 'status',
      type: 'select',
      label: '跟进状态',
      options: [
        { label: '新报名', value: 'new' },
        { label: '已联系', value: 'contacted' },
        { label: '已确认', value: 'confirmed' },
        { label: '已取消', value: 'cancelled' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'admin_note',
      type: 'textarea',
      label: '管理员备注',
      admin: {
        description: '仅管理员可见',
      },
    },
  ],
  hooks: {
    afterOperation: [
      async ({ operation, result }) => {
        if (operation === 'create') {
          // 可以在这里添加发送确认邮件的逻辑
          console.log(`New signup: ${result.name} for event ${result.event}`)
        }
      },
    ],
  },
}
