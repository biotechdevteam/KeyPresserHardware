"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectsData } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import Link from "next/link";
import { Project } from "@/types/projectSchema";
import Error from "@/app/[locale]/error";

const localizer = momentLocalizer(moment);

const ProjectsCalendarPage = () => {
  const {
    data: projectsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  // Map projects to a format suitable for react-big-calendar
  const mappedProjects =
    projectsData?.map((project: Project) => ({
      title: project.title,
      start: new Date(project.startDate),
      end: project.endDate
        ? new Date(project.endDate)
        : new Date(project.startDate),
      allDay: true,
      rawProject: project,
    })) || [];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Project Calendar</h1>
      <Calendar
        localizer={localizer}
        events={mappedProjects}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => handleProjectClick(event.rawProject)}
        style={{ height: "75vh" }}
        className="shadow-lg border rounded-lg"
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        popup
      />

      {/* Dialog for project details */}
      {selectedProject && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">{selectedProject.description}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Start:</Badge>
                <span>
                  {format(new Date(selectedProject.startDate), "PPpp")}
                </span>
              </div>
              {selectedProject.endDate && (
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">End:</Badge>
                  <span>
                    {format(new Date(selectedProject.endDate), "PPpp")}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Category:</Badge>
                <span>{selectedProject.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Status:</Badge>
                <span>{selectedProject.status}</span>
              </div>
              <div className="text-center">
                <Link href={`/projects/${selectedProject._id}`}>
                  <Button>View Project Details</Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectsCalendarPage;
