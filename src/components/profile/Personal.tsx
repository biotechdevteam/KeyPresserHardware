import React from "react";
import { User } from "@/types/userSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  User as UserIcon,
  MapPin,
} from "lucide-react";

interface PersonalProps {
  user: User;
}


const Personal: React.FC<PersonalProps> = ({ user }) => {
  // Format the created date to a readable format
  const joinedDate = new Date(user.created_at || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="max-w-xl mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={user.profile_photo_url}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <AvatarFallback>
            {user.first_name[0]}
            {user.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-semibold">
            {user.first_name} {user.last_name}
          </CardTitle>
          <CardDescription className="text-muted">
            Joined on {joinedDate}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail  />
          <span>{user.email}</span>
        </div>

        {/* User Type */}
        <div className="flex items-center gap-2">
          <UserIcon />
          <span>
            {user.user_type === "admin"
              ? "Administrator"
              : user.user_type === "member"
              ? "Associate Member"
              : user.user_type === "applicant"
              ? "Pending Applicant"
              : "Enthusiast"}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2">
          <MapPin />
          <span>Buea, SW Cameroon</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Personal;
