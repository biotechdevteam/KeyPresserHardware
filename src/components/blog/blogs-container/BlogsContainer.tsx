"use client";
import React, { useState } from "react";
import { fetchBlogs } from "@/lib/utils/fetchUtils";
import { Blog } from "@/types/blogSchema";
import { useTransitionRouter } from "next-view-transitions";
import PostCard from "../post-card/PostCard";
import BlogFilters from "../blog-filters/BlogFilters";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/loader/Loader";
import Error from "@/app/[locale]/error";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { slideInOut } from "@/lib/utils/pageTransitions";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch blog data
    const blogsData = await fetchBlogs();

    // Return data as props with ISR enabled
    return {
      props: {
        blogsData,
        isError: false,
        error: null,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        blogsData: [],
        isError: true,
        error: error,
      },
      revalidate: 60,
    };
  }
};

const BlogsContainer = ({
  blogsData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogsData); // State for filtered blogs
  const router = useTransitionRouter();

  // Handle blog click for navigation
  const handleBlogClick = (blogId: string) => {
    router.push(`/post/${blogId}`, {onTransitionReady: slideInOut});
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

  // Handle loading state (Client-side simulation)
  const isLoading = blogsData.length === 0 && !isError;
  if (isLoading) {
    // return <Loader />;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Show a skeleton loader during loading */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-80" />
        ))}
      </div>
    );
  }  

  // Handle error state
  if (isError) {
    return <Error error={error} />;
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
