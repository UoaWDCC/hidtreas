// components/BlogContent.tsx
import Image from 'next/image'
import { blogData } from '@/data/blogData.json'

export default function BlogContent() {
  return (
    <section className="relative px-6 py-12 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column - Image placeholder and Quote */}
        <div className="space-y-8">
          {blogData[0].sections.map((section, index) => {
            if (section.type === 'image' && section.src && section.alt) {
              return (
                <div key={index} className="mt-8">
                  <div className="bg-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gray-400"></div>
                      <div
                        className="w-32 h-20 mx-auto border-2 border-gray-400"
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}

          {/* Quote at bottom left */}
          <div className="mt-16">
            {blogData[0].sections.map((section, index) => {
              if (section.type === 'quote' && section.content) {
                return (
                  <div key={index}>
                    <blockquote className="text-3xl italic font-light text-gray-800 leading-relaxed mb-4 text-left">
                      "{section.content.replace(/"/g, '')}"
                    </blockquote>
                    <footer className="text-sm text-gray-600 font-medium text-left">
                      - {section.author}
                    </footer>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>

        {/* Right Column - Content only */}
        <div className="space-y-8">
          {/* Paragraph Content */}
          {blogData[0].sections.map((section, index) => {
            if (section.type === 'paragraph' && section.content) {
              return (
                <div key={index} className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <span key={pIndex}>
                        {paragraph}
                        {pIndex < section.content.split('\n\n').length - 1 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}
