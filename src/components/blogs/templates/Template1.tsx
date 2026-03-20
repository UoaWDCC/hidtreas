import React from 'react'
import Image from '@/components/common/AppImage'
import { RichText } from '@payloadcms/richtext-lexical/react'
import bigGreenKoru from '@/assets/big-green-koru.svg'
import leaf from '@/assets/leaf.svg'
import type { BlogType } from '@/types/blog'

interface Template1Props {
  blog: BlogType
}

export default function Template1({ blog }: Template1Props) {
  return (
    <div className="overflow-x-hidden">
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
        <p className="uppercase tracking-widest text-[0.8rem] text-black text-center">Stories</p>

        <h1 className="mt-2 text-center text-[clamp(1.5rem,4vw,4rem)] font-bold leading-tight text-black relative z-10">
          {blog.title}
        </h1>

        <div className="mt-4 md:mt-[2rem] flex justify-center relative z-0">
          <div className="w-[80vw] md:w-[50vw] relative">
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-gray-300 bg-gray-200">
              <Image src={blog.imageUrl} alt={blog.title} className="object-cover" fill sizes="(max-width: 768px) 80vw, 50vw" priority />
            </div>
            <div className="absolute -bottom-[0.75rem] -right-[1.5rem] w-[clamp(4rem,16vw,6rem)] h-[clamp(4rem,16vw,6rem)] z-10">
              <Image
                src={leaf}
                alt="Decorative leaf"
                className="w-full h-full scale-x-[-1] rotate-6"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute -left-[clamp(1.5rem,11vw,18rem)] top-[clamp(25rem,70vh,40rem)] z-10 w-[clamp(10rem,18vw,16rem)] opacity-70 mix-blend-multiply">
          <Image src={bigGreenKoru} alt="Kiwi decoration" className="rotate-[70deg]" />
        </div>

        {blog.description && (
          <div className="mt-[1.25rem] text-center text-[0.6875rem] tracking-wider text-black">
            {blog.description}
          </div>
        )}

        <div className="mt-[3rem] flex justify-center px-[2rem] md:px-[4rem] lg:px-[6rem]">
          <div className="max-w-3xl mx-auto w-full">
            <div className="space-y-[1.25rem] text-[0.8125rem] leading-[1.75rem] text-black">
              {blog.content ? <RichText data={blog.content} /> : <p>Content coming soon...</p>}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
