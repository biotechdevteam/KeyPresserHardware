import React from "react";
import { Card } from "@/components/ui/card";

interface LeadershipMember {
  name: string;
  role: string;
  linkedin?: string;
}

interface AboutTeamProps {
  leadershipTeam: LeadershipMember[] | undefined;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ leadershipTeam }) => {
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-semibold">Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leadershipTeam?.map((member, index) => (
          <div key={index} className="p-2 border rounded-lg">
            <h3 className="font-bold">{member.name}</h3>
            <p>{member.role}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AboutTeam;
