"use client";
import React, { useState } from "react";
import { Blog } from "@/types/blogSchema";
import { useTransitionRouter } from "next-view-transitions";
import PostCard from "../post-card/PostCard";
import BlogFilters from "../blog-filters/BlogFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { slideInOut } from "@/lib/utils/pageTransitions";

const BlogsContainer: React.FC<{ blogsData: Blog[] }> = ({ blogsData }) => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogsData); // State for filtered blogs
  const router = useTransitionRouter();

  // Handle blog click for navigation
  const handleBlogClick = (blogId: string) => {
    router.push(`/post/${blogId}`, { onTransitionReady: slideInOut });
  };

  // Handle filter logic
  const handleFilter = (filterCriteria: any) => {
    const filtered = blogsData.filter((blog: Blog) => {
      return (
        (!filterCriteria.category ||
          blog.category === filterCriteria.category) &&
        (!filterCriteria.author || blog.authorId === filterCriteria.author)
      );
    });
    setFilteredBlogs(filtered);
  };

  if (blogsData.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Show a skeleton loader during loading */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-80" />
        ))}
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Filters Section */}
      <BlogFilters onFilter={handleFilter} />

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog: Blog) => (
            <PostCard
              key={blog._id}
              blog={blog}
              onClick={() => handleBlogClick(blog._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-primary">
            No blogs found.
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsContainer;
