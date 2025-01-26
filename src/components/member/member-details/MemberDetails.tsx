import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import SocialLinks from "../member-links/Sociallinks";
import { redirect } from "next/navigation";

interface MemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ member }) => {
  return (
    <Card className="w-full max-w-4xl bg-background shadow-lg rounded-lg p-6 mb-8">
      <CardContent>
        {/* Bio */}
        {member.bio && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Bio</h2>
            <p className="text-foreground mt-2">{member.bio}</p>
          </div>
        )}

        {/* Skills */}
        {member.skills && member.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {member.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-transparent text-foreground border-lg"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {member.interests && member.interests.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Interests</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {member.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="bg-transparent text-foreground border-lg"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {member.social_links && member.social_links.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Follow {member.user_id.first_name} on{" "}
            </h2>
            <SocialLinks links={member.social_links} />{" "}
            {/* Use the SocialLinks component */}
          </div>
        )}

        {/* Resume */}
        {member.resume_url && (
          <div className="mb-4">
            <Button asChild>
              <a
                href={member.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </Button>
          </div>
        )}

        {/* Address */}
        {member.address && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <p className="text-foreground mt-2">{member.address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberDetails;
