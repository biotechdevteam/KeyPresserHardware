import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { notFound } from "next/navigation";
import { Project } from "@/types/projectSchema";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";
import type { Metadata, ResolvingMetadata } from "next";
import Logo from "../../../../../../../public/images/logo.png";
import { setRequestLocale } from "next-intl/server";

// // Fetch all project IDs for static generation
// export async function generateStaticParams() {
//   const projects = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
//     {
//       next: { revalidate: 60 },
//     }
//   ).then((res) => res.json());
//   return projects.map((project: Project) => ({
//     id: project._id, // Map each project ID
//   }));
// }

// // Dynamic Metadata Generation
// export async function generateMetadata(
//   { params }: { params: { id: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const projects = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
//     {
//       next: { revalidate: 60 },
//     }
//   ).then((res) => res.json());
//   const project = projects.find((p: Project) => p._id === params.id);

//   if (!project) {
//     return {
//       title: "Project Not Found",
//       description: "The requested project could not be found.",
//     };
//   }

//   // Access and extend parent metadata
//   const previousImages = (await parent).openGraph?.images || [];
//   const projectImage = project.projectImageUrl || Logo.src;

//   return {
//     title: project.title,
//     description: project.summary,
//     openGraph: {
//       title: project.title,
//       description: project.summary,
//       images: [projectImage, ...previousImages].filter(Boolean), // Filter out undefined values
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: project.title,
//       description: project.summary,
//       images: [projectImage],
//     },
//   };
// }

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // Set locale explicitly for static rendering
  setRequestLocale("en"); // Adjust based on your locale strategy

  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
  const project = projects.find((p: Project) => p._id === params.id);

  // Handle not found project
  if (!project) {
    return notFound();
  }

  return (
    <div className="w-full mx-auto max-w-6xl p-6">
      <ProjectDetails project={project} />
    </div>
  );
}
