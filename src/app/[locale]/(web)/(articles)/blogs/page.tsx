import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/fetchUtils";
import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";
import ComingSoon from "@/app/[locale]/coming-soon";

const BlogsPage: React.FC = async () => {
  const { initialData } = await getBlogs(); // Fetch blogs from server-side

  return (
    <div>
      <BlogsContainer initialData={initialData} />
    </div>
  );
};

export default BlogsPage;

// Server-side function for fetching blogs
async function getBlogs() {
  const queryClient = new QueryClient();

  // Prefetch the blogs on the server
  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Fetch the blogs directly
  const blogs = await fetchBlogs();

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    initialData: { blogs },
  };
}
