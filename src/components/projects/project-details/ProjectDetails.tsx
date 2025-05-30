"use client";
import React from "react";
import { Project } from "@/types/projectSchema";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import ProjectHeader from "@/components/projects/project-header/ProjectHeader";
import Image from "next/image";
import { Link, useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { Badge } from "@/components/ui/badge";
import { Share2, Download, ThumbsUp, MessageSquare } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const router = useTransitionRouter();

  // Calculate completion percentage
  const completedMilestones =
    project.milestones?.filter((m) => m.completed).length || 0;
  const totalMilestones = project.milestones?.length || 1;
  const progressPercentage = Math.round(
    (completedMilestones / totalMilestones) * 100
  );

  // Function to share using Web Share API
  const shareProject = async () => {
    try {
      // Check if Web Share API is supported
      if (!navigator.share) {
        throw new Error("Web Share API is not supported in this browser.");
      }

      const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
      const shareUrl = `${websiteUrl}/projects/${project._id}`;

      await navigator.share({
        title: `Support ${project.title} - BioTec Universe`,
        text: `I've just contributed to "${project.title}", an innovative bioTec Universe project. Learn more and join me in supporting this groundbreaking work!`,
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing project:", error);
      // Optionally, you could add a fallback here, like copying to clipboard
      // or showing a user-friendly message
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full mx-auto max-w-6xl p-4 md:p-6 space-y-8"
    >
      <ProjectHeader
        title={project.title}
        summary={project.summary}
        backgroundImageUrl={project.projectImageUrl}
      />

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-between items-center bg-card rounded-lg p-4 shadow">
        <div className="flex items-center gap-2 capitalize">
          <Badge variant="outline">{project.category}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={shareProject}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="default"
            onClick={() =>
              router.push("/donate", { onTransitionReady: slideInOut })
            }
          >
            Support Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Project Description Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Project Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </CardContent>
          </Card>

          {/* Multimedia Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Project Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              {project.multimedia && project.multimedia.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.multimedia.map((mediaItem, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                          {mediaItem.type === "image" ? (
                            <Image
                              src={mediaItem.url}
                              alt={`Project Media ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <video
                              src={mediaItem.url}
                              controls
                              className="w-full h-full object-cover rounded-xl"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No media available for this project.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Project Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.members.map((member, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 h-6" />
                    <CardHeader className="pt-2">
                      <div className="flex justify-center -mt-8">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-background">
                          <Image
                            src={
                              member.memberId.profile_photo_url ||
                              "/placeholder-avatar.jpg"
                            }
                            alt={member.memberId.user.first_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <h4 className="font-medium">
                        {member.memberId.user.first_name +
                          " " +
                          member.memberId.user.last_name}
                      </h4>
                      <p className="text-sm text-primary/80 font-medium">
                        {member.roleInProject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {member.memberId.bio}
                      </p>
                    </CardContent>
                    <CardFooter className="justify-center pt-0">
                      <Button variant="link" asChild className="text-primary">
                        <Link href={`/members/${member.memberId._id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments and Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Comments and Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/40 rounded-lg p-8 text-center">
                <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground">
                  No comments yet. Be the first to leave feedback!
                </p>
                <Button variant="outline" className="mt-4">
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Project Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-start items-center">
                <span className="text-sm font-medium">Progress</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />

              <div className="mt-6 space-y-3">
                {project.milestones?.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex-shrink-0 ${
                        goal.completed ? "bg-green-500" : "bg-muted"
                      }`}
                    >
                      {goal.completed && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        goal.completed
                          ? "line-through text-muted-foreground"
                          : "font-medium"
                      }`}
                    >
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collaboration Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Collaboration Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.collaborationOpportunities &&
              project.collaborationOpportunities.length > 0 ? (
                <div className="space-y-3">
                  {project.collaborationOpportunities.map((opportunity) => (
                    <div
                      key={opportunity._id}
                      className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-medium text-primary">
                        {opportunity.expertise}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {opportunity.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No collaboration opportunities available at the moment.
                </p>
              )}
              <Button
                className="w-full"
                onClick={() =>
                  router.push("/apply", { onTransitionReady: slideInOut })
                }
                disabled={
                  !project.collaborationOpportunities ||
                  project.collaborationOpportunities.length === 0
                }
              >
                Apply to Collaborate
              </Button>
            </CardContent>
          </Card>

          {/* Documents and Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {project.documents && project.documents.length > 0 ? (
                <div className="space-y-2">
                  {project.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <Link
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex-grow truncate"
                      >
                        {doc.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={() => Download(doc.url as any)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No documents available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Partners & Sponsors */}
          {project.partners && project.partners.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Partners & Sponsors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {project.partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative w-16 h-16 mb-2">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-center text-xs font-medium truncate w-full">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
