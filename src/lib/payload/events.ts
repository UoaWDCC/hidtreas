import { getPayload } from './getPayload'
import { mapPayloadEvent } from '@/lib/mapEvent'
import { EventType } from '@/types/event'

/**
 * Fetch upcoming events (future-dated) using Payload Local API
 * Returns empty array during build time when Payload is not available
 *
 * @param limit - Maximum number of events to fetch. Defaults to 5
 *  Events are sorted ascending by date
 */
export async function getUpcomingEvents(limit: number = 5): Promise<EventType[]> {
  const payload = await getPayload()
  if (!payload) return []

  const now = new Date().toISOString()

  const data = await payload.find({
    collection: 'events',
    depth: 1,
    limit,
    sort: 'date',
    where: {
      date: { greater_than: now },
    },
  })

  return data.docs.map(mapPayloadEvent)
}

/**
 * Fetch past events using Payload Local API
 * Returns empty array during build time when Payload is not available
 *
 * @param limit - Maximum number of events to fetch.
 *  Defaults to 0 (meaning all past events)
 *  Pass a positive number to restrict to the N most recent events.
 *  Events are sorted descending by date
 */
export async function getPastEvents(limit: number = 0): Promise<EventType[]> {
  const payload = await getPayload()
  if (!payload) return []

  const now = new Date().toISOString()

  const data = await payload.find({
    collection: 'events',
    depth: 1,
    limit: limit || 100,
    sort: '-date',
    where: {
      date: { less_than: now },
    },
  })

  return data.docs.map(mapPayloadEvent)
}

/**
 * Fetch all events for static generation
 * Returns empty array during build time when Payload is not available
 */
export async function getAllEvents(): Promise<EventType[]> {
  const payload = await getPayload()
  if (!payload) return []

  const data = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 100,
    sort: '-date',
  })

  return data.docs.map(mapPayloadEvent)
}
