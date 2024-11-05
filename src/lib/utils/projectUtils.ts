import { Project } from "@/types/projectSchema";

export const filterProjectsByStatus = (projects: Project[], status: "upcoming" | "current" | "past") => {
  const today = new Date();

  return projects.filter((project) => {
    const startDate = new Date(project.startDate);
    const endDate = project.endDate ? new Date(project.endDate) : undefined;

    if (status === "upcoming") {
      return startDate > today;
    } else if (status === "current") {
      return startDate <= today && (!endDate || endDate >= today);
    } else if (status === "past") {
      return endDate && endDate < today;
    }
    return false;
  });
};
