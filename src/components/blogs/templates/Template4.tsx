import React from 'react'
import Image from 'next/image'
import bigGreenKoru from '@/assets/big-green-koru.svg'
import leaf from '@/assets/leaf.svg'
import type { BlogType } from '@/types/blog'

interface Template4Props {
  blog: BlogType
}

export default function Template4({ blog }: Template4Props) {
  // Split content into different sections
  const getContentSections = () => {
    const paragraphs =
      blog.content?.root?.children
        ?.filter((child: any) => child.type === 'paragraph')
        ?.map((child: any) => (child.children ?? []).map((c: any) => c.text || '').join('')) || []

    const totalParagraphs = paragraphs.length
    const sectionSize = Math.ceil(totalParagraphs / 3)

    return {
      section1: paragraphs.slice(0, sectionSize),
      section2: paragraphs.slice(sectionSize, sectionSize * 2),
      section3: paragraphs.slice(sectionSize * 2),
    }
  }

  const contentSections = getContentSections()

  const renderContent = (paragraphs: string[]) => {
    if (paragraphs.length === 0) return 'Content coming soon...'
    return paragraphs.map((text, index) => `<p>${text}</p>`).join('')
  }

  return (
    <div className="blog-detail overflow-x-hidden">
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
        <div className="hidden lg:block absolute -left-[clamp(1.5rem,11vw,18rem)] top-[clamp(15rem,40vh,25rem)] z-0 w-[clamp(10rem,18vw,16rem)] opacity-70">
          <Image src={bigGreenKoru} alt="Kiwi decoration" className="rotate-[70deg]" />
        </div>

        {blog.description && (
          <div className="mt-[1.25rem] text-center text-[0.6875rem] tracking-wider text-black">
            {blog.description}
          </div>
        )}

        {/* Main Content Section */}
        <div className="mt-[3rem] px-[2rem] md:px-[4rem] lg:px-[6rem]">
          <div className="max-w-5xl mx-auto">
            {/* First Row - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-start mb-[4rem]">
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-gray-300">
                  <Image src={blog.imageUrl} alt={blog.title} className="object-cover" fill />
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

              <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderContent(contentSections.section1),
                  }}
                />
              </div>
            </div>

            {/* Second Row - Text Left, Image Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-start mb-[4rem]">
              <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderContent(contentSections.section2),
                  }}
                />
              </div>

              <div className="relative">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-gray-300">
                  <Image src={blog.imageUrl} alt={blog.title} className="object-cover" fill />
                </div>
                {/* Blue koru decoration */}
                <div className="absolute -bottom-[1.5rem] -left-[1.5rem] w-[clamp(4rem,10vw,6rem)] h-[clamp(4rem,10vw,6rem)] z-10">
                  <Image
                    src={bigGreenKoru}
                    alt="Decorative koru"
                    className="w-full h-full scale-x-[-1] rotate-12 opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="text-center my-[4rem]">
              <blockquote className="text-[clamp(1.2rem,2.5vw,1.8rem)] italic font-light text-black leading-relaxed mb-4">
                {blog.quote}
              </blockquote>
              <footer className="text-sm text-gray-600 font-medium">- {blog.quoteAuthor}</footer>
            </div>

            {/* Third Row - Image Left, Text Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-start">
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-gray-300">
                  <Image src={blog.imageUrl} alt={blog.title} className="object-cover" fill />
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

              <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderContent(contentSections.section3),
                  }}
                />
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
