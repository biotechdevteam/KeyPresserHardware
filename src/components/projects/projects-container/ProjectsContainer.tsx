"use client";
import React, { useState, useMemo } from "react";
import { Project } from "@/types/projectSchema";
import UniversalFilter, {
  FilterGroupConfig,
} from "@/components/filters/universal-filter";
import ProjectCard from "../project-card/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProjectsContainerProps {
  projectsData: Project[];
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  projectsData,
}) => {
  // Create a set of unique categories from projectsData
  const categories = useMemo(() => {
    if (!projectsData) return [];
    return Array.from(
      new Set(projectsData.map((project) => project.category).filter(Boolean))
    );
  }, [projectsData]);

  const projectFilterGroups: FilterGroupConfig[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
        { value: "paused", label: "Paused" },
      ],
      defaultValue: "all",
    },
    {
      id: "categories",
      label: "Categories",
      options: [
        { value: "all", label: "All Categories" },
        ...categories.map((cat) => ({ value: cat, label: cat })),
      ],
      multiple: true,
    },
    {
      id: "sort",
      label: "Sort By",
      options: [
        { value: "newest", label: "Newest" },
        { value: "popular", label: "Most Popular" },
        { value: "relevant", label: "Most Relevant" },
      ],
      defaultValue: "newest",
    },
  ];

  const [filters, setFilters] = useState<{
    status: string;
    categories: string[];
    sort: string;
  }>({
    status: "all",
    categories: [],
    sort: "newest",
  });

  const sortedProjects = useMemo(() => {
    if (!projectsData) return [];

    let filtered = [...projectsData];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (project) => project.status === filters.status
      );
    }

    // Filter by categories
    if (filters.categories.length > 0 && filters.categories[0] !== "all") {
      filtered = filtered.filter((project) =>
        filters.categories.includes(project.category)
      );
    }

    // Sorting logic
    if (filters.sort === "newest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    } else if (filters.sort === "popular") {
      filtered = filtered.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    } else if (filters.sort === "relevant") {
      filtered = filtered.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    }

    return filtered;
  }, [filters, projectsData]);

  return (
    <div className="space-y-8">
      <UniversalFilter
        filterGroups={projectFilterGroups}
        onFilterChange={(newFilters) => {
          setFilters({
            status: newFilters.status as string,
            categories: newFilters.categories as string[],
            sort: newFilters.sort as string,
          });
        }}
        variant="pill"
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-sm"
      />

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="wait">
          {sortedProjects.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full"
            >
              <Alert variant="default" className="bg-muted/50 border-muted">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No projects match your current filters. Try adjusting your
                  search criteria.
                </AlertDescription>
              </Alert>
            </motion.div>
          ) : (
            sortedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsContainer;
