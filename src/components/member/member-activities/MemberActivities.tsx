import React from "react";
import { Member } from "@/types/memberSchema";
import { Project } from "@/types/projectSchema";
import { Service } from "@/types/ServiceSchema";
import { Blog } from "@/types/blogSchema";
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
  Star,
  MapPin,
  Briefcase,
  BookOpen,
  Heart,
  Eye,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";

interface MemberActivitiesProps {
  member: Member;
  activityType: "articles" | "services" | "projects";
  data?: {
    articles?: Blog[];
    services?: Service[];
    projects?: Project[];
  };
}

const MemberActivities: React.FC<MemberActivitiesProps> = ({
  member,
  activityType,
  data = {},
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const hoverScale = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const shimmer = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "ongoing":
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "upcoming":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  // Content based on activity type
  const renderContent = () => {
    switch (activityType) {
      case "articles":
        const articles = data.articles || [];
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {articles.length > 0 ? (
              articles.map((article) => (
                <motion.div
                  key={article._id}
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <motion.div variants={hoverScale}>
                    <Card className="group overflow-hidden backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {article.featuredImageUrl && (
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={article.featuredImageUrl}
                            fill
                            alt={article.title}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Floating badge */}
                          <motion.div
                            className="absolute top-4 left-4"
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <Badge className="border-0 shadow-lg">
                              <BookOpen size={14} className="mr-1" />
                              Article
                            </Badge>
                          </motion.div>
                        </div>
                      )}

                      <CardHeader className="relative pt-6">
                        <div className="flex justify-between items-start mb-3">
                          {!article.featuredImageUrl && (
                            <Badge>
                              <BookOpen size={14} className="mr-1" />
                              Article
                            </Badge>
                          )}
                          <div className="flex items-center text-sm text-muted-foreground bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            <Calendar size={14} className="mr-2" />
                            {formatDistanceToNow(new Date(article.createdAt), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>

                        <CardTitle className="text-2xl font-bold  cursor-pointer">
                          {article.title}
                        </CardTitle>

                        <CardDescription className="text-base mt-3 leading-relaxed">
                          {article.summary}
                        </CardDescription>

                        {/* Category tag */}
                        <div className="flex items-center mt-4">
                          <Badge variant="outline">
                            <Tag size={12} className="mr-1" />
                            {article.category}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardFooter className="flex justify-between items-center border-t">
                        <div className="flex items-center gap-6">
                          <motion.span
                            className="flex items-center text-sm text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart size={16} className="mr-2" />
                            {article.reactions?.filter(
                              (r) => r.reactionType === "like"
                            ).length || 0}
                          </motion.span>
                          <motion.span
                            className="flex items-center text-sm text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare size={16} className="mr-2" />
                            {article.comments?.length || 0}
                          </motion.span>
                        </div>

                        <Button size="sm">
                          Read Article
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowUpRight size={16} />
                          </motion.div>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user.first_name} hasn't published any articles yet.`}
                icon={
                  <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                }
                actionText="Encourage them to share their knowledge!"
              />
            )}
          </motion.div>
        );

      case "services":
        const services = data.services || [];
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {services.length > 0 ? (
              services.map((service) => (
                <motion.div
                  key={service._id}
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <motion.div variants={hoverScale}>
                    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5"
                        variants={shimmer}
                        animate="animate"
                      />

                      <CardHeader className="relative">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Badge>
                              <Briefcase size={14} className="mr-1" />
                              {service.service_category}
                            </Badge>
                            <Badge variant="outline">
                              {service.service_type}
                            </Badge>
                          </div>

                          {service.is_verified && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.3, type: "spring" }}
                            >
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0 shadow-sm">
                                ✓ Verified
                              </Badge>
                            </motion.div>
                          )}
                        </div>

                        <CardTitle className="text-2xl font-bold ">
                          {service.title}
                        </CardTitle>

                        <CardDescription className="text-base mt-3 leading-relaxed">
                          {service.summary}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>

                        {/* Pricing Plans */}
                        {service.pricing_plans.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                              Pricing Plans
                            </h4>
                            <div className="grid gap-3">
                              {service.pricing_plans
                                .slice(0, 2)
                                .map((plan, idx) => (
                                  <motion.div
                                    key={idx}
                                    className="flex justify-between items-center p-3 bg-white/60 rounded-lg border border-gray-100"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    <div>
                                      <p className="font-medium">{plan.name}</p>
                                      {plan.description && (
                                        <p className="text-sm text-muted-foreground">
                                          {plan.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-emerald-500">
                                        ${plan.price}
                                      </p>
                                      {plan.billing_cycle && (
                                        <p className="text-xs text-muted-foreground">
                                          /{plan.billing_cycle}
                                        </p>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="flex justify-between items-center border-t">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Users size={16} className="mr-2" />
                            {service.service_providers?.length || 0} providers
                          </span>
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Calendar size={16} className="mr-2" />
                            {service.bookings?.length || 0} bookings
                          </span>
                        </div>

                        <Button>
                          Book Service
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user.first_name} isn't offering any services at the moment.`}
                icon={
                  <Briefcase className="h-16 w-16 text-muted-foreground/30" />
                }
                actionText="Check back later for new offerings!"
              />
            )}
          </motion.div>
        );

      case "projects":
        const projects = data.projects || [];
        return (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <motion.div variants={hoverScale}>
                    <Card className="group overflow-hidden bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                      {/* Project image if available */}
                      {project.projectImageUrl && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={project.projectImageUrl}
                            fill
                            alt={project.title}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      )}

                      <CardHeader className="relative">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Badge>
                              <Users size={14} className="mr-1" />
                              Project
                            </Badge>
                            <Badge variant="outline">{project.category}</Badge>
                          </div>

                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>

                        <CardTitle className="text-2xl font-bold">
                          {project.title}
                        </CardTitle>

                        <CardDescription className="text-base mt-3 leading-relaxed">
                          {project.summary}
                        </CardDescription>

                        {/* Project timeline */}
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Started{" "}
                            {format(new Date(project.startDate), "MMM yyyy")}
                          </span>
                          {project.endDate && (
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              Ends{" "}
                              {format(new Date(project.endDate), "MMM yyyy")}
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        {/* Progress bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Progress
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                delay: 0.5,
                              }}
                            />
                          </div>
                        </div>

                        {/* Milestones */}
                        {project.milestones &&
                          project.milestones.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                Milestones
                              </h4>
                              <div className="space-y-2">
                                {project.milestones
                                  .slice(0, 3)
                                  .map((milestone) => (
                                    <div
                                      key={milestone._id}
                                      className="flex items-center gap-2"
                                    >
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          milestone.completed
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                        }`}
                                      />
                                      <span
                                        className={`text-sm ${
                                          milestone.completed
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-muted-foreground"
                                        }`}
                                      >
                                        {milestone.title}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                      </CardContent>

                      <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4 bg-white/30">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center text-sm text-muted-foreground">
                            <Users size={16} className="mr-2" />
                            {project.members.length} members
                          </span>
                          {project.collaborationOpportunities &&
                            project.collaborationOpportunities.length > 0 && (
                              <span className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
                                <Star size={16} className="mr-1" />
                                Open for collaboration
                              </span>
                            )}
                        </div>

                        <Button variant="outline">
                          View Project
                          <ExternalLink size={16} className="ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <EmptyState
                message={`${member.user.first_name} isn't part of any public projects yet.`}
                icon={<Users className="h-16 w-16 text-muted-foreground/30" />}
                actionText="Great projects start with great ideas!"
              />
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

// Enhanced empty state component
const EmptyState = ({
  message,
  icon,
  actionText,
}: {
  message: string;
  icon: React.ReactNode;
  actionText?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <Card className="border-0 shadow-lg py-16">
      <CardContent className="flex flex-col items-center justify-center text-center space-y-6">
        <motion.div
          className="p-6 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-muted-foreground">{message}</p>
          {actionText && (
            <p className="text-sm text-muted-foreground/70">{actionText}</p>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default MemberActivities;
