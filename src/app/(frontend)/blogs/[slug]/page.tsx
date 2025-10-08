import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import Template1 from '@/components/blogs/templates/Template1'
import Template2 from '@/components/blogs/templates/Template2'

const templates = {
  template1: Template1,
  template2: Template2,
} as const

export default async function BlogPage({
                                         params,
                                       }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()

  const Template = templates[blog.template]

  return (
    <>
      <Header />
      <Template blog={blog} />
      <Footer />
    </>
  )
}
