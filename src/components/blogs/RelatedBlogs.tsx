import Link from 'next/link'
import { getBlogs } from '@/lib/payload/blogs'

interface RelatedBlogsProps {
  currentBlogId: string
}

export default async function RelatedBlogs({ currentBlogId }: RelatedBlogsProps) {
  const { docs: blogs } = await getBlogs({ page: 1, limit: 4 })
  const relatedBlogs = blogs.filter(blog => blog.id !== currentBlogId).slice(0, 3)

  if (relatedBlogs.length === 0) return null

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h3 className="text-xl mb-6">More blogs like this:</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedBlogs.map(blog => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-500">By: {blog.authorName}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
