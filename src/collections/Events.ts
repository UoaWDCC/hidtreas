import { isEditorOrAdmin } from '@/access/UserAccess'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateCache'
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Manage upcoming and past events',
    defaultColumns: ['title', 'date', 'venue', 'published'],
    listSearchableFields: ['title', 'venue', 'description'],
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMMM d, yyyy HH:mm',
        },
      },
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'host',
      type: 'text',
      hasMany: true,
      required: true,
    },
  ],
}
