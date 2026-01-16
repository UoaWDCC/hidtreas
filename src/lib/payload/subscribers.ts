import { getPayload } from './getPayload'
import type { Subscriber } from '@/payload-types'

/**
 * Fetch subscribers using Payload Local API (server-side only)
 * Returns null during build time when Payload is not available
 */
export async function getSubscribers(opts: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 10 } = opts
  const payload = await getPayload()
  if (!payload) return null

  return payload.find({
    collection: 'subscribers',
    sort: '-createdAt',
    page,
    limit,
  })
}

/**
 * Fetch a subscriber by ID using Payload Local API (server-side only)
 * Returns null during build time when Payload is not available
 */
export async function getSubscriberById(id: string) {
  const payload = await getPayload()
  if (!payload) return null

  return payload.findByID({
    collection: 'subscribers',
    id,
    depth: 2,
  })
}
