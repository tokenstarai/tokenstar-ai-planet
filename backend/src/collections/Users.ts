import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: '系统管理',
  },
  labels: {
    singular: '用户',
    plural: '用户列表',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '姓名',
    },
    {
      name: 'role',
      type: 'select',
      label: '角色',
      options: [
        { label: '超级管理员', value: 'super-admin' },
        { label: '编辑', value: 'editor' },
        { label: '作者', value: 'author' },
      ],
      defaultValue: 'editor',
    },
  ],
}
