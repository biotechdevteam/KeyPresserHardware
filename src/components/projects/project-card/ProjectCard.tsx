import React from "react";
import { Project } from "@/types/projectSchema"; // Assuming you have a Project type definition
import { Button } from "@/components/ui/button"; // shadcn button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn card components

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="max-w-sm w-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-card text-card-foreground">
      {/* Thumbnail Image */}
      {project.projectImageUrl && (
        <img
          className="w-full h-40 object-cover"
          src={project.projectImageUrl}
          alt={project.title}
        />
      )}

      <CardHeader>
        {/* Title */}
        <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Brief Description */}
        <p className="mt-2 mb-4 text-sm">
          {project.summary}
        </p>

        {/* Category/Tags */}
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {project.category}
        </p>

        {/* Progress Bar / Status Indicator */}
        {project.progress !== undefined && (
          <div className="w-full bg-muted rounded-full h-2.5 mt-3">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        )}

        {/* CTA Button */}
        <Button asChild className="mt-4 w-full">
          <a
            href={`/projects/${project._id}`}
            className="block w-full text-center"
          >
            Learn More
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
