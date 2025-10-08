'use client'

import React from 'react'
import Image from 'next/image'
import placeholderImage from '@/assets/landscape_placeholder.png'
import bigGreenKoru from '@/assets/bigGreenKoru.png'
import leaf from '@/assets/leaf.svg'
import { Blog } from '@/payload-types'

interface Template1Props {
  blog: Blog
}

export default function Template1({ blog }: Template1Props) {
  const blogImage =
    typeof blog.image === 'object' && blog.image?.url ? blog.image.url : placeholderImage

  return (
    <div className={'blog-detail overflow-x-hidden'}>
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

      <article className="relative pt-[1.5rem] pb-[5rem] max-w-6xl mx-auto">
        {/* Category */}
        <p className="uppercase tracking-widest text-[0.8rem] text-black text-center">Stories</p>

        {/* Title */}
        <h1 className="mt-2 text-center text-[clamp(1.5rem,4vw,4rem)] font-bold leading-tight text-black relative z-10">
          {blog.title}
        </h1>

        {/* Hero block */}
        <div className="mt-[2rem] md:mt-[-2rem] relative z-0">
          <div className="flex justify-center">
            <div className="w-[80vw] md:w-[50vw] aspect-[16/9] relative rounded-xl overflow-hidden border border-gray-300">
              <Image src={blogImage} alt={blog.title} className="object-cover" layout="fill" />
            </div>
          </div>
        </div>

        {/* Decorative koru - left side - hidden on small and medium screens */}
        <div className="hidden lg:block absolute -left-[clamp(1.5rem,11vw,18rem)] top-[clamp(25rem,70vh,40rem)] z-10 w-[clamp(10rem,18vw,16rem)] opacity-70">
          <Image src={bigGreenKoru} alt={'Kiwi decoration'} className="rotate-[70deg]" />
        </div>

        {/* Description */}
        {blog.description && (
          <div className="mt-[1.25rem] text-center text-[0.6875rem] tracking-wider text-black">
            {blog.description}
          </div>
        )}

        {/* Content with right image */}
        <div className="mt-[3rem] flex justify-center px-[2rem] md:px-[4rem] lg:px-[6rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-start max-w-5xl mx-auto w-full">
            <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content?.root?.children
                      ?.map((child) =>
                        child.type === 'paragraph'
                          ? `<p>${(child.children as any[])?.map((c: any) => c.text || '').join('') || ''}</p>`
                          : '',
                      )
                      .join('') || 'Content coming soon...',
                }}
              />
            </div>

            <div className="order-first md:order-none flex justify-center md:justify-start">
              <div className="relative w-[70vw] md:w-[95%] max-w-[25rem]">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden border border-gray-300">
                  <Image src={blogImage} alt={blog.title} className="object-cover" layout="fill" />
                </div>
                {/* Decorative leaf in bottom right */}
                <div className="absolute -bottom-[0.75rem] -right-[1.5rem] w-[clamp(4rem,16vw,6rem)] h-[clamp(4rem,16vw,6rem)] z-10">
                  <Image
                    src={leaf}
                    alt={'Decorative leaf'}
                    className="w-full h-full scale-x-[-1] rotate-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
