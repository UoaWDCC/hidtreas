import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogCard from '@/components/blogs/BlogCard'
import Search from '@/components/blogs/Search'
import { getBlogs } from '@/lib/payload/blogs'
import type { BlogType } from '@/types/blog'

// ISR: Revalidate every 5 minutes for fresh content while keeping pages static
export const revalidate = 300

export default async function BlogsPage() {
  const { docs: blogs } = await getBlogs({ page: 1, limit: 10 })

  return (
    <div className="blogs">
      <Header />

      {/* Hero Section */}
      <div className="px-[2.5rem] lg:px-[7rem] pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight tracking-wide">
          BLOGS
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal">
          A collection of insights, reflections, and voices from our community.
        </p>
      </div>

      {/* Search Bar Filter + Blog Grid */}
      <Search blogs={blogs} />

      <Footer />
    </div>
  )
}
