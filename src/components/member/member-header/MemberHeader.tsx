import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MemberHeaderProps {
  member: Member;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ member }) => {
  return (
    <Card className="w-full max-w-4xl bg-card shadow-lg rounded-lg p-6 mb-8">
      <CardContent className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center">
        {/* Avatar */}
        <Avatar className="w-32 h-32 justify-self-center lg:justify-self-start">
          <AvatarImage
            src={member.user_id.profile_photo_url}
            alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
          />
          <AvatarFallback>{`${member.user_id.first_name[0]}${member.user_id.last_name[0]}`}</AvatarFallback>
        </Avatar>

        {/* Member Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-primary">
            {`${member.user_id.first_name} ${member.user_id.last_name}`}
          </h1>
          <p className="text-lg text-accent">
            {member.specialization || "Specialization not provided"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberHeader;
