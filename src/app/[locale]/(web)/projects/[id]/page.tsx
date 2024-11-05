"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";
import { Project } from "@/types/projectSchema";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";

// Helper function to fetch project data based on the project ID
async function getProjectData(id: string) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
    staleTime: Infinity, // Keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Find the project by its ID
  const project = data?.find((p: Project) => p._id === id);

  return {
    project,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

// ProjectPage component
const ProjectPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { project, isLoading, isFetching, isError } = await getProjectData(
    params.id
  );

  // Handle loading state
  if (isLoading || isFetching) {
    return <Loader />;
  }

  // Handle error or not found project
  if (isError || !project) {
    return notFound(); // Return 404 if no project found
  }

  // Render the ProjectDetails component with the found project data
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
};

export default ProjectPage;
