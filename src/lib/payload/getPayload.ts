import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'

// Cached payload instance for reuse across requests
let cachedPayload: Awaited<ReturnType<typeof getPayloadClient>> | null = null

// Track if initialization is in progress to prevent concurrent attempts
let initPromise: Promise<Awaited<ReturnType<typeof getPayloadClient>> | null> | null = null

const MAX_RETRIES = 3
const INITIAL_DELAY_MS = 100

/**
 * Sleep helper for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get Payload Local API client with retry mechanism
 * Retries up to 3 times with exponential backoff (100ms, 200ms, 400ms)
 * Only caches successful initialization - failures trigger retry on next call
 */
export async function getPayload() {
  // Return cached instance if available
  if (cachedPayload) {
    return cachedPayload
  }

  // If initialization is already in progress, wait for it
  if (initPromise) {
    return initPromise
  }

  // Start initialization with retry logic
  initPromise = (async () => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const payload = await getPayloadClient({ config })
        cachedPayload = payload
        return payload
      } catch (error) {
        const isLastAttempt = attempt === MAX_RETRIES
        const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1)

        if (isLastAttempt) {
          console.error(`Payload initialization failed after ${MAX_RETRIES} attempts:`, error)
          return null
        }

        console.warn(
          `Payload init attempt ${attempt}/${MAX_RETRIES} failed, retrying in ${delay}ms...`,
        )
        await sleep(delay)
      }
    }
    return null
  })()

  const result = await initPromise
  initPromise = null // Reset so future calls can retry if this failed
  return result
}
