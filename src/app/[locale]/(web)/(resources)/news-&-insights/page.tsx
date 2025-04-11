import { Metadata } from "next";
import BlogsContainer from "@/components/blog/blogs-container/BlogsContainer";
import Error from "@/app/[locale]/error";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const blogsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const blogCount = blogsData?.length || 0;
    const categories = [
      ...new Set(blogsData?.map((blog: any) => blog.category)),
    ].join(", ");
    const title = "News & Insights ~ BioTec Universe";
    const description = categories
      ? `Explore ${blogCount} articles on ${categories} from BioTec Universe.`
      : `Read ${blogCount} latest articles and insights from BioTec Universe, a biotechnology leader in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "news",
        "insights",
        "articles",
        "biotechnology",
        "Cameroon",
        "Buea",
        ...(blogsData?.map((blog: any) => blog.category) || []).slice(0, 5), // Add top categories
        ...(blogsData?.map((blog: any) => blog.title) || []).slice(0, 5), // Add top titles
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/news-&-insights",
        languages: {
          "en-US": "/en-US/news-&-insights",
          "fr-FR": "/fr-FR/news-&-insights",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/news-&-insights",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          blogsData?.length > 0 && blogsData[0].featuredImageUrl
            ? [
                {
                  url: blogsData[0].featuredImageUrl,
                  width: 1200,
                  height: 630,
                  alt: blogsData[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe News & Insights",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          blogsData?.length > 0 && blogsData[0].featuredImageUrl
            ? [blogsData[0].featuredImageUrl]
            : ["/images/logo.png"],
        creator: "@BioTecUniverse", // Update if dynamic author Twitter available
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
    console.error("Failed to fetch blogsData for metadata:", error);
    return {
      title: "News & Insights ~ BioTec Universe",
      description:
        "Read the latest articles and insights from BioTec Universe, a biotechnology association in Cameroon.",
      keywords: [
        "BioTec Universe",
        "news",
        "insights",
        "articles",
        "biotechnology",
        "Cameroon",
        "Buea",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/news-&-insights",
        languages: {
          "en-US": "/en-US/news-&-insights",
          "fr-FR": "/fr-FR/news-&-insights",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/news-&-insights",
        title: "News & Insights ~ BioTec Universe",
        description:
          "Read the latest articles and insights from BioTec Universe, a biotechnology association in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe News & Insights",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "News & Insights ~ BioTec Universe",
        description:
          "Read the latest articles and insights from BioTec Universe, a biotechnology association in Cameroon.",
        images: ["/images/logo.png"],
        creator: "@BioTecUniverse",
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
  }
}

export default async function ArticlesPage() {
  try {
    const blogsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/posts`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

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
            <BlogsContainer blogsData={blogsData} />
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
