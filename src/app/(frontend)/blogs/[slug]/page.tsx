import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { BLOG_TEMPLATES } from '@/lib/blog-templates'
import { getBlogs } from '@/lib/payload/blogs'
import type { Metadata } from 'next'

// ISR: Revalidate every 1 hour — individual blog posts rarely change
export const revalidate = 3600

// Generate static pages for all published blogs at build time
export async function generateStaticParams() {
  try {
    const { docs } = await getBlogs({ limit: 100 })
    return docs.map((blog) => ({ slug: blog.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return { title: 'Blog Not Found' }

  return {
    title: `${blog.title} | Hidden Treasure`,
    description: blog.description || undefined,
    openGraph: {
      title: blog.title,
      description: blog.description || undefined,
      type: 'article',
      authors: [blog.authorName],
    },
  }
}

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
