import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

const triggerRevalidate = async (collectionSlug: string, slug?: string, req?: PayloadRequest) => {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) return

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  try {
    await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ collection: collectionSlug, slug }),
    })
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
