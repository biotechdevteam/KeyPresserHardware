"use client";
import React, { useEffect, useRef } from "react";
import { filterProjectsByStatus } from "@/lib/utils/projectUtils";
import ProjectCard from "../project-card/ProjectCard";
import { Project } from "@/types/projectSchema";
import { motion } from "framer-motion";

type ProjectStatus = "upcoming" | "current" | "past";

interface FilteredProjectsProps {
  projectsData: Project[];
  status: ProjectStatus;
  title?: string;
  className?: string;
  description?: string;
}

const FilteredProjects: React.FC<FilteredProjectsProps> = ({
  projectsData,
  status,
  title,
  className = "",
  description,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsData
    ? filterProjectsByStatus(projectsData, status)
    : [];

  // Default titles based on status if no custom title provided
  const defaultTitles = {
    upcoming: "Upcoming Projects",
    current: "Current Projects",
    past: "Past Projects",
  };

  // Default descriptions based on status if no custom description provided
  const defaultDescriptions = {
    upcoming:
      "Exciting initiatives that are in our planning phase and will launch soon.",
    current:
      "Projects we're actively working on with ongoing impact in our communities.",
    past: "Previously completed initiatives that have created lasting change.",
  };

  const displayTitle = title || defaultTitles[status];
  const displayDescription = description || defaultDescriptions[status];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Status-specific styles for visual differentiation
  const statusStyles = {
    upcoming:
      "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
    current:
      "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
    past: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
  };

  return (
    <section ref={sectionRef} className={`py-10 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {displayTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {displayDescription}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {filteredProjects.length === 0 ? (
            <div
              className={`rounded-lg border p-8 text-center ${statusStyles[status]}`}
            >
              <p className="text-muted-foreground">
                No {status} projects available at this time.
              </p>
              {status === "upcoming" && (
                <p className="text-sm mt-2">
                  Check back soon for new initiatives!
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={cardVariants}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FilteredProjects;
