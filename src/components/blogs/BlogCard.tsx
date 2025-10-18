import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { BlogType } from '@/types/blog'

interface Props {
  blog: BlogType
}

const BlogCard: FunctionComponent<Props> = ({ blog }) => {
  return (
    <div
      className="
        group border-2 border-[#13384E] rounded-xl w-full h-full p-8 flex flex-col justify-between
        shadow-md hover:shadow-xl hover:bg-[#13384E]/10 transition-all duration-300
      "
    >
      {/* Image container */}
      <div className="w-full h-48 sm:h-56 md:h-64 relative rounded-xl overflow-hidden mb-4">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          className="object-cover"
          fill
        />
      </div>

      <h1 className="text-3xl font-black self-start mb-2 clamp-2">{blog.title}</h1>

      <p className="text-sm text-gray-800 self-start mb-4 clamp-5 min-h-[2rem]">
        {blog.description}
      </p>

      <Link
        href={`/blogs/${blog.slug}`}
        className="border-2 border-[#13384E] rounded-md px-4 py-1 font-semibold hover:bg-[#13384E] hover:text-[#FDF4ED] transition-colors duration-300 text-center inline-block"
      >
        READ MORE
      </Link>
    </div>
  )
}

export default BlogCard
