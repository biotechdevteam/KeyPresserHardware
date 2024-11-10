import React from "react";
import { Member } from "@/types/memberSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  FileText,
  MapPin,
  Instagram,
  Github,
} from "lucide-react";

interface ProfileProps {
  profile: Member;
}

// Function to get the appropriate icon based on the platform
const getSocialIcon = (url: string) => {
  if (url.includes("facebook.com"))
    return <Facebook className="w-5 h-5 text-blue-600" />;
  if (url.includes("twitter.com"))
    return <Twitter className="w-5 h-5 text-blue-400" />;
  if (url.includes("instagram.com"))
    return <Instagram className="w-5 h-5 text-blue-400" />;
  if (url.includes("github.com"))
    return <Github className="w-5 h-5 text-blue-400" />;
  if (url.includes("linkedin.com"))
    return <Linkedin className="w-5 h-5 text-blue-700" />;
  return <Globe className="w-5 h-5 text-gray-600" />; // Default icon for unknown platforms
};

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  return (
    <Card className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <CardHeader className="flex items-center gap-4">
        {/* Profile Avatar */}
        <Avatar>
          <AvatarImage
            src={profile.user_id.profile_photo_url}
            alt={`${profile.user_id.first_name} ${profile.user_id.last_name}`}
          />
          <AvatarFallback>
            {profile.user_id.first_name[0]}
            {profile.user_id.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-semibold">
            {profile.user_id.first_name} {profile.user_id.last_name}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {profile.specialization || "No specialization"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-6 space-y-6">
        {/* Bio */}
        <div>
          <h3 className="text-lg font-semibold">Bio</h3>
          <p className="text-gray-700">{profile.bio || "No bio provided"}</p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold">Skills</h3>
          {profile.skills?.length ? (
            <ul className="list-disc ml-5 text-gray-700">
              {profile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills provided</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-lg font-semibold">Interests</h3>
          {profile.interests?.length ? (
            <ul className="list-disc ml-5 text-gray-700">
              {profile.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No interests provided</p>
          )}
        </div>

        {/* Address */}
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-600" />
          <span>{profile.address || "No address provided"}</span>
        </div>

        {/* Resume */}
        <div className="flex items-center gap-2">
          <FileText className="text-gray-600" />
          {profile.resume_url ? (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>

        {/* Social Links */}
        {profile.social_links?.length ? (
          <div className="flex items-center gap-4 mt-6">
            {profile.social_links.map((link, index) => (
              <Button key={index} variant="ghost" asChild>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(link)}
                </a>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No social links provided</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
