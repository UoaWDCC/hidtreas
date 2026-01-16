import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'

// Cached payload instance for reuse across requests
let cachedPayload: Awaited<ReturnType<typeof getPayloadClient>> | null = null

/**
 * Get Payload Local API client (bypasses HTTP for much faster queries)
 * This is significantly faster than using the REST API through fetch
 * 
 * Returns null during build time when PAYLOAD_SECRET is not available
 */
export async function getPayload() {
  // Check if we have the required secret - if not, we're in build time
  if (!process.env.PAYLOAD_SECRET) {
    return null
  }

  if (cachedPayload) {
    return cachedPayload
  }

  try {
    cachedPayload = await getPayloadClient({ config })
    return cachedPayload
  } catch (error) {
    console.warn('Failed to initialize Payload:', error)
    return null
  }
}
