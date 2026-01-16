import { getPayload } from './getPayload'
import { mapPayloadBlog } from '@/lib/mapBlog'
import { BlogType } from '@/types/blog'

type BlogsResult = {
  docs: BlogType[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number | null
  nextPage?: number | null
}

/**
 * Fetch published blogs using Payload Local API
 */
export async function getBlogs(opts: { page?: number; limit?: number } = {}): Promise<BlogsResult> {
  const { page = 1, limit = 10 } = opts
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'blogs',
    depth: 2,
    page,
    limit,
    sort: '-createdAt',
    where: {
      published: { equals: true },
    },
  })

  return {
    ...data,
    docs: data.docs.map(mapPayloadBlog),
  }
}

/**
 * Fetch a single blog by ID using Payload Local API
 */
export async function getBlogById(id: string): Promise<BlogType | null> {
  const payload = await getPayload()

  try {
    const blog = await payload.findByID({
      collection: 'blogs',
      id,
      depth: 2,
    })
    return blog ? mapPayloadBlog(blog) : null
  } catch {
    return null
  }
}

/**
 * Fetch a single blog by slug using Payload Local API
 */
export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'blogs',
    depth: 2,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  const blog = data.docs[0]
  return blog ? mapPayloadBlog(blog) : null
}
