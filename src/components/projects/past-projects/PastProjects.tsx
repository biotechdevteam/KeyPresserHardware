"use client";
import React from "react";
import { filterProjectsByStatus } from "@/lib/utils/projectUtils";
import ProjectCard from "../project-card/ProjectCard";
import { Project } from "@/types/projectSchema";

const PastProjects: React.FC<{ projectsData: Project[] }> = ({
  projectsData,
}) => {
  const pastProjects = projectsData
    ? filterProjectsByStatus(projectsData, "past")
    : [];

  return (
    <div className="text-center m-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Past Projects</h2>
      {pastProjects.length === 0 ? (
        <p className="text-gray-500">No past projects yet.</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PastProjects;
