import { Metadata } from "next";
import ProjectsContainer from "@/components/projects/projects-container/ProjectsContainer";
import Error from "@/app/[locale]/error";
import { motion } from "framer-motion";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    const projectCount = projectsData?.length || 0;
    const categories = [
      ...new Set(projectsData?.map((project: any) => project.category)),
    ].join(", ");
    const title = "Projects ~ BioTec Universe";
    const description = categories
      ? `Discover ${projectCount} projects in ${categories} by BioTec Universe.`
      : `Explore ${projectCount} innovative projects by BioTec Universe, advancing biotechnology in Cameroon.`;

    return {
      title,
      description,
      keywords: [
        "BioTec Universe",
        "projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "innovation",
        "research",
        ...(projectsData?.map((project: any) => project.category) || []).slice(
          0,
          5
        ), // Top categories
        ...(projectsData?.map((project: any) => project.title) || []).slice(
          0,
          5
        ), // Top titles
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/projects",
        languages: {
          "en-US": "/en-US/projects",
          "fr-FR": "/fr-FR/projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/projects",
        title,
        description,
        siteName: "BioTec Universe",
        images:
          projectsData?.length > 0 && projectsData[0].projectImageUrl
            ? [
                {
                  url: projectsData[0].projectImageUrl,
                  width: 1200,
                  height: 630,
                  alt: projectsData[0].title,
                },
              ]
            : [
                {
                  url: "/images/logo.png",
                  width: 1200,
                  height: 630,
                  alt: "BioTec Universe Projects",
                },
              ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          projectsData?.length > 0 && projectsData[0].projectImageUrl
            ? [projectsData[0].projectImageUrl]
            : ["/images/logo.png"],
        creator: "@BioTecUniverse", // Update if dynamic data available
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
      title: "Projects ~ BioTec Universe",
      description:
        "Explore innovative projects by BioTec Universe, advancing biotechnology in Cameroon.",
      keywords: [
        "BioTec Universe",
        "projects",
        "biotechnology",
        "Cameroon",
        "Buea",
        "innovation",
        "research",
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: "/projects",
        languages: {
          "en-US": "/en-US/projects",
          "fr-FR": "/fr-FR/projects",
        },
      },
      openGraph: {
        type: "website",
        url: "https://biotecuniverse.org/projects",
        title: "Projects ~ BioTec Universe",
        description:
          "Explore innovative projects by BioTec Universe, advancing biotechnology in Cameroon.",
        siteName: "BioTec Universe",
        images: [
          {
            url: "/images/logo.png",
            width: 1200,
            height: 630,
            alt: "BioTec Universe Projects",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Projects ~ BioTec Universe",
        description:
          "Explore innovative projects by BioTec Universe, advancing biotechnology in Cameroon.",
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

export default async function ProjectsPage() {
  try {
    const projectsData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());

    return (
      <section className="min-h-screen p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Our Projects
            </h1>
            <p className="text-lg mt-4 max-w-2xl mx-auto">
              Explore the various projects we are currently working on and
              discover our innovative solutions.
            </p>
          </div>

          <div>
            <ProjectsContainer projectsData={projectsData} />
          </div>
        </div>
      </section>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
