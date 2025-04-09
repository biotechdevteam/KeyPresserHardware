import React from "react";
import { Member } from "@/types/memberSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Tag,
  DollarSign,
  Users,
} from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface MemberActivitiesProps {
  member: Member;
  activityType: "articles" | "services" | "projects";
}

// Mock data for demonstration - replace with actual data from API
const mockArticles = [
  {
    id: "1",
    title: "Understanding Modern Web Development",
    excerpt:
      "An exploration of the latest trends and technologies in web development for 2025.",
    coverImage: "/api/placeholder/600/300",
    publishedAt: new Date(2025, 2, 15),
    likes: 124,
    comments: 34,
    tags: ["Web Development", "React", "Next.js"],
  },
  {
    id: "2",
    title: "Building Accessible UI Components",
    excerpt:
      "A guide to creating inclusive user interfaces that work for everyone.",
    coverImage: "/api/placeholder/600/300",
    publishedAt: new Date(2025, 1, 8),
    likes: 89,
    comments: 21,
    tags: ["Accessibility", "UI", "Design"],
  },
];

const mockServices = [
  {
    id: "1",
    title: "UI/UX Design Consultation",
    description:
      "Professional consultation to improve your application's user interface and experience.",
    price: "$150/hour",
    category: "Design",
    availability: "Available",
    rating: 4.9,
  },
  {
    id: "2",
    title: "Full-Stack Development",
    description:
      "End-to-end development of web applications using modern frameworks and technologies.",
    price: "$200/hour",
    category: "Development",
    availability: "Limited Availability",
    rating: 5.0,
  },
];

const mockProjects = [
  {
    id: "1",
    title: "Global Health Initiative",
    role: "Lead Designer",
    description:
      "A collaborative project aimed at improving healthcare accessibility worldwide.",
    status: "In Progress",
    members: 8,
    startDate: new Date(2024, 11, 5),
  },
  {
    id: "2",
    title: "Sustainable Energy Platform",
    role: "Frontend Developer",
    description:
      "Open-source platform for tracking and optimizing energy consumption patterns.",
    status: "Completed",
    members: 5,
    startDate: new Date(2024, 8, 12),
  },
];

const MemberActivities: React.FC<MemberActivitiesProps> = ({
  member,
  activityType,
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Content based on activity type
  const renderContent = () => {
    switch (activityType) {
      case "articles":
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {mockArticles.length > 0 ? (
              mockArticles.map((article) => (
                <motion.div key={article.id} variants={fadeInUp}>
                  <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-primary/10 hover:shadow-md transition-all">
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.coverImage}
                        fill
                        alt={article.title}
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pt-5">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary border-none"
                        >
                          Article
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {formatDistanceToNow(article.publishedAt, {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-muted/60"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center text-sm">
                          <ThumbsUp size={14} className="mr-1" />{" "}
                          {article.likes}
                        </span>
                        <span className="flex items-center text-sm">
                          <MessageSquare size={14} className="mr-1" />{" "}
                          {article.comments}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        Read <ExternalLink size={14} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user_id.first_name} hasn't published any articles yet.`}
                icon={
                  <Calendar className="h-12 w-12 text-muted-foreground/40" />
                }
              />
            )}
          </motion.div>
        );

      case "services":
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {mockServices.length > 0 ? (
              mockServices.map((service) => (
                <motion.div key={service.id} variants={fadeInUp}>
                  <Card className="bg-card/70 backdrop-blur-sm border-primary/10 hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-primary/10 text-primary border-none">
                          {service.category}
                        </Badge>
                        <Badge
                          variant={
                            service.availability.includes("Available")
                              ? "default"
                              : "outline"
                          }
                        >
                          {service.availability}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex items-center mt-1 text-amber-500">
                        {"★".repeat(Math.floor(service.rating))}
                        <span className="ml-1 text-sm text-muted-foreground">
                          ({service.rating})
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center font-medium">
                        <DollarSign size={16} className="mr-1 text-green-600" />
                        {service.price}
                      </div>
                      <Button>Contact for Service</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user_id.first_name} isn't offering any services at the moment.`}
                icon={
                  <DollarSign className="h-12 w-12 text-muted-foreground/40" />
                }
              />
            )}
          </motion.div>
        );

      case "projects":
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {mockProjects.length > 0 ? (
              mockProjects.map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Card className="bg-card/70 backdrop-blur-sm border-primary/10 hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="border-primary/20">
                          {project.role}
                        </Badge>
                        <Badge
                          className={`${
                            project.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-1" />
                        Started{" "}
                        {formatDistanceToNow(project.startDate, {
                          addSuffix: true,
                        })}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users size={14} className="mr-1" />
                        {project.members} contributors
                      </div>
                      <Button variant="outline">View Project</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user_id.first_name} isn't part of any public projects yet.`}
                icon={<Users className="h-12 w-12 text-muted-foreground/40" />}
              />
            )}
          </motion.div>
        );
    }
  };

  return renderContent();
};

// Component for empty states
const EmptyState = ({
  message,
  icon,
}: {
  message: string;
  icon: React.ReactNode;
}) => (
  <Card className="bg-card/70 backdrop-blur-sm border-primary/10 py-12">
    <CardContent className="flex flex-col items-center justify-center text-center">
      <div className="mb-4">{icon}</div>
      <p className="text-muted-foreground">{message}</p>
    </CardContent>
  </Card>
);

export default MemberActivities;
