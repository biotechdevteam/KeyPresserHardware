"use client";
import React from "react";
import { fetchBlogs } from "@/lib/utils/fetchUtils";
import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";
import Loader from "@/components/loader/Loader";
import { Blog } from "@/types/blogSchema";
import Error from "@/app/[locale]/error";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch blog data
    const blogsData = await fetchBlogs();

    // Return data as props with ISR enabled
    return {
      props: {
        blogsData,
        isError: false,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        blogsData: [],
        isError: true,
      },
      revalidate: 60,
    };
  }
};

const Articles = ({
  blogsData,
  isError,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (Client-side simulation)
  const isLoading = blogsData.length === 0 && !isError;

  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error="Error in loading articles." />;
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

export default Articles;
