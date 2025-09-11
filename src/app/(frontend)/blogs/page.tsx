import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogCard from '@/components/blogs/BlogCard'
import placeholderImage from '@/assets/groupPic.png'
import {fetchMockBlogs} from '@/lib/fetchMockBlogs'
import Search from '@/components/blogs/Search'

export default async function BlogsPage() {
    const blogs = await fetchMockBlogs()

    return (
        <div className={"blogs"}>
            <Header/>
            <Search />
            <div className={"flex justify-center"}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
                    {blogs.map((blog) => (
                        // TODO: Change placeholderImage to blog.ImageUrl once all images come from CMS
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            description={blog.description}
                            imageUrl={placeholderImage}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}