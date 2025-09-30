// components/BlogContent.tsx
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Blog } from '@/payload-types'

interface BlogContentProps {
  blog: Blog
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <section className="relative px-6 py-12 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column - Image placeholder and Quote */}
        <div className="space-y-8">
          {/* Placeholder Image */}
          <div className="mt-8">
            <div className="bg-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">placeholder image</div>
            </div>
          </div>

          {/* Quote positioned lower on the left */}
          <div className="mt-32 md:mt-48">
            <blockquote className="text-3xl md:text-4xl italic font-light text-gray-800 leading-relaxed mb-4 text-left">
              "it doloribus ut rerum culpa est eligendi veniam Aut quia en assumenda eum pa nostrum
              vel"
            </blockquote>
            <footer className="text-sm text-gray-600 font-medium text-left">- Pauline Smith</footer>
          </div>
        </div>

        {/* Right Column - Content only */}
        <div className="space-y-8">
          {/* Rich Text Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-base">
              <RichText data={blog.content} />
            </div>
          </div>

          {/* Additional image placeholder on right side, positioned lower */}
          <div className="mt-16">
            <div className="bg-gray-200 rounded-lg p-8 h-64 flex items-center justify-center ml-auto max-w-xs">
              <div className="text-center text-gray-500">placeholder image</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
