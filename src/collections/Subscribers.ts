import { isAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Subscribers',
  },
  access: {
    read: isAdmin,
    // No public REST create. Signups go through the createSubscriberAction server
    // action, which uses the Local API (overrideAccess) and adds its own guards.
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
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
}
