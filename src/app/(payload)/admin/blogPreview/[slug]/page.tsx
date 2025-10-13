import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import Template1 from '@/components/blogs/templates/Template1'
import Template2 from '@/components/blogs/templates/Template2'
import { K2D, Inter } from 'next/font/google'
import '../../../../(frontend)/global.css'

const k2d = K2D({
  subsets: ['latin'],
  variable: '--font-k2d',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const templates = {
  template1: Template1,
  template2: Template2,
} as const

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()

  const Template = templates[blog.template]

  return (
    <div className={`payload-preview ${k2d.variable} ${inter.variable}`}>
      <Header payloadVersion />
      <Template blog={blog} />
      <Footer payloadVersion />
    </div>
  )
}
