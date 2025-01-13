"use client";
import React from "react";
import { fetchProjectsData } from "@/lib/utils/fetchUtils";
import { filterProjectsByStatus } from "@/lib/utils/projectUtils";
import ProjectCard from "../project-card/ProjectCard";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch projects data
    const projectsData = await fetchProjectsData();

    // Return data as props with ISR enabled
    return {
      props: {
        projectsData,
        isError: false,
        error: null,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        projectsData: [],
        isError: true,
        error: error,
      },
      revalidate: 60,
    };
  }
};

const CurrentProjects = ({
  projectsData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (Client-side simulation)
  const isLoading = projectsData.length === 0 && !isError;

  const currentProjects = projectsData
    ? filterProjectsByStatus(projectsData, "current")
    : [];

  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Current Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.length === 0 ? (
          <p>No current projects yet.</p>
        ) : (
          currentProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentProjects;
