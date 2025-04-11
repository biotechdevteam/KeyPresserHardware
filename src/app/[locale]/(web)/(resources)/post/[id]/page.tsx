import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import PostContainer from "@/components/blog/post-container/PostContainer";
import { Blog } from "@/types/blogSchema";
import Logo from "../../../../../../../public/images/logo.png";

// Fetch all blog IDs for static generation
export async function generateStaticParams() {
  const blogs = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
    {
      next: { revalidate: 60 },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching blogs for static params:", error);
      return [];
    });

  return blogs.map((blog: Blog) => ({
    id: blog._id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const blogs = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
      return res.json();
    });

    const blog = blogs.find((b: Blog) => b._id === id);

    if (!blog) {
      return {
        title: "Blog Not Found ~ BioTec Universe",
        description: "The requested blog could not be found.",
        robots: { index: false, follow: false }, // Prevent indexing of 404
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const blogImage = blog.featuredImageUrl || Logo.src;

    return {
      title: `${blog.title} ~ BioTec Universe`,
      description:
        blog.summary ||
        `Read "${blog.title}" from BioTec Universe, a Bio-Technology insight.`,
      keywords: [
        blog.title,
        blog.category,
        "BioTec Universe",
        "blog",
        "article",
        "biotechnology",
        "Cameroon",
        "Buea",
        ...(blog.authorId?.skills?.slice(0, 3) || []), // Top 3 author skills if available
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: `/post/${id}`,
        languages: {
          "en-US": `/en-US/post/${id}`,
          "fr-FR": `/fr-FR/post/${id}`,
        },
      },
      openGraph: {
        type: "article",
        url: `https://biotecuniverse.org/post/${id}`,
        title: `${blog.title} ~ BioTec Universe`,
        description:
          blog.summary || `Read "${blog.title}" from BioTec Universe.`,
        siteName: "BioTec Universe",
        images: blogImage
          ? [{ url: blogImage, width: 1200, height: 630, alt: blog.title }]
          : [{ url: Logo.src, width: 1200, height: 630, alt: blog.title }],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `${blog.title} ~ BioTec Universe`,
        description:
          blog.summary || `Read "${blog.title}" from BioTec Universe.`,
        images: [blogImage || Logo.src],
        creator: blog.authorId?.social_links?.find((link: string) =>
          link.includes("twitter.com")
        )
          ? `@${(link: string) =>
              link.replace("https://twitter.com/", "").split("/").pop()}`
          : "@BioTecUniverse",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error ~ Blog Post ~ BioTec Universe",
      description: "An error occurred while loading this blog post.",
      metadataBase: new URL("https://biotecuniverse.org"),
      robots: { index: false, follow: false }, // Prevent indexing of errors
    };
  }
}

export default async function PostPage({ params }: Props) {
  setRequestLocale("en"); // Adjust for dynamic locale if needed
  const { id } = await params;

  const [blogs, aboutData] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`, {
      next: { revalidate: 60 },
    }).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
      return res.json();
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/about`, {
      next: { revalidate: 60 },
    }).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch about data: ${res.status}`);
      return res.json();
    }),
  ]);

  const blog = blogs.find((b: Blog) => b._id === id);

  if (!blog) {
    notFound();
  }

  const relatedPosts = blogs.filter((b: Blog) => b._id !== id);

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
