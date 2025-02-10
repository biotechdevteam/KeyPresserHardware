import PostContainer from "@/components/blog/post-container/PostContainer";
import { Blog } from "@/types/blogSchema";
import { Metadata, ResolvingMetadata } from "next";
import Logo from "../../../../../../../public/images/logo.png";
import { notFound } from "next/navigation";

// Fetch all blog IDs for static generation
export async function generateStaticParams() {
  const blogs = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
  return blogs.map((blog: Blog) => ({
    id: blog._id, // Map each blog ID
  }));
}

// // Dynamic Metadata Generation
// export async function generateMetadata(
//   { params }: { params: { id: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const blogs = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
//     {
//       next: { revalidate: 60 },
//     }
//   ).then((res) => res.json());
//   const blog = blogs.find((b: Blog) => b._id === params.id);

//   if (!blog) {
//     return {
//       title: "Blog Not Found",
//       description: "The requested blog could not be found.",
//     };
//   }

//   // Access and extend parent metadata
//   const previousImages = (await parent).openGraph?.images || [];
//   const blogImage = blog.featuredImageUrl || Logo.src;

//   return {
//     title: blog.title,
//     description: blog.summary,
//     openGraph: {
//       title: blog.title,
//       description: blog.summary,
//       images: [blogImage, ...previousImages].filter(Boolean), // Filter out undefined values
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: blog.summary,
//       images: [blogImage],
//     },
//   };
// }

export default async function PostPage({ params }: { params: { id: string } }) {
  const [blogs, aboutData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
      next: { revalidate: 60 },
    }).then((res) => res.json()),
  ]);
  const blog = blogs.find((b: Blog) => b._id === params.id);

  // Handle not found blog
  if (!blog) {
    return notFound();
  }

  // Filter out the current post to pass the rest as relatedPosts
  const relatedPosts = blogs.filter((b: Blog) => b._id !== params.id);

  return (
    <div className="p-6">
      <PostContainer
        post={blog}
        relatedPosts={relatedPosts}
        aboutData={aboutData}
      />
    </div>
  );
}
