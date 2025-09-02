import Image, { StaticImageData } from 'next/image'

import React, { FunctionComponent } from 'react'

// TODO: StaticImageData is used for a placeholder image. Confirm later how we want to handle missing images.
interface Props {
  title: string
  description: string
  imageUrl: string | StaticImageData
}

const BlogCard: FunctionComponent<Props> = ({ title, description, imageUrl }) => {
  return (
    <div
      className={
        'border-2 border-[#13384E] rounded-md w-50 p-4 flex flex-col items-center hover:shadow-lg transition-shadow'
      }
    >
      <div
        className={
          'w-40 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 flex items-center justify center'
        }
      >
        <Image
          src={imageUrl}
          alt={title}
          className={'w-full h-full object-cover'}
          width={993}
          height={524}
        />
      </div>

      <h1 className={'text-3xl font-black self-start mb-2 clamp-2'}>{title}</h1>

      <p className={'text-sm text-gray-800 self-start mb-4 clamp-5 min-h-[6rem]'}>{description}</p>

      <button
        className={
          'border-2 border-[#13384E] rounded-md px-4 py-1 font-semibold hover:bg-[#13384E] hover:text-[#FDF4ED] transition'
        }
      >
        READ MORE
      </button>
    </div>
  )
}

export default BlogCard
