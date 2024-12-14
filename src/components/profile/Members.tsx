"use client";

import React from "react";
import { Member } from "@/types/memberSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <Card key={member._id} className="shadow-md hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={member.user_id.profile_photo_url || ""} />
              <AvatarFallback>
                {member.user_id.first_name[0]}
                {member.user_id.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {member.user_id.first_name} {member.user_id.last_name}
              </CardTitle>
              <p className="text-sm">
                {member.specialization || "No specialization"}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {member.bio?.slice(0, 100) || "No bio provided"}...
            </p>
            <p className="text-xs mt-2">
              Address: {member.address || "Not provided"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Members;
