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
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Past Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastProjects.length === 0 ? (
          <p>No past projects yet.</p>
        ) : (
          pastProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default PastProjects;
