import React from "react";
import { Project } from "@/types/projectSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Link, useTransitionRouter } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useTransitionRouter();

  return (
    <Card className="h-full overflow-hidden border-muted/50 group">
      <div className="relative">
        {/* Thumbnail Image with gradient overlay */}
        {project.projectImageUrl ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.projectImageUrl}
              alt={project.title}
              width={500}
              height={250}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-r from-muted/50 to-muted" />
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="font-medium capitalize">
            {project.category}
          </Badge>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="font-medium capitalize">{project.status}</Badge>
        </div>
      </div>

      <CardHeader className="pt-4 pb-0">
        <h3 className="text-xl font-semibold tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Project date */}
        {project.startDate && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(project.startDate), "MMM yyyy")}
            {project.endDate &&
              ` - ${format(new Date(project.endDate), "MMM yyyy")}`}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-3 pb-0">
        {/* Summary with ellipsis for long text */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.summary}
        </p>

        {/* Progress Bar */}
        {project.progress !== undefined && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-start text-xs">
              <span className="mb-4">Completion</span>
            </div>
            <Progress value={project.progress} className="h-2 bg-muted" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 pb-4">
        <Button
          variant="default"
          className="w-full group-hover:translate-y-0 translate-y-0 group-hover:shadow-md transition-all"
          onClick={() =>
            router.push(`/projects/${project._id}`, {
              onTransitionReady: slideInOut,
            })
          }
        >
          <span className="mr-auto">Read More</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
