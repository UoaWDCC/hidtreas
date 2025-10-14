import type { Media } from '@/payload-types'
import { fetchJSON } from '@/lib/payload/client'

type Paginated<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function getMediaByAlt(alt: string): Promise<Media | null> {
  const data = await fetchJSON<Paginated<Media>>(
    `/api/media?where[alt][equals]=${encodeURIComponent(alt)}&limit=1`
  )

  return data.docs[0] ?? null
}

