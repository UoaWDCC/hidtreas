import { getPayload } from './getPayload'
import type { HomePageImage, AboutPageImage } from '@/payload-types'

/**
 * Fetch home page images using Payload Local API (no HTTP overhead)
 */
export async function getHomePageImages(placement?: string): Promise<HomePageImage[]> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'home-page-images',
    depth: 2,
    sort: 'createdAt',
    limit: 100,
    where: placement ? { placement: { equals: placement } } : undefined,
  })

  return data.docs
}

/**
 * Fetch about page images using Payload Local API (no HTTP overhead)
 */
export async function getAboutPageImages(placement?: string): Promise<AboutPageImage[]> {
  const payload = await getPayload()

  const data = await payload.find({
    collection: 'about-page-images',
    depth: 2,
    sort: 'createdAt',
    limit: 100,
    where: placement ? { placement: { equals: placement } } : undefined,
  })

  return data.docs
}
