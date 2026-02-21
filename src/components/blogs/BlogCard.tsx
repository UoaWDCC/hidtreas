import Image from 'next/image'
import Link from 'next/link'
import { BlogType } from '@/types/blog'

interface Props {
  blog: BlogType
}

export default function BlogCard({ blog }: Props) {
  return (
    <div
      className="
        group border-2 border-primary rounded-xl w-full h-full p-8 flex flex-col justify-between
        shadow-md hover:shadow-xl hover:bg-primary/10 transition-all duration-300
      "
    >
      <div className="w-full h-48 sm:h-56 md:h-64 relative rounded-xl overflow-hidden mb-4">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
        />
      </div>

      <h1 className="text-3xl font-black self-start mb-2 clamp-2">{blog.title}</h1>

      <p className="text-sm text-gray-800 self-start mb-4 clamp-5 min-h-[2rem]">
        {blog.description}
      </p>

      <Link
        href={`/blogs/${blog.slug}`}
        className="border-2 border-primary rounded-md px-4 py-1 font-semibold hover:bg-primary hover:text-background transition-colors duration-300 text-center inline-block"
      >
        READ MORE
      </Link>
    </div>
  )
}
