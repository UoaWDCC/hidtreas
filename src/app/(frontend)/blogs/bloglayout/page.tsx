// app/blog/[slug]/page.tsx  (or pages/blog/[slug].tsx if not using App Router)
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogContent from '@/components/blogs/BlogContent'
import RelatedBlogs from '@/components/blogs/RelatedBlogs'
import { blogData } from '@/data/blogData.json'

export default function BlogLayout() {
  return (
    <main className="bg-[#f5f0e8] text-[#1a1a1a] min-h-screen">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="px-6 py-4 max-w-6xl mx-auto">
        <p className="text-sm text-gray-600">
          BLOGS &gt; Behind the Scenes: How Our Events Come to Life
        </p>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 px-6 py-8 items-end max-w-6xl mx-auto">
        <div className="space-y-4">
          <h2 className="uppercase text-sm tracking-wide text-gray-600 font-medium">
            BEHIND THE SCENES
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a]">
            How Our Events
            <br />
            Come to Life
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-md">{blogData[0].summary}</p>
          <p className="text-sm font-medium text-gray-800">By: {blogData[0].author}</p>
        </div>
        <div className="relative max-w-sm ml-auto">
          <img
            src={blogData[0].heroImage}
            alt="Hero"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
          {/* Decorative element - you can add a koru or leaf SVG here if needed */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20">
            {/* Placeholder for decorative element */}
          </div>
        </div>
      </section>

      {/* Content Body */}
      <BlogContent />

      {/* Related Blogs */}
      <RelatedBlogs />

      {/* Footer */}
      <Footer />
    </main>
  )
}
