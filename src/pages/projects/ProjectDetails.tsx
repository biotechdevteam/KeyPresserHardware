"use client";
import { fetchProjectsData } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";
import ProjectDetails from "@/components/projects/project-details/ProjectDetails";
import { Project } from "@/types/projectSchema";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";
import Error from "@/app/[locale]/error";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

// Define dynamic paths for pre-rendering
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const projects = await fetchProjectsData();

    const paths = projects.map((project: Project) => ({
      params: { id: project._id },
    }));

    return {
      paths, // Pre-render these paths at build time
      fallback: "blocking", // Render pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error("Error fetching project paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// Fetch data for a single project
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const projects = await fetchProjectsData();
    const project = projects.find((p: Project) => p._id === params?.id);

    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
        isError: false,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        project: null,
        isError: true,
      },
      revalidate: 60,
    };
  }
};

const ProjectDetailsPage = ({
  project,
  isError,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (only relevant for client-side fetching)
  const isLoading = !project && !isError;

  if (isLoading) return <Loader />;

  if (isError || !project) return <Error error="Error in loading project." />;

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

export default ProjectDetailsPage;
