import { Media } from '@/payload-types'

// Extended Media type with image sizes (will be generated after Payload processes uploads)
type MediaWithSizes = Media & {
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      filename?: string | null
    }
    card?: {
      url?: string | null
      width?: number | null
      height?: number | null
      filename?: string | null
    }
    hero?: {
      url?: string | null
      width?: number | null
      height?: number | null
      filename?: string | null
    }
  }
}

/**
 * Get optimized image URL from Payload CMS
 * @param image - Media object from Payload
 * @param size - Preferred size: 'thumbnail' (400px), 'card' (768px), or 'hero' (1920px)
 * @returns Optimized image URL or null
 */
export function getPayloadImageUrl(
  image: (string | null) | Media,
  size: 'thumbnail' | 'card' | 'hero' = 'hero',
) {
  if (typeof image === 'string') return image
  if (!image) return null

  const mediaWithSizes = image as MediaWithSizes
  const sizedImage = mediaWithSizes.sizes?.[size]

  if (sizedImage?.url) {
    return sizedImage.url
  }

  // Fallback to original URL
  return image.url
}
