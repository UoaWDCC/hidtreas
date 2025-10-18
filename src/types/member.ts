import { StaticImageData } from 'next/image'

export type MemberType = {
  name: string
  pronoun: string
  role: string
  imageUrl: string | StaticImageData
  slug?: string
}
