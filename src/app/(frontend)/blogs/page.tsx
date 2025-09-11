import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogCard from '@/components/blogs/BlogCard'
import placeholderImage from '@/assets/groupPic.png'
import { fetchMockBlogs } from '@/lib/fetchMockBlogs'

export default async function BlogsPage() {
  const blogs = await fetchMockBlogs()

  return (
    <div className={'blogs'}>
      <Header />

      {/* Hero Section */}
      <div className="px-[2.5rem] lg:px-[7rem] py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight tracking-wide ">
          BLOGS
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal ">
          A collection of insights, reflections, and voices from our community.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="px-[2.5rem] lg:px-[7rem] mb-16 flex-1">
        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[3rem] ">
          {blogs.map((blog) => (
            // TODO: Change placeholderImage to blog.ImageUrl once all images come from CMS
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              imageUrl={placeholderImage}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
