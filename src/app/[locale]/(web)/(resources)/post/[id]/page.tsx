import { fetchBlogs } from "@/lib/utils/fetchUtils";
import PostContainer from "@/components/blog/post-container/PostContainer";
import { Blog } from "@/types/blogSchema";
import { Metadata, ResolvingMetadata } from "next";
import Logo from "../../../../../../../public/images/logo.png";
import { notFound } from "next/navigation";

// Fetch all blog IDs for static generation
export async function generateStaticParams() {
  const blogs = await fetchBlogs(); // Fetch all blogs
  return blogs.map((blog: Blog) => ({
    id: blog._id, // Map each blog ID
  }));
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch all blog data
  const blogs = await fetchBlogs();
  const blog = blogs.find((b) => b._id === params.id);

  // Handle case where blog is not found
  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  // Access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const blogImage = blog.featuredImageUrl || Logo.src; // Fallback image

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [blogImage, ...previousImages].filter(Boolean), // Filter out undefined values
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [blogImage], // Ensure it's a valid string
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const blogs = await fetchBlogs(); // Fetch all blogs
  const blog = blogs.find((b: Blog) => b._id === params.id); // Find blog by ID

  // Handle not found blog
  if (!blog) {
    return notFound(); // Return 404 if no blog found
  }

  // Filter out the current post to pass the rest as relatedPosts
  const relatedPosts = blogs.filter((b: Blog) => b._id !== params.id);

  return (
    <div className="p-6">
      <PostContainer post={blog} relatedPosts={relatedPosts} />
    </div>
  );
}
