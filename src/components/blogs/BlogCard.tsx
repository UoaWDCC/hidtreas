import Image, { StaticImageData } from 'next/image'

import React, { FunctionComponent } from 'react'

// TODO: Change `imageUrl` to `string` once all images come from CMS
interface Props {
  title: string
  description: string
  imageUrl: string | StaticImageData
}

const BlogCard: FunctionComponent<Props> = ({ title, description, imageUrl }) => {
  return (
    <div
      className={
        'border-2 border-[#13384E] rounded-xl w-full h-full p-8 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]  transition-shadow'
      }
    >
      {/*image's container*/}
      <div className="w-full h-48 sm:h-56 md:h-64 relative rounded-xl overflow-hidden mb-4">
        <Image src={imageUrl} alt={title} className="object-cover" layout="fill" />
      </div>

      <h1 className={'text-3xl font-black self-start mb-2 clamp-2'}>{title}</h1>

      <p className={'text-sm text-gray-800 self-start mb-4 clamp-5 min-h-[2rem]'}>{description}</p>

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
