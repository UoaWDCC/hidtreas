import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getBlogs } from '@/lib/payload/blogs'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { collection, slug } = body

  console.log(`[revalidate] collection=${collection} slug=${slug ?? ''}`)

  // Pass literal paths with no type. The `'page'` form expects a route *pattern*
  // (e.g. /blogs/[slug]); given a resolved URL — and under the (frontend) route
  // group — it matches nothing and silently purges nothing.
  switch (collection) {
    case 'blogs': {
      revalidatePath('/blogs')
      if (slug) {
        revalidatePath(`/blogs/${slug}`)
      }
      // Sibling blog pages embed RelatedBlogs that link to other posts, so refresh
      // every published blog detail page when any blog changes (small collection).
      try {
        const { docs } = await getBlogs({ limit: 100 })
        for (const b of docs) {
          if (b.slug && b.slug !== slug) revalidatePath(`/blogs/${b.slug}`)
        }
      } catch {
        // best-effort; the edited slug + listing are already revalidated above
      }
      break
    }
    case 'events':
      revalidatePath('/events')
      revalidatePath('/')
      break
    case 'home-page-images':
      revalidatePath('/')
      break
    case 'about-page-images':
      revalidatePath('/about')
      break
    case 'members':
      revalidatePath('/about')
      break
    default:
      revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true })
}
