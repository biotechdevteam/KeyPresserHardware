import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { LeadershipTeam } from "@/types/aboutSchema";

interface AboutTeamProps {
  leadershipTeam: LeadershipTeam[] | undefined;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ leadershipTeam }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadershipTeam?.map((member, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            {/* Avatar with Tooltip */}
            <Tooltip>
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={member.member.profile_photo_url}
                  alt={member.member.last_name}
                />
                <AvatarFallback>
                  {member.member.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Tooltip>

            {/* Name and Role */}
            <div className="text-center">
              <h3 className="text-lg font-bold">{member.member.last_name}</h3>
              <p className="text-sm text-gray-500">{member.member.user_type}</p>
            </div>

            {/* Bio and Skills Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm">
                  View Bio
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <h4 className="text-md font-bold mb-2">Bio</h4>
                <p className="text-sm text-gray-700">
                  {member.member.bio || "No bio available."}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AboutTeam;
