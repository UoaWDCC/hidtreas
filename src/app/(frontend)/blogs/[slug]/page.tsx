import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { BLOG_TEMPLATES } from '@/lib/blog-templates'

// Use dynamic rendering to avoid build-time fetch errors, but cache for 10 minutes in production
export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()

  const Template = BLOG_TEMPLATES[blog.template]

  return (
    <>
      <Header />
      <Template blog={blog} />
      <Footer />
    </>
  )
}
