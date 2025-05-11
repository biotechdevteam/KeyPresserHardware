"use client";
import React, { useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  LinkedinIcon,
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  DribbbleIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Member } from "@/types/memberSchema";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import PlaceholderImg from "../../../../public/images/Profile_placeholder.png";
import Link from "next/link";
import { slideInOut } from "@/lib/utils/pageTransitions";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const EXECUTIVE_ROLES = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "CEO",
  "Director",
  "Manager",
  "Coordinator",
  "Advisor",
];

const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) return <LinkedinIcon className="w-5 h-5" />;
  if (url.includes("facebook.com")) return <FacebookIcon className="w-5 h-5" />;
  if (url.includes("instagram.com"))
    return <InstagramIcon className="w-5 h-5" />;
  if (url.includes("twitter.com")) return <TwitterIcon className="w-5 h-5" />;
  if (url.includes("github.com")) return <GithubIcon className="w-5 h-5" />;
  if (url.includes("dribbble.com")) return <DribbbleIcon className="w-5 h-5" />;
  return <ExternalLinkIcon className="w-5 h-5" />;
};

interface MembersProps {
  members: Member[];
  isExecutiveBoard?: boolean;
}

const Members: React.FC<MembersProps> = ({
  members,
  isExecutiveBoard = false,
}) => {
  const teamRef = useRef<HTMLDivElement | null>(null);
  const router = useTransitionRouter();

  const filteredMembers = isExecutiveBoard
    ? members.filter(
        (member) =>
          member.role &&
          EXECUTIVE_ROLES.some((role) =>
            member.role?.toLowerCase().includes(role.toLowerCase())
          )
      )
    : members;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isExecutiveBoard ? 0.1 : 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Define grid layout based on page type
  const gridLayout = isExecutiveBoard
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4";

  return (
    <motion.div
      className="py-8"
      ref={teamRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {filteredMembers.length > 0 ? (
        <motion.div
          className={`grid ${gridLayout} px-4 lg:px-16`}
          variants={containerVariants}
        >
          {filteredMembers.map((member, index) => (
            <motion.div key={index} variants={cardVariants}>
              {isExecutiveBoard ? (
                // Executive board card - larger with more details
                <Card
                  className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-card h-full flex flex-col overflow-hidden cursor-pointer group hover:border-primary/30"
                  onClick={() =>
                    router.push(`/members/${member._id}`, {
                      onTransitionReady: slideInOut,
                    })
                  }
                >
                  <CardHeader className="relative p-6 pb-2 flex items-center justify-center">
                    <div className="relative h-36 w-36 rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                      <Image
                        src={
                          member.user_id?.profile_photo_url || PlaceholderImg.src
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, 144px"
                        alt={
                          member.user_id
                            ? `${member.user_id.first_name} ${member.user_id.last_name}`
                            : "Unknown Member"
                        }
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 flex-grow flex flex-col">
                    <div className="text-center mb-2">
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {member.user_id
                          ? `${member.user_id.first_name} ${member.user_id.last_name}`
                          : "Unknown Member"}
                      </CardTitle>

                      {member.role && (
                        <Badge
                          variant="outline"
                          className="mt-2 bg-primary/10 text-primary font-medium"
                        >
                          {member.role}
                        </Badge>
                      )}

                      {member.specialization && (
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mt-2">
                          {member.specialization}
                        </p>
                      )}
                    </div>

                    {member.bio && (
                      <p className="mt-4 text-sm text-muted-foreground line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                        {member.bio}
                      </p>
                    )}
                  </CardContent>

                  {member.social_links && member.social_links.length > 0 && (
                    <CardFooter className="flex justify-center space-x-4 p-4 border-t">
                      {member.social_links.map((link, i) => (
                        <Link
                          key={i}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                        >
                          {getSocialIcon(link)}
                        </Link>
                      ))}
                    </CardFooter>
                  )}
                </Card>
              ) : (
                // Members page card - compact with minimal details
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card
                        className="rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-card flex flex-col cursor-pointer group h-full hover:border-primary/20"
                        onClick={() =>
                          router.push(`/members/${member._id}`, {
                            onTransitionReady: slideInOut,
                          })
                        }
                      >
                        <div className="p-3 pb-2 flex items-center justify-center">
                          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all duration-300">
                            <Image
                              src={
                                member.user_id?.profile_photo_url ||
                                PlaceholderImg.src
                              }
                              fill
                              sizes="(max-width: 640px) 64px, 80px"
                              alt={
                                member.user_id
                                  ? `${member.user_id.first_name} ${member.user_id.last_name}`
                                  : "Unknown Member"
                              }
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        <div className="px-2 py-1 text-center flex-grow flex flex-col justify-center">
                          <h3 className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1 transition-colors duration-300">
                            {member.user_id
                              ? `${member.user_id.first_name} ${member.user_id.last_name}`
                              : "Unknown Member"}
                          </h3>

                          {member.role && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {member.role}
                            </p>
                          )}
                        </div>

                        <div
                          className={cn(
                            "flex justify-between items-center px-3 py-2 mt-1",
                            member.social_links && member.social_links.length > 0
                              ? "border-t"
                              : ""
                          )}
                        >
                          {member.social_links &&
                          member.social_links.length > 0 ? (
                            <div className="flex space-x-2">
                              {member.social_links.slice(0, 2).map((link, i) => (
                                <Link
                                  key={i}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {getSocialIcon(link)}
                                </Link>
                              ))}
                              {member.social_links.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{member.social_links.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <ChevronRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="text-center">
                        <p className="font-medium">
                          {member.user_id
                            ? `${member.user_id.first_name} ${member.user_id.last_name}`
                            : "Unknown Member"}
                        </p>
                        {member.role && (
                          <p className="text-xs">{member.role}</p>
                        )}
                        {member.specialization && (
                          <p className="text-xs italic mt-1">
                            {member.specialization}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Enhanced fallback for no members
        <div className="text-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No Members Found
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              It looks like we don’t have any {isExecutiveBoard ? "executive board" : "team"} members to display right now. Check back later or contact us for more information!
            </p>
            <Button
              variant="outline"
              onClick={() => router.push("/contact")}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Members;