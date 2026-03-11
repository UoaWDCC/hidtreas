import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { BLOG_TEMPLATES } from '@/lib/blog-templates'

export const dynamic = 'force-dynamic'

export default async function BlogPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()

  const Template = BLOG_TEMPLATES[blog.template]

  return (
    <>
      <div className="bg-amber-500 text-white text-center py-2 px-4 text-sm font-semibold sticky top-0 z-50">
        PREVIEW MODE — This blog has not been published yet
      </div>
      <Header />
      <Template blog={blog} />
      <Footer />
    </>
  )
}
