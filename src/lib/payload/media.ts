import { getPayload } from './getPayload'
import type { Media } from '@/payload-types'

/**
 * Fetch media by alt text using Payload Local API
 * Returns null during build time when Payload is not available
 */
export async function getMediaByAlt(alt: string): Promise<Media | null> {
  const payload = await getPayload()
  if (!payload) return null

  const data = await payload.find({
    collection: 'media',
    limit: 1,
    where: {
      alt: { equals: alt },
    },
  })

  return data.docs[0] ?? null
}
