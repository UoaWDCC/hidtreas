import { fetchJSON } from './client'
import type { Subscriber, Event, EventSubscriber } from '@/payload-types'

type Paginated<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export async function createEventSubscriber(
  eventId: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  return fetchJSON<EventSubscriber>('/api/event-subscribers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventId, email, firstName, lastName }),
  })
}

export async function getEventSubscribersByEventId(
  eventId: string,
  opts: { page?: number; limit?: number } = {},
) {
  const { page = 1, limit = 10 } = opts
  return fetchJSON<Paginated<EventSubscriber>>(
    `/api/event-subscribers?event=${eventId}&sort=-createdAt&page=${page}&limit=${limit}&depth=0`,
  )
}

export async function getEventSubscribersByEmail(
  email: string,
  opts: { page?: number; limit?: number } = {},
) {
  const { page = 1, limit = 10 } = opts
  return fetchJSON<Paginated<EventSubscriber>>(
    `/api/event-subscribers?email=${email}&sort=-createdAt&page=${page}&limit=${limit}&depth=2`,
  )
}

export async function getEventSubscriberById(id: string) {
  return fetchJSON<EventSubscriber>(`/api/event-subscribers/${id}?depth=2`)
}
