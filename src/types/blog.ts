import { StaticImageData } from 'next/image'

export const TEMPLATE_KEYS = ['template1', 'template2'] as const
export type TemplateKey = typeof TEMPLATE_KEYS[number]

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
}
