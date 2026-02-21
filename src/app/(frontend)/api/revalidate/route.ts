import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { collection, slug } = body

  switch (collection) {
    case 'blogs':
      revalidatePath('/blogs', 'page')
      if (slug) {
        revalidatePath(`/blogs/${slug}`, 'page')
      }
      break
    case 'events':
      revalidatePath('/events', 'page')
      revalidatePath('/', 'page')
      break
    case 'home-page-images':
      revalidatePath('/', 'page')
      break
    case 'about-page-images':
      revalidatePath('/about', 'page')
      break
    case 'members':
      revalidatePath('/about', 'page')
      break
    default:
      revalidatePath('/', 'layout')
  }

  return NextResponse.json({ revalidated: true })
}
