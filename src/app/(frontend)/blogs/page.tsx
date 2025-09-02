import React from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import BlogCard from '@/components/blogs/BlogCard'
import placeholderImage from '@/assets/groupPic.png'
import {fetchMockBlogs} from '@/lib/fetchMockBlogs'
import {getBlogs} from "@/lib/payload/blogs";
import {Blog} from "@/payload-types";

export default async function BlogsPage() {
    const data = await getBlogs({ page: 1, limit: 10 });

    return (
        <div className={"blogs"}>
            <Header/>
            <div className={"flex justify-center"}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
                    {data.docs.map((blog: Blog) => (
                        // TODO: Change placeholderImage to blog.ImageUrl once all images come from CMS
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            description={blog.description ?? ''}
                            imageUrl={typeof blog.image === 'object' && blog.image?.url ? blog.image.url : placeholderImage}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}