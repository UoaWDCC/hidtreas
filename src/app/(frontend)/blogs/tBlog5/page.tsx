import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Image from 'next/image'
import placeholderImage from '@/assets/landscape_placeholder.png'
import bigGreenKoru from '@/assets/bigGreenKoru.png'
import leaf from '@/assets/leaf.svg'
import { getBlogs, getBlogById } from '@/lib/payload/blogs'
import { Blog } from '@/payload-types'
import gL from '@/assets/groupedLeaves.svg'
import authorImage from '@/assets/people_placeholder.png'

interface Props {
  searchParams: { id?: string }
}

export default async function DemoBlogPage({ searchParams }: Props) {
  // Get the first blog if no ID is provided, or fetch specific blog by ID
  let blog: Blog | null = null

  if (searchParams.id) {
    // Fetch specific blog by ID using the correct function
    try {
      blog = await getBlogById(searchParams.id)
    } catch (error) {
      console.error('Error fetching blog by ID:', error)
      blog = null
    }
  }

  if (!blog) {
    // Fallback: get the first available blog
    const data = await getBlogs({ page: 1, limit: 1 })
    blog = data.docs[0] || null
  }

  // If still no blog, show error or placeholder
  if (!blog) {
    return (
      <div className={'blog-detail overflow-x-hidden'}>
        <Header />
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold">No blog found</h1>
          <p>Please check back later.</p>
        </div>
        <Footer />
      </div>
    )
  }

  // Get the blog image
  const blogImage =
    typeof blog.image === 'object' && blog.image?.url ? blog.image.url : placeholderImage

  return (
    <div className={'blog-detail overflow-x-hidden'}>
      <Header />

    {/* Navigation section */}
      <nav className="text-xs sm:text-sm text-black mt-4 mb-2 pl-[2rem] relative">
      <div className="md:flex md:justify-between md:items-start">
          <div>
            BLOGS {'>'} <span className="uppercase">Behind the Scenes</span>:{' '}
            <span className="text-black">{blog.title}</span>
          </div>
          </div>
      </nav>

    {/* Hero block */}
    <div className="w-[100vw] md:w-[70vw] aspect-[16/9] relative md:rounded-xl overflow-hidden my-10 mx-auto">
        <div className='flex justify-center'>
            <Image 
                src={typeof blog?.image === 'string' ? blog.image : blog?.image?.url ?? placeholderImage} 
                alt={blog?.title ?? 'Demo Blog'} 
                className="object-cover" 
                fill 
                />
        </div>
            

        {/* Overlayed content */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            
            {/* Category */}
            <p className="uppercase tracking-widest text-[0.8rem] text-white/60 ">Behind the Scenes</p>

            {/*Title*/}
            <h1 className="mt-2 text-[clamp(2rem,4vw,4rem)] font-bold leading-tight text-white relative z-10">
                {blog?.title ?? 'Demo Blog Title'}
            </h1>
            <p className="text-gray-200">{blog?.description ?? 'This is a demo blog description.'}</p>

            {/* Author card */}
            <div className="text-xs text-white mt-1 md:mt-0 "> 
                <span className="text-white/60">Written By: </span>
                <span className="font-semibold">{blog?.authorName}</span>
            </div>
        </div>
    </div>  



    <article className="relative mt-[2rem] pb-[5rem] max-w-6xl mx-auto">
        
        



    {/* NEWWWWWWW text & image grid*/}
    <div className="mt-[8vh] grid grid-cols-1 md:grid-cols-2 gap-[15vw] md:gap-[5vw] px-[9vw]">

        {/*textbox*/}
        <div className='text-[0.8125rem] leading-[1.75rem] text-black '>
            
            {/* Render rich text content - you may need to add a rich text renderer */}
            <div
                dangerouslySetInnerHTML={{
                __html:
                    blog.content?.root?.children
                    ?.map((child) =>
                        child.type === 'paragraph'
                        ? `<p>${(child.children as any[])?.map((c: any) => c.text || '').join('') || ''}</p>`
                        : '',
                    )
                    .join('') || 'Content coming soon...',
                }}
            />
        </div>

        {/*image*/}

        <div className="relative flex flex-col items-end w-full">

            <div className='sticky top-6 w-[95%] aspect-[3/4] '>
                <Image 
                    src={blogImage} 
                    alt={blog.title} 
                    className="object-cover rounded-xl overflow-hidden border border-gray-300" 
                    layout="fill" />


                <div className="absolute -bottom-6 -left-6 bg-[#13384E] text-white p-4 rounded-md shadow-lg max-w-[60%] flex flex-col items-center text-center">
                    <p className="text-sm md:text-base font-semibold">
                        "Insert very inspirational quote test here:)"
                    </p>
                    <div> 
                        <p className='text-xs mt-2'>- Quoter</p>
                    </div>

                 </div>
            </div>

        </div>

    </div>


    






{/* About the Author Section */}
<section className="my-[15vh] md:mt-[10vh]  w-full flex justify-center px-[9vw]">
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-[2rem] max-w-6xl w-full">
    
    {/* Author Image */}
    <div className="flex justify-center">
      <div className="relative w-[45%] aspect-square rounded-full overflow-hidden border border-gray-300 shadow-md">
        <Image
          src={authorImage}
          alt={blog.authorName || 'Author'}
          fill
          className="object-cover"
        />
      </div>
    </div>

    {/* About Author Text */}
    <div className="md:col-span-2 flex flex-col justify-center text-center md:text-left space-y-3">
      <h2 className="text-2xl font-bold text-[#13384E]">
        About the Author
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        { 'This is a short bio about the author. They are passionate about sharing insights, creative ideas, and stories that inspire others.'}
      </p>
    </div>
  </div>
</section>







        {/*image w 3 leaves*/}
        <div className='flex justify-center '>
            <Image src={gL} alt={blog.title} className="w-[50vw] item-center"  />
        </div>

      </article>




      <Footer />
    </div>
  )
}
