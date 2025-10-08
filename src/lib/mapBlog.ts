import type { Blog } from '@/payload-types'
import placeholderImage from '@/assets/landscape_placeholder.png'
import { TEMPLATE_KEYS, type TemplateKey, type BlogType } from '@/types/blog'

export function mapPayloadBlog(b: Blog): BlogType {
  const template: TemplateKey = TEMPLATE_KEYS.includes(b.template as TemplateKey)
    ? (b.template as TemplateKey)
    : 'template1'

  return {
    id: b.id,
    title: b.title,
    slug: b.slug ?? '',
    description: b.description ?? '',
    content: b.content ?? null,
    authorName: b.authorName ?? 'Hidden Treasure Team',
    imageUrl:
      typeof b.image === 'object' && b.image?.url
        ? b.image.url
        : placeholderImage,
    imageAlt:
      typeof b.image === 'object' && b.image?.alt
        ? b.image.alt
        : 'Blog image',
    template,
    published: !!b.published,
    createdAt: (b as any)?.createdAt,
    updatedAt: (b as any)?.updatedAt,
  }
}
