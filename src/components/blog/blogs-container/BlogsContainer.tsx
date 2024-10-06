"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils";
import { Blog } from "@/types/blogSchema";
import { useTransitionRouter } from "next-view-transitions";
import PostCard from "../post-card/PostCard";
import BlogFilters from "../blog-filters/BlogFilters";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogsContainerProps {
  initialData: {
    blogs: Blog[];
  };
}

const BlogsContainer: React.FC<BlogsContainerProps> = ({ initialData }) => {
  const {
    data: blogs,
    isLoading: blogsLoading,
    isError: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    initialData: initialData.blogs,
  });

  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(initialData.blogs); // State for filtered blogs
  const router = useTransitionRouter();

  // Handle blog click for navigation
  const handleBlogClick = (blogId: string) => {
    router.push(`/post/${blogId}`);
  };

  // Handle filter logic
  const handleFilter = (filterCriteria: any) => {
    const filtered = blogs.filter((blog: Blog) => {
      return (
        (!filterCriteria.category ||
          blog.category === filterCriteria.category) &&
        (!filterCriteria.author || blog.authorId === filterCriteria.author)
      );
    });
    setFilteredBlogs(filtered);
  };

  if (blogsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Show a skeleton loader during loading */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-80" />
        ))}
      </div>
    );
  }

  if (blogsError) {
    return <div className="text-red-500">Error loading data...</div>;
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
          <div className="col-span-full text-center text-gray-500">
            No blogs found.
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsContainer;
