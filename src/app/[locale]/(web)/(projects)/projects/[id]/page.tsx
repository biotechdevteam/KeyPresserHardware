"use client";
import ProjectDetailsPage from "@/pages/projects/ProjectDetails";
import React from "react";

export const ProjectDetailPage: React.FC<{ params: { id: string } }> = ({
  params,
}) => {
  return <ProjectDetailsPage params={params} />;
};
