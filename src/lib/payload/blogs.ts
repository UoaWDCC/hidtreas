import { fetchJSON } from './client'
import type { Blog } from '@/payload-types'
import { mapPayloadBlog } from '@/lib/mapBlog'
import { BlogType } from '@/types/blog'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import type { Paginated } from '@/types/pagination'

export async function getBlogs(opts: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 10 } = opts
  const data = await fetchJSON<Paginated<Blog>>(
    `/api/blogs?where[published][equals]=true&depth=2&sort=-createdAt&page=${page}&limit=${limit}`,
  )

  return {
    ...data,
    docs: data.docs.map(mapPayloadBlog),
  }
}

export async function getBlogById(id: string): Promise<BlogType | null> {
  const blog = await fetchJSON<Blog>(`/api/blogs/${id}?depth=2`)
  return blog ? mapPayloadBlog(blog) : null
}

export async function getBlogBySlug(slug: string) {
  return await fetchJSON<Paginated<Blog>>(
    `/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  )
}

export const getLatestBlogVersion = async (slug: string, authToken: ReadonlyRequestCookies) => {
  console.log(`Bearer ${authToken.get('payload-token')?.value}`)
  const data = await fetchJSON<Paginated<Blog>>(
    `/api/blogs/versions?depth=2&limit=1&where[version.slug][equals]=${encodeURIComponent(slug)}`,
    {
      headers: {
        Authorization: `Bearer ${authToken.get('payload-token')?.value}`,
      },
    },
  ).catch(() => getBlogBySlug(slug))

  const blog = data?.docs[0]
  return blog ? mapPayloadBlog(blog) : null
}
