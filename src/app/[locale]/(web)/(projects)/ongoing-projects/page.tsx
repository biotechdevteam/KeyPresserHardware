import { Metadata } from "next";
import Error from "@/app/[locale]/error";
import FilteredProjects from "@/components/projects/filtered-projects/FilteredProjects";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const ongoingProjects = projectsData.filter(
      (p: any) => p.status === "current"
    );
    const projectCount = ongoingProjects.length || 0;
    const categories = [
      ...new Set(ongoingProjects.map((p: any) => p.category)),
    ].join(", ");
    const title = "Ongoing Projects ~ BioTec Universe";
    const description = categories
      ? `Explore ${projectCount} ongoing projects in ${categories} by BioTec Universe.`
      : `Discover ${projectCount} ongoing biotechnology projects by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "ongoing projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "current projects",
        ...(ongoingProjects.map((p: any) => p.category) || []).slice(0, 5),
        ...(ongoingProjects.map((p: any) => p.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/ongoing-projects",
        languages: {
          "en-US": "/en-US/ongoing-projects",
          "fr-FR": "/fr-FR/ongoing-projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/ongoing-projects",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          ongoingProjects.length > 0 && ongoingProjects[0].projectImageUrl
            ? [
                {
                  url: ongoingProjects[0].projectImageUrl,
                  width: 1200,
                  height: 630,
                  alt: ongoingProjects[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Ongoing Projects",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          ongoingProjects.length > 0 && ongoingProjects[0].projectImageUrl
            ? [ongoingProjects[0].projectImageUrl]
            : ["/images/logo.png"],
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
  } catch (error) {
    console.error("Failed to fetch projectsData for metadata:", error);
    return {
      title: "Ongoing Projects ~ BioTec Universe",
      description:
        "Discover ongoing biotechnology projects by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "ongoing projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "current projects",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/ongoing-projects",
        languages: {
          "en-US": "/en-US/ongoing-projects",
          "fr-FR": "/fr-FR/ongoing-projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/ongoing-projects",
        title: "Ongoing Projects ~ BioTec Universe",
        description:
          "Discover ongoing biotechnology projects by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Ongoing Projects",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Ongoing Projects ~ BioTec Universe",
        description:
          "Discover ongoing biotechnology projects by BioTec Universe in Cameroon.",
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

export default async function OngoingProjectsPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <FilteredProjects projectsData={projectsData} status="current" />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
