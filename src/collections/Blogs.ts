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
                data.slug ||
                data.title ||
                (operation === 'update' ? originalDoc?.title : '')

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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
