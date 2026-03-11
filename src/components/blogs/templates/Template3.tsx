import React from 'react'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import bigGreenKoru from '@/assets/big-green-koru.svg'
import leaf from '@/assets/leaf.svg'
import type { BlogType } from '@/types/blog'

interface Template3Props {
  blog: BlogType
}

export default function Template3({ blog }: Template3Props) {
  return (
    <div className="overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs sm:text-sm text-black mt-4 mb-2 pl-[2rem] relative">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            BLOGS {'>'} <span className="uppercase">Stories</span>:{' '}
            <span className="text-black">{blog.title}</span>
          </div>

          <div className="text-xs text-black mt-1 md:mt-0 md:absolute md:right-[2rem] md:top-0">
            <span className="text-gray-600">Written By: </span>
            <span className="font-semibold">{blog.authorName}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <article className="relative pt-[1.5rem] pb-[5rem] max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-[0.8rem] text-black text-center">Stories</p>

        <h1 className="mt-2 text-center text-[clamp(1.5rem,4vw,4rem)] font-bold leading-tight text-black relative z-10">
          {blog.title}
        </h1>

        {/* Large decorative koru background */}
        <div className="hidden lg:block absolute -left-[clamp(1.5rem,11vw,18rem)] top-[clamp(15rem,40vh,25rem)] z-0 w-[clamp(10rem,18vw,16rem)] opacity-70 mix-blend-multiply">
          <Image src={bigGreenKoru} alt="Kiwi decoration" className="rotate-[70deg]" />
        </div>

        {blog.description && (
          <div className="mt-[1.25rem] text-center text-[0.6875rem] tracking-wider text-black px-6">
            {blog.description}
          </div>
        )}

        {/* Main Content Section */}
        <div className="mt-[3rem] px-[2rem] md:px-[4rem] lg:px-[6rem]">
          <div className="max-w-5xl mx-auto">
            {/* Image + Quote on left, Text on right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[4rem] items-start mb-[4rem]">
              <div className="space-y-6">
                <div className="relative">
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-gray-300 bg-gray-200">
                    <Image src={blog.imageUrl} alt={blog.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 40%" priority />
                  </div>
                  {/* Decorative leaves */}
                  <div className="absolute -top-[1rem] -left-[1rem] w-[clamp(3rem,8vw,4rem)] h-[clamp(3rem,8vw,4rem)] z-10">
                    <Image src={leaf} alt="Decorative leaf" className="w-full h-full" />
                  </div>
                  <div className="absolute -bottom-[1rem] -right-[1rem] w-[clamp(3rem,8vw,4rem)] h-[clamp(3rem,8vw,4rem)] z-10">
                    <Image
                      src={leaf}
                      alt="Decorative leaf"
                      className="w-full h-full scale-x-[-1] rotate-6"
                    />
                  </div>
                </div>

                {/* Quote under the image */}
                <div className="pt-4">
                  <blockquote className="text-[clamp(1.2rem,2.5vw,1.8rem)] italic font-light text-black leading-relaxed mb-4">
                    {blog.quote}
                  </blockquote>
                  <footer className="text-sm text-gray-600 font-medium">- {blog.quoteAuthor}</footer>
                </div>
              </div>

              <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
                {blog.content ? <RichText data={blog.content} /> : <p>Content coming soon...</p>}
              </div>
            </div>

            {/* Bottom decorative leaves */}
            <div className="flex justify-center gap-[2rem] mt-[4rem]">
              <div className="w-[clamp(2rem,6vw,3rem)] h-[clamp(2rem,6vw,3rem)]">
                <Image src={leaf} alt="Decorative leaf" className="w-full h-full" />
              </div>
              <div className="w-[clamp(2rem,6vw,3rem)] h-[clamp(2rem,6vw,3rem)]">
                <Image
                  src={leaf}
                  alt="Decorative leaf"
                  className="w-full h-full scale-x-[-1] rotate-12"
                />
              </div>
              <div className="w-[clamp(2rem,6vw,3rem)] h-[clamp(2rem,6vw,3rem)]">
                <Image src={leaf} alt="Decorative leaf" className="w-full h-full rotate-6" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
