import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'

// Cached payload instance for reuse across requests
let cachedPayload: Awaited<ReturnType<typeof getPayloadClient>> | null = null

/**
 * Get Payload Local API client (bypasses HTTP for much faster queries)
 * This is significantly faster than using the REST API through fetch
 */
export async function getPayload() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayloadClient({ config })
  return cachedPayload
}
