import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MemberHeaderProps {
  member: Member;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ member }) => {
  const joinDate = member.user.created_at
    ? new Date(member.user.created_at)
    : new Date();
  const memberSince = formatDistanceToNow(joinDate, { addSuffix: true });

  return (
    <Card className="w-full max-w-4xl overflow-hidden bg-card/70 backdrop-blur-sm shadow-lg rounded-xl mb-8 border-primary/20">
      <CardContent className="relative p-6">
        {/* Status indicator */}
        <div className="flex items-start justify-end">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
            Active
          </span>
        </div>

        <Avatar className="w-24 h-24 border-4 border-background shadow-md ring-2 ring-primary/20">
          <AvatarImage
            src={member.profile_photo_url}
            alt={`${member.user.first_name} ${member.user.last_name}`}
            className="object-cover"
          />
          <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
            {`${member.user.first_name?.[0]}${member.user.last_name?.[0]}`}
          </AvatarFallback>
        </Avatar>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          {/* Member Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {`${member.user.first_name} ${member.user.last_name}`}
              </h1>
            </div>

            <p className="text-lg font-medium text-primary mt-1">
              {member.specialization || "Specialization not provided"}
            </p>

            {/* Additional info */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
              {member.address && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{member.address}</span>
                </span>
              )}
              {member.user.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{member.user.email}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Joined {memberSince}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberHeader;
