import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { BLOG_TEMPLATES } from '@/lib/blog-templates'
import { getLatestBlogVersion } from '@/lib/payload/blogs'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { cookies } from 'next/headers'

// Use dynamic rendering to avoid build-time fetch errors, but cache for 10 minutes in production
export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const authToken = await cookies()
  const blog = await getLatestBlogVersion(slug, authToken)
  if (!blog) return notFound()

  const Template = BLOG_TEMPLATES[blog.template]

  return (
    <>
      <RefreshRouteOnSave />
      <Header />
      <Template blog={blog} />
      <Footer />
    </>
  )
}
