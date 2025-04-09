import React from "react";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { notFound } from "next/navigation";
import { Project } from "@/types/projectSchema";
import type { Metadata, ResolvingMetadata } from "next";
import Logo from "../../../../../../../public/images/logo.png";
import { setRequestLocale } from "next-intl/server";

// Define Props type
type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Fetch all project IDs for static generation
export async function generateStaticParams() {
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      cache: "force-cache", // Use static caching for SSG
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching projects for static params:", error);
      return []; // Return empty array on error
    });
  return projects.map((project: Project) => ({
    id: project._id,
  }));
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = params;
    const projects = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    const project = projects.find((p: Project) => p._id === id);

    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      };
    }

    const previousImages = (await parent).openGraph?.images || [];
    const projectImage = project.projectImageUrl || Logo.src;

    return {
      title: `${project.title} ~ BioTec Universe`,
      description: project.summary,
      openGraph: {
        title: `${project.title} ~ BioTec Universe`,
        description: project.summary,
        images: [projectImage, ...previousImages].filter(Boolean),
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} ~ BioTec Universe`,
        description: project.summary,
        images: [projectImage].filter(Boolean),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}

export default async function ProjectPage({ params }: Props) {
  setRequestLocale("en");
  const { id } = params;

  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const project = projects.find((p: Project) => p._id === id);

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectDetails project={project} />
    </div>
  );
}
