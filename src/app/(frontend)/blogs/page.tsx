import React, { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Search from '@/components/blogs/Search'
import { getBlogs } from '@/lib/payload/blogs'

// ISR: Revalidate every 30 minutes — content changes infrequently
export const revalidate = 1800

function BlogsSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4 mb-10 sm:px-6 lg:px-8">
        <div className="w-full h-12 sm:h-14 rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="px-[2.5rem] lg:px-[7rem] mb-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[3rem]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-2 border-gray-200 rounded-xl p-8 flex flex-col gap-4 animate-pulse">
              <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 rounded-xl" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-10 bg-gray-200 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function BlogsContent() {
  const { docs: blogs } = await getBlogs({ page: 1, limit: 10 })
  return <Search blogs={blogs} />
}

export default function BlogsPage() {
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
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogsContent />
      </Suspense>

      <Footer />
    </div>
  )
}
