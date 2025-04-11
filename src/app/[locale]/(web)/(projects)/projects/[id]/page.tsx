import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { Project } from "@/types/projectSchema";
import Logo from "../../../../../../../public/images/logo.png";
import { Member } from "@/types/memberSchema";

// Fetch all project IDs for static generation
export async function generateStaticParams() {
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      cache: "force-cache",
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching projects for static params:", error);
      return [];
    });

  return projects.map((project: Project) => ({
    id: project._id,
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
    const projects = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
      return res.json();
    });

    const project = projects.find((p: Project) => p._id === id);

    if (!project) {
      return {
        title: "Project Not Found ~ BioTec Universe",
        description: "The requested project could not be found.",
        robots: { index: false, follow: false }, // Prevent indexing of 404
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const projectImage = project.projectImageUrl || Logo.src;

    return {
      title: `${project.title} ~ BioTec Universe`,
      description:
        project.summary ||
        `${project.title}, a ${project.status} ${project.category} project by BioTec Universe.`,
      keywords: [
        project.title,
        project.category,
        project.status,
        "BioTec Universe",
        "project",
        "biotechnology",
        "Cameroon",
        "Buea",
        ...(project.members
          ?.map((m: Member) => m.specialization)
          .filter(Boolean) || []), // Member specializations
      ],
      metadataBase: new URL("https://biotecuniverse.org"),
      alternates: {
        canonical: `/projects/${id}`,
        languages: {
          "en-US": `/en-US/projects/${id}`,
          "fr-FR": `/fr-FR/projects/${id}`,
        },
      },
      openGraph: {
        type: "article", // Project as an article-like entity
        url: `https://biotecuniverse.org/projects/${id}`,
        title: `${project.title} ~ BioTec Universe`,
        description:
          project.summary ||
          `${project.title}, a ${project.status} ${project.category} project by BioTec Universe.`,
        siteName: "BioTec Universe",
        images: projectImage
          ? [
              {
                url: projectImage,
                width: 1200,
                height: 630,
                alt: project.title,
              },
            ]
          : [{ url: Logo.src, width: 1200, height: 630, alt: project.title }],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} ~ BioTec Universe`,
        description:
          project.summary ||
          `${project.title}, a ${project.status} ${project.category} project by BioTec Universe.`,
        images: [projectImage || Logo.src],
        creator: "@BioTecUniverse", // Could use project.members[0].social_links if Twitter-specific
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
      title: "Error ~ Project Details ~ BioTec Universe",
      description: "An error occurred while loading this project.",
      metadataBase: new URL("https://biotecuniverse.org"),
      robots: { index: false, follow: false }, // Prevent indexing of errors
    };
  }
}

export default async function ProjectPage({ params }: Props) {
  setRequestLocale("en"); // Adjust for dynamic locale if needed
  const { id } = await params;

  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
    return res.json();
  });

  const project = projects.find((p: Project) => p._id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectDetails project={project} />
    </div>
  );
}
