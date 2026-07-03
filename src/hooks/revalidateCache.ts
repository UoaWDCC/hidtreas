import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

const triggerRevalidate = async (collectionSlug: string, slug?: string, req?: PayloadRequest) => {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return

  // Call the app over the loopback interface so the request stays on the machine
  // rather than routing out to the public hostname and back through the CDN.
  const baseUrl = process.env.REVALIDATE_BASE_URL || 'http://127.0.0.1:3000'

  try {
    const res = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ collection: collectionSlug, slug }),
    })
    if (!res.ok) {
      req?.payload.logger.error(
        `Revalidation for ${collectionSlug} returned HTTP ${res.status}`,
      )
    }
  } catch (error) {
    req?.payload.logger.error(`Revalidation failed for ${collectionSlug}: ${error}`)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  collection,
  doc,
  req,
}) => {
  await triggerRevalidate(collection.slug, doc?.slug, req)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
  collection,
  doc,
  req,
}) => {
  await triggerRevalidate(collection.slug, doc?.slug, req)
  return doc
}
