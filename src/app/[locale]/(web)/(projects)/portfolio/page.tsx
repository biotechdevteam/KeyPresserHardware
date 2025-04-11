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

    const upcomingProjects = projectsData.filter(
      (p: any) => p.status === "upcoming"
    );
    const projectCount = upcomingProjects.length || 0;
    const categories = [
      ...new Set(upcomingProjects.map((p: any) => p.category)),
    ].join(", ");
    const title = "Upcoming Projects ~ BioTec Universe";
    const description = categories
      ? `Preview ${projectCount} upcoming projects in ${categories} by BioTec Universe.`
      : `Explore ${projectCount} upcoming biotechnology projects by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "upcoming projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "future projects",
        ...(upcomingProjects.map((p: any) => p.category) || []).slice(0, 5),
        ...(upcomingProjects.map((p: any) => p.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/upcoming-projects",
        languages: {
          "en-US": "/en-US/upcoming-projects",
          "fr-FR": "/fr-FR/upcoming-projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/upcoming-projects",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          upcomingProjects.length > 0 && upcomingProjects[0].projectImageUrl
            ? [
                {
                  url: upcomingProjects[0].projectImageUrl,
                  width: 1200,
                  height: 630,
                  alt: upcomingProjects[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Upcoming Projects",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          upcomingProjects.length > 0 && upcomingProjects[0].projectImageUrl
            ? [upcomingProjects[0].projectImageUrl]
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
      title: "Upcoming Projects ~ BioTec Universe",
      description:
        "Explore upcoming biotechnology projects by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "upcoming projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "future projects",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/upcoming-projects",
        languages: {
          "en-US": "/en-US/upcoming-projects",
          "fr-FR": "/fr-FR/upcoming-projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/upcoming-projects",
        title: "Upcoming Projects ~ BioTec Universe",
        description:
          "Explore upcoming biotechnology projects by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Upcoming Projects",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Upcoming Projects ~ BioTec Universe",
        description:
          "Explore upcoming biotechnology projects by BioTec Universe in Cameroon.",
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

export default async function UpcomingProjectsPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return <FilteredProjects projectsData={projectsData} status="upcoming" />;
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
