import { getPayload } from './getPayload'
import type { EventSubscriber } from '@/payload-types'

/**
 * Fetch event subscribers by event ID using Payload Local API (server-side only)
 * Returns null during build time when Payload is not available
 */
export async function getEventSubscribersByEventId(
  eventId: string,
  opts: { page?: number; limit?: number } = {},
) {
  const { page = 1, limit = 10 } = opts
  const payload = await getPayload()
  if (!payload) return null

  return payload.find({
    collection: 'event-subscribers',
    sort: '-createdAt',
    page,
    limit,
    depth: 0,
    where: {
      event: { equals: eventId },
    },
  })
}

/**
 * Fetch event subscribers by email using Payload Local API (server-side only)
 * Returns null during build time when Payload is not available
 */
export async function getEventSubscribersByEmail(
  email: string,
  opts: { page?: number; limit?: number } = {},
) {
  const { page = 1, limit = 10 } = opts
  const payload = await getPayload()
  if (!payload) return null

  return payload.find({
    collection: 'event-subscribers',
    sort: '-createdAt',
    page,
    limit,
    depth: 2,
    where: {
      email: { equals: email },
    },
  })
}

/**
 * Fetch an event subscriber by ID using Payload Local API (server-side only)
 * Returns null during build time when Payload is not available
 */
export async function getEventSubscriberById(id: string) {
  const payload = await getPayload()
  if (!payload) return null

  return payload.findByID({
    collection: 'event-subscribers',
    id,
    depth: 2,
  })
}
