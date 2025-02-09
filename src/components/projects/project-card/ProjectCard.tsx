import React from "react";
import { Project } from "@/types/projectSchema"; // Assuming you have a Project type definition
import { Button } from "@/components/ui/button"; // shadcn button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn card components
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Link, useTransitionRouter } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { slideInOut } from "@/lib/utils/pageTransitions";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useTransitionRouter();
  return (
    <Card className="max-w-sm w-full h-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="absolute top-2 right-2">
        <Badge variant="outlineSecondary">{project.category}</Badge>
      </div>

      {/* Thumbnail Image */}
      {project.projectImageUrl && (
        <Image
          src={project.projectImageUrl}
          alt={project.title}
          width={500}
          height={100}
          className="w-full h-40 object-cover"
        />
      )}

      <CardHeader>
        <CardTitle className="text-lg tracking-wide">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Summary */}
        <p className="mb-8 text-sm">{project.summary}</p>

        {/* Progress Bar / Status Indicator */}
        {project.progress !== undefined && (
          <Progress value={project.progress} showValue />
        )}

        {/* CTA Button */}
        <Link href={`/projects/${project._id}`}>
          <Button
            className="mt-4 w-full"
            onClick={() =>
              router.push(`/projects/${project._id}`, {
                onTransitionReady: slideInOut,
              })
            }
          >
            Read More <BookOpen className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
