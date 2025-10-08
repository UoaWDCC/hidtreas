'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import type { BlogType } from '@/types/blog';

interface BlogContentProps {
  blog: BlogType;
}

// TODO: Quotes are hard coded. Consider whether to make quotes configurable through payload, or get rid of them entirely.
// TODO: This template shows two images, but with the current payload configurations, only one image can be associated with a blog.
export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <section className="relative px-6 py-12 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left Column - Image and Quote */}
        <div className="space-y-8">
          <div className="mt-8 h-80 rounded-lg overflow-hidden bg-gray-200">
            <div className="relative w-full h-full">
              <Image
                src={blog.imageUrl}
                alt={blog.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 36rem, 100vw"
              />
            </div>
          </div>

          {/* Quote block */}
          <div className="mt-32 md:mt-48">
            <blockquote className="text-3xl md:text-4xl italic font-light text-gray-800 leading-relaxed mb-4 text-left">
              "it doloribus ut rerum culpa est eligendi veniam Aut quia en assumenda eum pa nostrum vel"
            </blockquote>
            <footer className="text-sm text-gray-600 font-medium text-left">- Pauline Smith</footer>
          </div>
        </div>

        {/* Right Column - Content and secondary image */}
        <div className="space-y-8">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-base">
            <RichText data={blog.content} />
          </div>

          <div className="mt-16 ml-auto max-w-xs h-64 rounded-lg overflow-hidden bg-gray-200">
            <div className="relative w-full h-full">
              <Image
                src={blog.imageUrl}
                alt={blog.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20rem, 100vw"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}