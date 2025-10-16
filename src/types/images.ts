import { StaticImageData } from 'next/image'

export type ImageType = {
  title: string
  placement: string
  roaltle: string
  imageUrl: string | StaticImageData
  slug?: string
}
