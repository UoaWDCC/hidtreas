import { isEditorOrAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const Member: CollectionConfig = {
  slug: 'members',

  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'pronoun',
      type: 'select',
      defaultValue: 'other',
      options: [
        { label: '(he/him)', value: '(he/him)' },
        { label: '(she/her)', value: '(she/her)' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
}
