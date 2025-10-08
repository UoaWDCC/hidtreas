import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import {getBlogBySlug} from '@/lib/payload/blogs'
import dynamic from 'next/dynamic'
import {notFound} from "next/navigation";

const templates = {
  template1: dynamic(() => import('@/components/blogs/templates/template1')),
  template2: dynamic(() => import('@/components/blogs/templates/template2')),
}

export default async function BlogPage({
                                         params,
                                       }: {
  params: Promise<{ slug: string }>
}) {
  const {slug} = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()

  const key = (blog.template as keyof typeof templates) ?? 'template1'
  const Template = templates[key] ?? templates.template1

  return (
    <>
      <Header/>
      <Template blog={blog}/>
      <Footer/>
    </>
  )
}