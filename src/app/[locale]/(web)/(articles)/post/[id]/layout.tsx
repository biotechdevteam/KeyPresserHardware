import React from "react";

// Layout component for the post details page
export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string }; // Accept the params with post id
}) {
  const { post } = await getPostHeaderData(params.id); // Get the post data using the id from params

  // Fallback in case the post is not found
  const postHeaderData = post || {
    title: "Post Title",
    summary: "This is a summary for the post.",
    featuredImageUrl:
      "https://via.placeholder.com/1200x400?text=Post+Image+Not+Available",
  };

  // Use the image URL if available, otherwise use a placeholder
  const backgroundImageUrl =
    postHeaderData.featuredImageUrl ||
    "https://via.placeholder.com/1200x400?text=Post+Image+Not+Available";

  return (
    <div>
      {/* Render the PostHeader component */}
      <PostHeader
        title={postHeaderData.title}
        summary={postHeaderData.summary}
        backgroundImageUrl={backgroundImageUrl}
      />

      {/* Render the children (page content) below the header */}
      <main className="p-6">{children}</main>
    </div>
  );
}

// Utility function to fetch the post data using its ID
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils"; // Fetch blogs instead of posts
import PostHeader from "@/components/blog/post-header/PostHeader";

// Fetch data for the specific post using its ID
async function getPostHeaderData(id: string) {
  const queryClient = new QueryClient();

  // Prefetch the blog data
  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs, // Fetch all blogs data
  });

  // Fetch all blog posts
  const blogsData = await fetchBlogs();

  // Find the specific post by ID
  const post = blogsData.find((p: any) => p._id === id);

  return {
    dehydratedState: dehydrate(queryClient), // Useful if you're using SSR and rehydration
    post,
  };
}
