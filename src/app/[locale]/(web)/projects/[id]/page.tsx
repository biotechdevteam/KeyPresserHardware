import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/fetchUtils";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { notFound } from "next/navigation";

// Helper function to fetch project data
async function getProjectData() {
  const queryClient = new QueryClient();

  // Prefetch the project data on the server
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
  });

  // Return the prefetched data and the dehydrated state
  return {
    dehydratedState: dehydrate(queryClient),
    projectsData: await fetchProjectsData(),
  };
}

// Page component
export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { projectsData } = await getProjectData(); // Fetch the data server-side

  // Find the project with the matching ID
  const project = projectsData.find((p: any) => p._id === params.id);

  // If the project is not found, show a 404 page
  if (!project) {
    return notFound();
  }

  return (
    <div>
      {/* Render the ProjectDetails component and pass the project */}
      <ProjectDetails project={project} />
    </div>
  );
}
