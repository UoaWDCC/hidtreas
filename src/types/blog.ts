import { StaticImageData } from 'next/image'
import type {TemplateKey} from '@/lib/blog-templates'

export type BlogType = {
  id: string
  title: string
  slug: string
  description: string
  content: any
  authorName: string
  imageUrl: string | StaticImageData
  imageAlt: string
  template: TemplateKey
  published: boolean
  createdAt?: string
  updatedAt?: string
  category?: string
  quote?: string
  quoteAuthor?: string
  authorBio?: string
}
