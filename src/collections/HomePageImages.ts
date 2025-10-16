import { isEditorOrAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const HomePageImages: CollectionConfig = {
  slug: 'home-page-images',
  admin: {
    useAsTitle: 'title',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'placement',
      type: 'select',
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'Who We Are', value: 'whoWeAre' },
        { label: 'What we do', value: 'whatWeDo' },
      ],
      required: true,
      admin: {
        description: 'Where should this image appear on the home page?',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
