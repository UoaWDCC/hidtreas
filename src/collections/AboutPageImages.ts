import { isEditorOrAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'

export const AboutPageImages: CollectionConfig = {
  slug: 'about-page-images',
  fields: [
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
        { label: 'Decription Image 1 (Top Right)', value: 'description-1' },
        { label: 'Description Image 2 (Bottom Left)', value: 'description-2' },
        { label: 'Quote Section', value: 'quote' },
      ],
      required: true,
      admin: {
        description: 'Where should this image appear on the about page?',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
