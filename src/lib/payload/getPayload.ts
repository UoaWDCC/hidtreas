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
    // PAYLOAD_SECRET is present, so this is a genuine runtime/init failure (e.g.
    // a cold-start DB connection race), not the build-time no-secret case above.
    // Rethrow rather than returning null: a thrown error makes Next.js keep
    // serving the last good ISR page and retry, whereas a null here degrades to
    // an empty list that gets cached as a valid — but empty — page.
    // Log the message only — the full error object can echo the Mongo URI.
    console.warn('Failed to initialize Payload:', error instanceof Error ? error.message : 'unknown error')
    throw error
  }
}
