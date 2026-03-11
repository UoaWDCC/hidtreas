import React, { Suspense } from 'react'
import Image from 'next/image'
import BlogContent from '@/components/blogs/templates/Template2BlogContent'
import RelatedBlogs from '@/components/blogs/RelatedBlogs'
import { BlogType } from '@/types/blog'

interface Template2Props {
  blog: BlogType
}

export default function Template2({ blog }: Template2Props) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 py-4 max-w-6xl mx-auto">
        <p className="text-sm text-gray-600">BLOGS &gt; {blog.title}</p>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 px-6 py-8 items-start md:items-end max-w-6xl mx-auto">
        <div className="space-y-4">

          <h2 className="uppercase text-sm tracking-wide text-gray-600 font-medium">
            {blog.category}
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a] text-balance">
            {blog.title}
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-md px-1">
            {blog.description || 'Explore the story behind this blog post...'}
          </p>
          <p className="text-sm font-medium text-gray-800">By: {blog.authorName}</p>
        </div>

        <div className="relative w-full max-w-sm md:ml-auto">
          <div className="relative w-full h-[22rem] rounded-lg shadow-lg overflow-hidden bg-gray-200">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 22rem"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Body */}
      <BlogContent blog={blog} />

      {/* Related Blogs */}
      <Suspense>
        <RelatedBlogs currentBlogId={blog.id} />
      </Suspense>
    </>
  )
}
