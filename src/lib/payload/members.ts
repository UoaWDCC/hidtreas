import { getPayload } from './getPayload'
import type { Member } from '@/payload-types'

/**
 * Fetch all members using Payload Local API
 * Returns empty array during build time when Payload is not available
 */
export async function getMembers(): Promise<Member[]> {
  const payload = await getPayload()
  if (!payload) return []

  const data = await payload.find({
    collection: 'members',
    depth: 1,
    sort: 'createdAt',
    limit: 50,
  })

  return data.docs
}
