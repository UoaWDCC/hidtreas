import { StaticImageData } from 'next/image'

export interface MemberType {
  name: string
  pronoun: string
  role: string
  imageUrl: string | StaticImageData
  slug?: string
}
