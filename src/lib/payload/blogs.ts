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

const emptyBlogsResult: BlogsResult = {
  docs: [],
  totalDocs: 0,
  limit: 10,
  totalPages: 0,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
}

/**
 * Fetch published blogs using Payload Local API
 * Returns empty result during build time when Payload is not available
 */
export async function getBlogs(opts: { page?: number; limit?: number } = {}): Promise<BlogsResult> {
  const { page = 1, limit = 10 } = opts
  const payload = await getPayload()
  if (!payload) return emptyBlogsResult

  const data = await payload.find({
    collection: 'blogs',
    depth: 1,
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
 * Returns null during build time when Payload is not available
 */
export async function getBlogById(id: string): Promise<BlogType | null> {
  const payload = await getPayload()
  if (!payload) return null

  try {
    const blog = await payload.findByID({
      collection: 'blogs',
      id,
      depth: 1,
    })
    return blog ? mapPayloadBlog(blog) : null
  } catch {
    return null
  }
}

/**
 * Fetch a single blog by slug using Payload Local API
 * Returns null during build time when Payload is not available
 */
export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
  const payload = await getPayload()
  if (!payload) return null

  const data = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 1,
    where: {
      slug: { equals: slug },
    },
  })

  const blog = data.docs[0]
  return blog ? mapPayloadBlog(blog) : null
}
