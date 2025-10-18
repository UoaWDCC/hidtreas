import type { StaticImageData } from 'next/image'

export type EventType = {
  id: string
  title: string
  hostedBy: string
  description: string
  date: Date
  venue?: string
  imageUrl: string | StaticImageData
  galleryImages: Array<string | StaticImageData>
}
