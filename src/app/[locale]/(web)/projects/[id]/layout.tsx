import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/fetchUtils";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";

// Fetch data for the specific project using its ID
async function getProjectHeaderData(id: string) {
  const queryClient = new QueryClient();

  // Prefetch the project data
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
  });

  const projectsData = await fetchProjectsData();

  // Find the specific project by ID
  const project = projectsData.find((p: any) => p._id === id);

  return {
    dehydratedState: dehydrate(queryClient),
    project,
  };
}

// Layout component
export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string }; // Accept the params with id
}) {
  const { project } = await getProjectHeaderData(params.id); // Get the project data using the id from params

  // If the project is not found, return a fallback project header
  const projectHeaderData = project || {
    title: "Project Title",
    summary: "This is a summary for the project.",
    projectImageUrl:
      "https://via.placeholder.com/1200x400?text=Project+Image+Not+Available",
  };

  return (
    <div>
      {/* Render the ProjectHeader component */}
      <ProjectHeader
        title={projectHeaderData.title}
        summary={projectHeaderData.summary}
        backgroundImageUrl={projectHeaderData.projectImageUrl}
      />

      {/* Render the children (page content) below the header */}
      <main className="p-6">{children}</main>
    </div>
  );
}
