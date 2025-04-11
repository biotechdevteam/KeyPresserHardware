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

    const completedProjects = projectsData.filter(
      (p: any) => p.status === "past"
    );
    const projectCount = completedProjects.length || 0;
    const categories = [
      ...new Set(completedProjects.map((p: any) => p.category)),
    ].join(", ");
    const title = "Completed Projects ~ BioTec Universe";
    const description = categories
      ? `View ${projectCount} completed projects in ${categories} by BioTec Universe.`
      : `Explore ${projectCount} completed biotechnology projects by BioTec Universe in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "completed projects",
        "portfolio",
        "biotechnology",
        "Cameroon",
        "Buea",
        "past projects",
        ...(completedProjects.map((p: any) => p.category) || []).slice(0, 5),
        ...(completedProjects.map((p: any) => p.title) || []).slice(0, 5),
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/portfolio",
        languages: {
          "en-US": "/en-US/portfolio",
          "fr-FR": "/fr-FR/portfolio",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/portfolio",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          completedProjects.length > 0 && completedProjects[0].projectImageUrl
            ? [
                {
                  url: completedProjects[0].projectImageUrl,
                  width: 1200,
                  height: 630,
                  alt: completedProjects[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Completed Projects",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          completedProjects.length > 0 && completedProjects[0].projectImageUrl
            ? [completedProjects[0].projectImageUrl]
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
      title: "Completed Projects ~ BioTec Universe",
      description:
        "Explore completed biotechnology projects by BioTec Universe in Cameroon.",
      keywords: [
        "BioTec Universe",
        "completed projects",
        "portfolio",
        "biotechnology",
        "Cameroon",
        "Buea",
        "past projects",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/portfolio",
        languages: {
          "en-US": "/en-US/portfolio",
          "fr-FR": "/fr-FR/portfolio",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/portfolio",
        title: "Completed Projects ~ BioTec Universe",
        description:
          "Explore completed biotechnology projects by BioTec Universe in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Completed Projects",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Completed Projects ~ BioTec Universe",
        description:
          "Explore completed biotechnology projects by BioTec Universe in Cameroon.",
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

export default async function PortfolioPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    return (
      <FilteredProjects
        projectsData={projectsData}
        status="past"
        title="Completed Projects"
      />
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
