import { getPayload } from './getPayload'
import type { Member } from '@/payload-types'

/**
 * Fetch all members using Payload Local API
 */
export async function getMembers(): Promise<Member[]> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'members',
    depth: 2,
    sort: 'createdAt',
    limit: 100,
  })

  return data.docs
}
