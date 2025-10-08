import React from 'react'
import Image from 'next/image'
import BlogContent from '@/components/blogs/BlogContent'
import RelatedBlogs from '@/components/blogs/RelatedBlogs'
import { Blog } from '@/payload-types'

export default function Template2({ blog }: { blog: Blog }) {
  const heroImageUrl =
    typeof blog.image === 'object' && blog.image?.url ? blog.image.url : '/events/event1.jpg' // fallback image

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 py-4 max-w-6xl mx-auto">
        <p className="text-sm text-gray-600">BLOGS &gt; {blog.title}</p>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 px-6 py-8 items-end max-w-6xl mx-auto">
        <div className="space-y-4">
          <h2 className="uppercase text-sm tracking-wide text-gray-600 font-medium">
            BEHIND THE SCENES
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a]">
            {blog.title.split(' ').slice(0, -2).join(' ')}
            <br />
            {blog.title.split(' ').slice(-2).join(' ')}
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-md">
            {blog.description || 'Explore the story behind this blog post...'}
          </p>
          <p className="text-sm font-medium text-gray-800">By: {blog.authorName}</p>
        </div>
        <div className="relative max-w-sm ml-auto">
          <div className="relative w-full h-[22rem] rounded-lg shadow-lg overflow-hidden">
            <Image
              src={heroImageUrl}
              alt={
                typeof blog.image === 'object' && blog.image?.alt ? blog.image.alt : blog.title
              }
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative element placeholder */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20" />
        </div>
      </section>

      {/* Content Body */}
      <BlogContent blog={blog} />

      {/* Related Blogs */}
      <RelatedBlogs currentBlogId={blog.id} />
    </>
  )
}
