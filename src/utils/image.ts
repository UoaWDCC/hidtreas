import { Media } from '@/payload-types'

export function getPayloadImageUrl(image: (string | null) | Media) {
  return typeof image === 'string' ? image : image?.url
}
