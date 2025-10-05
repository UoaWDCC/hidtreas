import { fetchJSON } from './client'
import type { Member } from '@/payload-types'

type PaginatedResponse = {
  docs: Member[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export async function getMembers() {
  const data = await fetchJSON<PaginatedResponse>('/api/members?depth=2&sort=order&limit=100')
  return data.docs
}
