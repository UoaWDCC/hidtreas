import { getPayload } from './getPayload'
import type { Media } from '@/payload-types'

/**
 * Fetch media by alt text using Payload Local API
 */
export async function getMediaByAlt(alt: string): Promise<Media | null> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'media',
    limit: 1,
    where: {
      alt: { equals: alt },
    },
  })

  return data.docs[0] ?? null
}
