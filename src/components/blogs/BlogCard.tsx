import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

// TODO: StaticImageData is used for a placeholder image. Confirm later how we want to handle missing images.
interface Props {
  title: string
  description: string
  imageUrl: string | StaticImageData
  slug?: string
  blogId: string // Add blog ID prop
}

const BlogCard: FunctionComponent<Props> = ({ title, description, imageUrl, slug }) => {
  return (
    <div
      className="
        group border-2 border-[#13384E] rounded-xl w-full h-full p-8 flex flex-col justify-between
        shadow-md hover:shadow-xl hover:bg-[#13384E]/10 transition-all duration-300
      "
    >
      {/* Image container */}
      <div className="w-full h-48 sm:h-56 md:h-64 relative rounded-xl overflow-hidden mb-4">
        <Image src={imageUrl} alt={title} className="object-cover" fill />
      </div>

      <h1 className="text-3xl font-black self-start mb-2 clamp-2">{title}</h1>

      <p className="text-sm text-gray-800 self-start mb-4 clamp-5 min-h-[2rem]">{description}</p>

      <Link
        href={`/blogs/${slug}`}
        className="border-2 border-[#13384E] rounded-md px-4 py-1 font-semibold hover:bg-[#13384E] hover:text-[#FDF4ED] transition-colors duration-300 text-center inline-block"
      >
        READ MORE
      </Link>
    </div>
  )
}

export default BlogCard
