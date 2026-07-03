import { isAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const EventSubscribers: CollectionConfig = {
  slug: 'event-subscribers',
  admin: {
    group: 'Subscribers',
  },
  access: {
    read: isAdmin,
    // No public REST create. Signups go through createEventSubscriberAction (Local
    // API / overrideAccess) which adds consent + honeypot guards.
    create: () => false,
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
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
  ],
  indexes: [
    {
      fields: ['event', 'email'],
      unique: true,
    },
  ],
}
