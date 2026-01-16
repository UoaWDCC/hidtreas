import React from 'react'
import Image from 'next/image'
import gL from '@/assets/leaf.svg'
import authorImage from '@/assets/event-placeholder.png'
import type { BlogType } from '@/types/blog'

interface Template3Props {
  blog: BlogType
}

export default function Template3({ blog }: Template3Props) {
  return (
    <div className="blog-detail overflow-x-hidden">
      {/* Navigation section */}
      <nav className="text-xs sm:text-sm text-black mt-4 mb-2 pl-[2rem] relative">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            BLOGS {'>'} <span className="uppercase">{blog.category}</span>:{' '}
            <span className="text-black">{blog.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero block */}
      <div className="w-[100vw] md:w-[70vw] aspect-[16/9] relative md:rounded-xl overflow-hidden my-10 mx-auto">
        <Image src={blog.imageUrl} alt={blog.imageAlt} className="object-cover" fill />

        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <p className="uppercase tracking-widest text-[0.8rem] text-white/60">{blog.category}</p>
          <h1 className="mt-2 text-[clamp(2rem,4vw,4rem)] font-bold leading-tight text-white">
            {blog.title}
          </h1>
          <p className="text-gray-200">{blog.description}</p>
          <div className="text-xs text-white mt-1">
            <span className="text-white/60">Written By: </span>
            <span className="font-semibold">{blog.authorName}</span>
          </div>
        </div>
      </div>

      <article className="relative mt-[2rem] pb-[5rem] max-w-6xl mx-auto">
        {/* Content + Sidebar Image */}
        <div className="mt-[8vh] grid grid-cols-1 md:grid-cols-2 gap-[15vw] md:gap-[5vw] px-[9vw]">
          <div className="text-[0.8125rem] leading-[1.75rem] text-black">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  blog.content?.root?.children
                    ?.map((child: any) =>
                      child.type === 'paragraph'
                        ? `<p>${(child.children ?? []).map((c: any) => c.text || '').join('')}</p>`
                        : '',
                    )
                    .join('') || 'Content coming soon...',
              }}
            />
          </div>

          <div className="relative flex flex-col items-end w-full">
            <div className="sticky top-6 w-[95%] aspect-[3/4]">
              <Image
                src={blog.imageUrl}
                alt={blog.imageAlt}
                className="object-cover rounded-xl overflow-hidden border border-gray-300"
                fill
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 rounded-md shadow-lg max-w-[60%] text-center">
                <p className="text-sm md:text-base font-semibold">{blog.quote}</p>
                {/* TODO: Remove placeholder fields once the field is added to Payload blog collection */}
                <p className="text-xs mt-2">- {blog.quoteAuthor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About the Author */}
        <section className="my-[15vh] md:mt-[10vh] px-[9vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-[2rem] max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-[45%] aspect-square rounded-full overflow-hidden border border-gray-300 shadow-md">
                <Image
                  src={authorImage}
                  alt={blog.authorName || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2 text-center md:text-left space-y-3">
              <h2 className="text-2xl font-bold text-primary">About the Author</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{blog.authorBio}</p>
            </div>
          </div>
        </section>

        {/* Bottom Decoration */}
        <div className="flex justify-center">
          <Image src={gL} alt="Decorative leaves" className="w-[50vw]" />
        </div>
      </article>
    </div>
  )
}
