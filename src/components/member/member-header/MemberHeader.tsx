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
  const joinDate = member.user_id.created_at
    ? new Date(member.user_id.created_at)
    : new Date();
  const memberSince = formatDistanceToNow(joinDate, { addSuffix: true });

  return (
    <Card className="w-full max-w-4xl overflow-hidden bg-card/70 backdrop-blur-sm shadow-lg rounded-xl mb-8 border-primary/20">
      {/* Cover image - can be a gradient or an actual image if available */}
      <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 relative">
        {member.user_id.profile_photo_url && (
          <img
            src={member.user_id.profile_photo_url}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardContent className="relative pt-16 pb-6 px-6">
        {/* Avatar positioned to overlap the cover and content */}
        <Avatar className="absolute -top-12 left-6 w-24 h-24 border-4 border-background shadow-md ring-2 ring-primary/20">
          <AvatarImage
            src={member.user_id.profile_photo_url}
            alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
            className="object-cover"
          />
          <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
            {`${member.user_id.first_name?.[0]}${member.user_id.last_name?.[0]}`}
          </AvatarFallback>
        </Avatar>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
          {/* Member Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {`${member.user_id.first_name} ${member.user_id.last_name}`}
              </h1>
              {/* {member.user_id.is_verified && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 py-1 px-2 h-auto"
                >
                  Verified
                </Badge>
              )} */}
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
              {member.user_id.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>{member.user_id.email}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Joined {memberSince}</span>
              </span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-start justify-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
              Active
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberHeader;
