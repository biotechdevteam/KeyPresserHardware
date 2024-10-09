"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/fetchUtils";
import Loader from "@/components/loader/Loader";
import ProjectsContainer from "@/components/projects/projects-container/ProjectsContainer";
import { Project } from "@/types/projectSchema";

// This function fetches the projects data using react-query
async function getProjectsData() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
    staleTime: Infinity, // Keep data fresh and avoid unnecessary refetching
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    projectsData: data,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

// ProjectsPage component to fetch and display project data
const ProjectsPage: React.FC = async () => {
  const { projectsData, isLoading, isFetching, isError } =
    await getProjectsData();

  // Handle loading state
  if (isLoading || isFetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError || !projectsData) {
    return <div>Error loading projects data...</div>;
  }

  // Render the ProjectsContainer with the fetched data
  return (
    <div>
      <ProjectsContainer initialData={projectsData as Project[]} />
    </div>
  );
};

export default ProjectsPage;
