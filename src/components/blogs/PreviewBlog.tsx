import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import Header from '../common/Header'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { notFound } from 'next/navigation'
import Footer from '../common/Footer'

const templates = {
  template1: Template1,
  template2: Template2,
} as const

export default async function MyCustomView({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return notFound()
  const Template = templates[blog.template]
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <h1>Custom Default Root View</h1>
        <p>This view uses the Default Template.</p>
        <Header payloadVersion />
        <Template blog={blog} />
        <Footer payloadVersion />
      </Gutter>
    </DefaultTemplate>
  )
}
