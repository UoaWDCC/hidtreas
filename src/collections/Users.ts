import { isAdmin, isAdminField, isAdminOrSelf } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'People',
  },
  access: {
    read: isAdminOrSelf,
    // Only admins may create accounts. Payload still allows the very first user
    // to be created when the collection is empty (initial bootstrap).
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  auth: true,
  fields: [
    {
      name: 'role',
      saveToJWT: true,
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: isAdminField,
        update: isAdminField,
      },
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
