import { getPayload } from './getPayload'
import type { HomePageImage, AboutPageImage } from '@/payload-types'

/**
 * Fetch all home page images in a single query, then filter by placement.
 * depth: 1 is sufficient — images only have a single media relationship.
 * Returns empty array during build time when Payload is not available.
 */
export async function getAllHomePageImages(): Promise<HomePageImage[]> {
  const payload = await getPayload()
  if (!payload) return []

  const data = await payload.find({
    collection: 'home-page-images',
    depth: 1,
    sort: 'createdAt',
    limit: 50,
  })

  return data.docs
}

/**
 * Fetch home page images by placement.
 * Prefer getAllHomePageImages() when fetching multiple placements to avoid repeated queries.
 */
export async function getHomePageImages(placement?: string): Promise<HomePageImage[]> {
  const docs = await getAllHomePageImages()
  if (!placement) return docs
  return docs.filter((doc) => doc.placement === placement)
}

/**
 * Fetch all about page images in a single query, then filter by placement.
 * depth: 1 is sufficient — images only have a single media relationship.
 * Returns empty array during build time when Payload is not available.
 */
export async function getAllAboutPageImages(): Promise<AboutPageImage[]> {
  const payload = await getPayload()
  if (!payload) return []

  const data = await payload.find({
    collection: 'about-page-images',
    depth: 1,
    sort: 'createdAt',
    limit: 50,
  })

  return data.docs
}

/**
 * Fetch about page images by placement.
 * Prefer getAllAboutPageImages() when fetching multiple placements to avoid repeated queries.
 */
export async function getAboutPageImages(placement?: string): Promise<AboutPageImage[]> {
  const docs = await getAllAboutPageImages()
  if (!placement) return docs
  return docs.filter((doc) => doc.placement === placement)
}
