import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogCard from '@/components/blogs/BlogCard'
import placeholderImage from '@/assets/groupPic.png'
import {getBlogs} from "@/lib/payload/blogs";
import {Blog} from "@/payload-types";
import Search from '@/components/blogs/Search'

export default async function BlogsPage() {
    const data = await getBlogs({ page: 1, limit: 10 });

  return (
    <div className={'blogs'}>
      <Header />

      {/* Hero Section */}
      <div className="px-[2.5rem] lg:px-[7rem] pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight tracking-wide ">
          BLOGS
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal ">
          A collection of insights, reflections, and voices from our community.
        </p>
      </div>

      {/* Search Bar */}
      <Search />

      {/* Blog Grid */}
      <div className="px-[2.5rem] lg:px-[7rem] mb-16 flex-1">
        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[3rem] ">
            {data.docs.map((blog: Blog) => (
                // TODO: Change placeholderImage to blog.ImageUrl once all images come from CMS
                <BlogCard
                    key={blog.id}
                    title={blog.title}
                    description={blog.description ?? ''}
                    imageUrl={typeof blog.image === 'object' && blog.image?.url ? blog.image.url : placeholderImage}
                />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
