import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import SocialLinks from "../member-links/Sociallinks";
import { Separator } from "@/components/ui/separator";

interface MemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6"
    >
      {/* Bio */}
      {member.bio && (
        <motion.div variants={itemFadeIn}>
          <Card className="bg-card/70 backdrop-blur-sm border-primary/10 overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
                About
              </h2>
              <p className="text-foreground leading-relaxed">{member.bio}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Skills & Interests */}
      <motion.div
        variants={itemFadeIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Skills */}
        {member.skills && member.skills.length > 0 && (
          <Card className="bg-card/70 backdrop-blur-sm border-primary/10 h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none py-1 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Interests */}
        {member.interests && member.interests.length > 0 && (
          <Card className="bg-card/70 backdrop-blur-sm border-primary/10 h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {member.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-transparent hover:bg-muted transition-colors py-1 px-3"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Contact & Resume */}
      <motion.div variants={itemFadeIn}>
        <Card className="bg-card/70 backdrop-blur-sm border-primary/10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Social Links */}
              {member.social_links && member.social_links.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Connect with {member.user_id.first_name}
                  </h2>
                  <SocialLinks links={member.social_links} />
                </div>
              )}

              {/* Resume */}
              {member.resume_url && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Resume
                  </h2>
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Resume
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      <a
                        href={member.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        View Online
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Education, if available */}
            {/* {member.education && member.education.length > 0 && (
              <>
                <Separator className="my-6" />
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Education
                  </h2>
                  <ul className="space-y-4">
                    {member.education.map((edu, index) => (
                      <li
                        key={index}
                        className="bg-background/40 p-4 rounded-lg"
                      >
                        <h3 className="font-medium">
                          {edu.degree}, {edu.institution}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.start_date} - {edu.end_date || "Present"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )} */}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MemberDetails;
