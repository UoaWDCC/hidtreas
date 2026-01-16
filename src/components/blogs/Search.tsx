'use client'

import { useState, useMemo } from 'react'
import BlogCard from '@/components/blogs/BlogCard'
import type { BlogType } from '@/types/blog'

export default function Search({ blogs }: { blogs: BlogType[] }) {
  const [query, setQuery] = useState('')

  // Filter by title, description, or author
  const filteredBlogs = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery) return blogs

    return blogs.filter((blog) => {
      const titleMatch = blog.title.toLowerCase().includes(lowerQuery)
      const descriptionMatch = blog.description.toLowerCase().includes(lowerQuery)
      const authorMatch = blog.authorName.toLowerCase().includes(lowerQuery)
      return titleMatch || descriptionMatch || authorMatch
    })
  }, [query, blogs])

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Search Bar */}
      <div className="w-full max-w-4xl px-4 mb-10 sm:px-6 lg:px-8">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full px-6 py-3 sm:py-4 rounded-full border-2 border-transparent ring-1 ring-primary focus:border-primary focus:outline-none text-sm sm:text-base placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results Events Grid */}
      <div className="px-[2.5rem] lg:px-[7rem] mb-16 flex-1 w-full">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[3rem]">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No blogs found.</p>
        )}
      </div>
    </div>
  )
}
