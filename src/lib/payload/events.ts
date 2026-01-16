import { getPayload } from './getPayload'
import { mapPayloadEvent } from '@/lib/mapEvent'
import { EventType } from '@/types/event'

/**
 * Fetch upcoming events (future-dated) using Payload Local API
 *
 * @param limit - Maximum number of events to fetch. Defaults to 5
 *  Events are sorted ascending by date
 */
export async function getUpcomingEvents(limit: number = 5): Promise<EventType[]> {
  const payload = await getPayload()
  const now = new Date().toISOString()

  const data = await payload.find({
    collection: 'events',
    depth: 2,
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
 *
 * @param limit - Maximum number of events to fetch.
 *  Defaults to 0 (meaning all past events)
 *  Pass a positive number to restrict to the N most recent events.
 *  Events are sorted descending by date
 */
export async function getPastEvents(limit: number = 0): Promise<EventType[]> {
  const payload = await getPayload()
  const now = new Date().toISOString()

  const data = await payload.find({
    collection: 'events',
    depth: 2,
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
 */
export async function getAllEvents(): Promise<EventType[]> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'events',
    depth: 2,
    limit: 100,
    sort: '-date',
  })

  return data.docs.map(mapPayloadEvent)
}
