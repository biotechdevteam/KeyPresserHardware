"use client";
import React from "react";
import { filterProjectsByStatus } from "@/lib/utils/projectUtils";
import ProjectCard from "../project-card/ProjectCard";
import { Project } from "@/types/projectSchema";

const CurrentProjects: React.FC<{ projectsData: Project[] }> = ({
  projectsData,
}) => {
  const currentProjects = projectsData
    ? filterProjectsByStatus(projectsData, "current")
    : [];

  return (
    <div className="text-center m-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Current Projects</h2>
      {currentProjects.length === 0 ? (
        <p>No current projects yet.</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentProjects;
