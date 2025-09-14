import { fetchJSON } from './client';
import type { Blog } from '@/payload-types';

type Paginated<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export async function getBlogs(opts: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = opts;
    return fetchJSON<Paginated<Blog>>(
        `/api/blogs?where[published][equals]=true&depth=2&sort=-createdAt&page=${page}&limit=${limit}`
    );
}

export async function getBlogById(id: string) {
    return fetchJSON<Blog>(`/api/blogs/${id}?depth=2`);
}

export async function getBlogBySlug(slug: string) {
    const data = await fetchJSON<Paginated<Blog>>(
        `/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
    );
    return data.docs[0] || null;
}
