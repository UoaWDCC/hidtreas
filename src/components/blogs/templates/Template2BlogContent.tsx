import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from '@/components/common/AppImage'
import type { BlogType } from '@/types/blog'

interface BlogContentProps {
  blog: BlogType
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <section className="relative px-6 py-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* Left Column - Secondary Image and Quote */}
        <div className="space-y-6">
          {blog.secondaryImageUrl && (
            <div className="h-80 rounded-lg overflow-hidden bg-gray-200">
              <div className="relative w-full h-full">
                <Image
                  src={blog.secondaryImageUrl}
                  alt={blog.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 36rem, 100vw"
                />
              </div>
            </div>
          )}

          {/* Quote block */}
          <div className="mt-8 md:mt-12">
            <blockquote className="text-2xl md:text-3xl italic font-light text-gray-800 leading-relaxed mb-4 text-left">
              {blog.quote}
            </blockquote>
            <footer className="text-sm text-gray-600 font-medium text-left">- {blog.authorName}</footer>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-base">
          <RichText data={blog.content} />
        </div>

      </div>
    </section>
  )
}
