import { isAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const EventSubscribers: CollectionConfig = {
  slug: 'event-subscribers',
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'subscriber',
      type: 'relationship',
      relationTo: 'subscribers',
      required: true,
    },
  ],
  indexes: [
    {
      fields: ['event', 'subscriber'],
      unique: true,
    },
  ],
}
