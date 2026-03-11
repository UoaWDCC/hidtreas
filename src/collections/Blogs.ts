import { isEditorOrAdmin } from '@/access/UserAccess'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateCache'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'template', 'authorName', 'published', 'updatedAt'],
    listSearchableFields: ['title', 'authorName', 'description'],
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
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Media & Layout',
          fields: [
            {
              name: 'template',
              type: 'select',
              required: true,
              defaultValue: 'template1',
              options: [
                { label: 'Template 1', value: 'template1' },
                { label: 'Template 2', value: 'template2' },
                { label: 'Template 3', value: 'template3' },
              ],
              admin: {
                description: 'Select which layout template to use when rendering this blog.',
              },
            },
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'secondaryImage',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                condition: (data) => data.template === 'template2',
                description:
                  'Optional distinct second image used in Template 2. If not provided, the second image slot will be hidden.',
              },
            },
          ],
        },
        {
          label: 'Metadata',
          fields: [
            {
              name: 'category',
              type: 'text',
              admin: {
                condition: (data) => data.template === 'template2',
                description:
                  '⚠️ Required when using this template – category displayed in header (e.g. "Stories", "Behind the Scenes")',
              },
              validate: (value: unknown, { data }: { data: any }) => {
                if (data.published && data.template === 'template2' && !value) {
                  return 'This field is required for this template'
                }
                return true
              },
            },
            {
              name: 'quote',
              type: 'text',
              admin: {
                condition: (data) =>
                  data.template === 'template2' || data.template === 'template3',
                description: '⚠️ Required when using this template – main quote in layout',
              },
              validate: (value: unknown, { data }: { data: any }) => {
                if (
                  data.published &&
                  (data.template === 'template2' || data.template === 'template3') &&
                  !value
                ) {
                  return 'This field is required for this template'
                }
                return true
              },
            },
            {
              name: 'quoteAuthor',
              type: 'text',
              admin: {
                condition: (data) =>
                  data.template === 'template2' || data.template === 'template3',
                description:
                  '⚠️ Required when using this template – name of the person being quoted',
              },
              validate: (value: unknown, { data }: { data: any }) => {
                if (
                  data.published &&
                  (data.template === 'template2' || data.template === 'template3') &&
                  !value
                ) {
                  return 'This field is required for this template'
                }
                return true
              },
            },
            {
              name: 'authorName',
              type: 'text',
              required: true,
              admin: {
                description: 'Displayed author name',
              },
            },
          ],
        },
      ],
    },
  ],
}
