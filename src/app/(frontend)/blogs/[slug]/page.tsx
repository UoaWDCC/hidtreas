import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Image from 'next/image'
import { getBlogBySlug } from '@/lib/payload/blogs'
import placeholderImage from '@/assets/groupPic.png'

type Params = {
  params: { slug: "a-super-cool-blog-title" }
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = params
  const blog = await getBlogBySlug(slug)

  // Demo fallback if no blog found
  const title = blog?.title ?? 'Demo Blog Title'
  const description = blog?.description ?? 'This is a demo blog description.'
  const authorName = blog?.authorName ?? 'Hidden Treasure Team'
  const imageUrl =
    typeof blog?.image === 'object' && blog?.image?.url ? blog.image.url : placeholderImage

  return (
    <div className={'blog-detail'}>
      <Header />

      <article className="px-[2.5rem] lg:px-[7rem] pt-16 pb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">By {authorName}</p>

        <div className="w-full h-72 sm:h-96 relative rounded-xl overflow-hidden mb-8">
          <Image src={imageUrl} alt={title} className="object-cover" layout="fill" />
        </div>

        <p className="text-lg leading-8">{description}</p>
      </article>

      <Footer />
    </div>
  )
}
