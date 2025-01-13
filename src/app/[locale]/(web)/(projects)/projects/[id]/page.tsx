import { fetchProjectsData } from "@/lib/utils/fetchUtils";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { notFound } from "next/navigation";
import { Project } from "@/types/projectSchema";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";
import type { Metadata, ResolvingMetadata } from "next";
import Logo from "../../../../../../../public/images/logo.png";

// Fetch all project IDs for static generation
export async function generateStaticParams() {
  const projects = await fetchProjectsData(); // Fetch all projects
  return projects.map((project: Project) => ({
    id: project._id, // Map each project ID
  }));
}

// Dynamic Metadata Generation
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch all project data
  const projects = await fetchProjectsData();
  const project = projects.find((p) => p._id === params.id);

  // Handle case where project is not found
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  // Access and extend parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const projectImage = project.projectImageUrl || Logo.src; // Fallback image

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [projectImage, ...previousImages].filter(Boolean), // Filter out undefined values
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [projectImage], // Ensure it's a valid string
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const projects = await fetchProjectsData(); // Fetch all projects
  const project = projects.find((p: Project) => p._id === params.id); // Find project by ID

  // Handle not found project
  if (!project) {
    return notFound(); // Return 404 if no project found
  }

  return (
    <div className="w-full mx-auto max-w-6xl p-6">
      <ProjectHeader
        title={project.title}
        summary={project.summary}
        backgroundImageUrl={project.projectImageUrl}
      />
      <ProjectDetails project={project} />
    </div>
  );
}
