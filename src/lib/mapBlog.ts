import type { Blog } from '@/payload-types'
import placeholderImage from '@/assets/event-placeholder.png'
import { type BlogType } from '@/types/blog'
import { TEMPLATE_KEYS, type TemplateKey } from '@/lib/blog-templates'

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
    imageUrl: typeof b.image === 'object'
      ? ((b.image as any)?.sizes?.hero?.url ?? b.image?.url ?? placeholderImage)
      : placeholderImage,
    cardImageUrl: typeof b.image === 'object'
      ? ((b.image as any)?.sizes?.card?.url ?? b.image?.url ?? placeholderImage)
      : placeholderImage,
    imageAlt: typeof b.image === 'object' && b.image?.alt ? b.image.alt : 'Blog image',
    secondaryImageUrl:
      typeof b.secondaryImage === 'object'
        ? ((b.secondaryImage as any)?.sizes?.card?.url ?? b.secondaryImage?.url ?? undefined)
        : undefined,
    template,
    published: !!b.published,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
    category: b.category ?? '',
    quote: b.quote ?? '',
    quoteAuthor: b.quoteAuthor ?? '',
  }
}
