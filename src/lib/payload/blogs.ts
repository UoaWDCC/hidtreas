import { fetchJSON } from './client';
import type { Blog } from '@/payload-types';
import {mapPayloadBlog} from "@/lib/mapBlog";
import {BlogType} from "@/types/blog";
import type {Paginated} from "@/types/pagination";


export async function getBlogs(opts: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = opts
    const data = await fetchJSON<Paginated<Blog>>(
      `/api/blogs?where[published][equals]=true&depth=2&sort=-createdAt&page=${page}&limit=${limit}`
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

export async function getBlogBySlug(slug: string): Promise<BlogType | null> {
    const data = await fetchJSON<Paginated<Blog>>(
      `/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
    )

    const blog = data.docs[0]
    return blog ? mapPayloadBlog(blog) : null
}