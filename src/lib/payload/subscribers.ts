import { fetchJSON } from './client'
import type { Subscriber } from '@/payload-types'

type Paginated<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function createSubscriber(firstName: string, lastName: string, email: string) {
  return fetchJSON<Subscriber>('/api/subscribers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email }),
  })
}

export async function getSubscribers(opts: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 10 } = opts
  return fetchJSON<Paginated<Subscriber>>(
    `/api/subscribers?sort=-createdAt&page=${page}&limit=${limit}`,
  )
}

export async function getSubscriberById(id: string) {
  return fetchJSON<Subscriber>(`/api/subscribers/${id}?depth=2`)
}
