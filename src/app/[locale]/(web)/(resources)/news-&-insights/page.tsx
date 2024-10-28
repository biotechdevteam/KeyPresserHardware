"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils";
import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";
import Loader from "@/components/loader/Loader";
import { Blog } from "@/types/blogSchema";

// This function runs on the server-side and fetches the blogs data.
async function getBlogsData() {
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Return the prefetched data, loading, and error state
  return {
    blogsData: data,
    loading,
    fetching,
    isError,
    error,
  };
}

const ArticlesPage: React.FC = async () => {
  // Get the prefetched data from the server
  const { blogsData, loading, fetching, isError, error } = await getBlogsData();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading blogs: {error?.message}</div>;
  }

  return (
    <div>
      <section className="grid min-h-screen p-8 my-8">
        <div className="w-full max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">News and Insights</h1>
            <p className="text-lg mt-4">
              Read our latest articles and insights.
            </p>
          </header>
          {/* Pass the prefetched data as props to the BlogsContainer */}
          <BlogsContainer initialData={{ blogs: blogsData as Blog[] }} />
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;
