"use client";
import React from "react";
import { filterProjectsByStatus } from "@/lib/utils/projectUtils";
import ProjectCard from "../project-card/ProjectCard";
import { Project } from "@/types/projectSchema";

const UpcomingProjects: React.FC<{ projectsData: Project[] }> = ({
  projectsData,
}) => {
  const upcomingProjects = projectsData
    ? filterProjectsByStatus(projectsData, "upcoming")
    : [];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Upcoming Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingProjects.length === 0 ? (
          <p>No upcoming projects yet.</p>
        ) : (
          upcomingProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingProjects;
