import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getLatestBlogVersion } from '@/lib/payload/blogs'
import Template1 from '@/components/blogs/templates/Template1'
import Template2 from '@/components/blogs/templates/Template2'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import { cookies } from 'next/headers'

const templates = {
  template1: Template1,
  template2: Template2,
} as const

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const authToken = await cookies()
  const blog = await getLatestBlogVersion(slug, authToken)
  if (!blog) return notFound()

  const Template = templates[blog.template]

  return (
    <>
      <RefreshRouteOnSave />
      <Header />
      <Template blog={blog} />
      <Footer />
    </>
  )
}
