import { isEditorOrAdmin } from '@/access/UserAccess'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
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
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title; can be edited',
      },
      hooks: {
        beforeValidate: [
          async ({ data = {}, originalDoc, req, operation }) => {
            const baseSource =
              data.slug || data.title || (operation === 'update' ? originalDoc?.title : '')

            const base = slugify((baseSource || '').toString(), {
              lower: true,
              strict: true,
              trim: true,
            })

            if (!base) return
            if (operation === 'update' && data.slug === originalDoc?.slug) return

            let candidate = base
            let n = 1
            const excludeId = originalDoc?.id

            while (true) {
              const res = await req.payload.find({
                collection: 'blogs',
                where: {
                  and: [
                    { slug: { equals: candidate } },
                    ...(excludeId ? [{ id: { not_equals: excludeId } }] : []),
                  ],
                },
                limit: 1,
                depth: 0,
              })

              if (res.totalDocs === 0) break
              n += 1
              candidate = `${base}-${n}`
            }

            data.slug = candidate
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      admin: {
        description: 'Displayed author name',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'template1',
      options: [
        { label: 'Template 1', value: 'template1' },
        { label: 'Template 2', value: 'template2' },
        { label: 'Template 3', value: 'template3' },
        { label: 'Template 4', value: 'template4' },
      ],
      admin: {
        description: 'Select which layout template to use when rendering this blog.',
      },
    },

    {
      name: 'category',
      type: 'text',
      admin: {
        condition: (data) =>
          data.template === 'template2' || data.template === 'template3',
        description: '⚠️ Required when using this template – category displayed in header (e.g. “Stories”, “Behind the Scenes”)',
      },
      validate: (value: unknown, { data }: { data: any }) => {
        if (data.published && (data.template === 'template2' || data.template === 'template3') && !value) {
          return 'This field is required for this template';
        }
        return true;
      },
    },

    {
      name: 'quote',
      type: 'text',
      admin: {
        condition: (data) =>
          data.template === 'template2' ||
          data.template === 'template3' ||
          data.template === 'template4',
        description: '⚠️ Required when using this template – main quote in layout',
      },
      validate: (value: unknown, { data }: { data: any }) => {
        if (
          data.published &&
          (data.template === 'template2' ||
            data.template === 'template3' ||
            data.template === 'template4') &&
          !value
        ) {
          return 'This field is required for this template';
        }
        return true;
      },
    },

    {
      name: 'quoteAuthor',
      type: 'text',
      admin: {
        condition: (data) =>
          data.template === 'template2' ||
          data.template === 'template3' ||
          data.template === 'template4',
        description: '⚠️ Required when using this template – name of the person being quoted',
      },
      validate: (value: unknown, { data }: { data: any }) => {
        if (
          data.published &&
          (data.template === 'template2' ||
            data.template === 'template3' ||
            data.template === 'template4') &&
          !value
        ) {
          return 'This field is required for this template';
        }
        return true;
      },
    },

    {
      name: 'authorBio',
      type: 'textarea',
      admin: {
        condition: (data) => data.template === 'template3',
        description: '⚠️ Required when using this template – short bio of the author',
      },
      validate: (value: unknown, { data }: { data: any }) => {
        if (data.published && data.template === 'template3' && !value) {
          return 'This field is required for this template';
        }
        return true;
      },
    },

    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
