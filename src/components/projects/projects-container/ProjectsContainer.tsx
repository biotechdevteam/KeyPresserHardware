"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/fetchUtils";
import { Project } from "@/types/projectSchema";
import ProjectFilters from "../project-filters/ProjectFilters";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ProjectCard from "../project-card/ProjectCard";

interface ProjectsContainerProps {
  initialData: Project[];
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  initialData,
}) => {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
    initialData,
  });

  const [filters, setFilters] = useState<{
    search: string;
    category: string;
    status: "ongoing" | "completed" | "paused";
    startDate?: string;
    endDate?: string;
    sortOption: "newest" | "popular" | "relevant"; // Added sortOption state
  }>({
    search: "",
    category: "",
    status: "ongoing",
    startDate: undefined,
    endDate: undefined,
    sortOption: "newest",
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const sortedProjects = useMemo(() => {
    if (!projectsData) return [];

    // Filtering logic based on user input
    let filtered = projectsData.filter((project) => {
      const matchesSearch =
        !filters.search ||
        project.title.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category || project.category === filters.category;

      const matchesStatus = project.status === filters.status;

      const matchesStartDate =
        !filters.startDate ||
        new Date(project.startDate) >= new Date(filters.startDate);

      const matchesEndDate =
        !filters.endDate ||
        (project.endDate &&
          new Date(project.endDate) <= new Date(filters.endDate));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesStartDate &&
        matchesEndDate
      );
    });

    // Sorting logic
    if (filters.sortOption === "newest") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    } else if (filters.sortOption === "popular") {
      filtered = filtered.sort((a, b) => b.progress - a.progress);
    } else if (filters.sortOption === "relevant") {
      filtered = filtered.sort((a, b) => b.progress - a.progress);
    }

    return filtered;
  }, [filters, projectsData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading projects...</div>;

  return (
    <div className="relative grid place-items-center p-6">
      <Popover>
        <PopoverTrigger>Filter Preferences</PopoverTrigger>
        <PopoverContent className="w-full">
          <ProjectFilters onFilterChange={handleFilterChange} />
        </PopoverContent>
      </Popover>

      {/* Selected Preferences Indicator */}
      <div className="p-4 mt-4 rounded-md shadow-md text-sm max-w-md">
        <h3 className="font-semibold mb-2 text-gray-700">Applied Filters</h3>
        <ul className="space-x-2 flex">
          {filters.search && (
            <li>
              <span className="font-bold text-gray-600">Search:</span>{" "}
              <span className="text-gray-800">{filters.search}</span>
            </li>
          )}
          {filters.category && (
            <li>
              <span className="font-bold text-gray-600">Category:</span>{" "}
              <span className="text-gray-800">{filters.category}</span>
            </li>
          )}
          {filters.status && (
            <li>
              <span className="font-bold text-gray-600">Status:</span>{" "}
              <span className="text-gray-800">
                {filters.status.charAt(0).toUpperCase() +
                  filters.status.slice(1)}
              </span>
            </li>
          )}
          {filters.startDate && (
            <li>
              <span className="font-bold text-gray-600">Start Date:</span>{" "}
              <span className="text-gray-800">
                {new Date(filters.startDate).toLocaleDateString()}
              </span>
            </li>
          )}
          {filters.endDate && (
            <li>
              <span className="font-bold text-gray-600">End Date:</span>{" "}
              <span className="text-gray-800">
                {new Date(filters.endDate).toLocaleDateString()}
              </span>
            </li>
          )}
          {filters.sortOption && (
            <li>
              <span className="font-bold text-gray-600">Sort By:</span>{" "}
              <span className="text-gray-800 capitalize">
                {filters.sortOption}
              </span>
            </li>
          )}
          {!filters.search &&
            !filters.category &&
            !filters.status &&
            !filters.startDate &&
            !filters.endDate &&
            !filters.sortOption && (
              <li className="text-gray-500">No filters applied</li>
            )}
        </ul>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sortedProjects.length === 0 ? (
          <div>No projects found</div>
        ) : (
          sortedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsContainer;
