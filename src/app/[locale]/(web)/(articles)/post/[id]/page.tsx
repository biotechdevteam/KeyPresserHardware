"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils"; // Import fetch utility to get blogs
import PostContainer from "@/components/blog/post-container/PostContainer";
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
  });

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (isError || !blogsData) {
    return <div>Error fetching the post data...</div>; // Handle any error state or if blogsData is undefined
  }

  // Find the specific post by ID from the query data
  const post = blogsData?.find((p: Blog) => p._id === params.id);

  if (!post) {
    return <div>Post not found</div>; // Handle the case where no post is found
  }

  // Filter out the current post to pass the rest as relatedPosts
  const relatedPosts = blogsData.filter((p: Blog) => p._id !== params.id);

  return (
    <div>
      {/* Pass the filtered post data and relatedPosts to PostContainer */}
      <PostContainer post={post} relatedPosts={relatedPosts} />
    </div>
  );
};

export default PostPage;
