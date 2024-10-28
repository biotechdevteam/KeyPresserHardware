"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils";
import PostContainer from "@/components/blog/post-container/PostContainer";
import Loader from "@/components/loader/Loader";
import { Blog } from "@/types/blogSchema";

interface PageProps {
  params: { id: string }; // Accept the params with post id
}

const PostPage: React.FC<PageProps> = ({ params }) => {
  // Use useQuery to fetch all blogs
  const {
    data: blogsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: Infinity, // Avoid refetching unnecessarily
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (isError || !blogsData) {
    return <div>Error fetching the post data...</div>;
  }

  // Find the specific post by ID from the query data
  const post = blogsData?.find((p: Blog) => p._id === params.id);

  // Handle the case where the post is not found
  if (!post) {
    return <div>Post not found</div>;
  }

  // Filter out the current post to pass the rest as relatedPosts
  const relatedPosts = blogsData.filter((p: Blog) => p._id !== params.id);

  return (
    <div className="p-6">
      {/* Pass the filtered post data and relatedPosts to PostContainer */}
      <PostContainer post={post} relatedPosts={relatedPosts} />
    </div>
  );
};

export default PostPage;
