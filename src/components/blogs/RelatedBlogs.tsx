// components/RelatedBlogs.tsx
import Link from 'next/link'
import { blogData } from '@/data/blogData.json'

export default function RelatedBlogs() {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h3 className="text-xl mb-6">More blogs like this:</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogData[0].related.map((blog, index) => (
          <Link
            key={index}
            href={`/blog/${blog.slug}`}
            className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">{blog.title}</p>
            <p className="text-sm text-gray-500">By: {blog.author}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
