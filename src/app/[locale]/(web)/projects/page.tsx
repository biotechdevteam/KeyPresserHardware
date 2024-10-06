import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/fetchUtils";
import ProjectsContainer from "@/components/projects/projects-container/ProjectsContainer";

// This function runs on the server-side and fetches the projects data.
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
export default async function ProjectsPage() {
  const { projectsData } = await getProjectData(); // Fetch the data server-side

  return (
    <div>
      {/* Pass the prefetched data as props to the ProjectsContainer */}
      <ProjectsContainer initialData={projectsData} />
    </div>
  );
}
