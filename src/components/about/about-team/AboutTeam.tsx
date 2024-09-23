import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // ShadCN card
import { LinkedinIcon, GithubIcon, FacebookIcon } from "lucide-react"; // ShadCN icons
import { LeadershipTeam } from "@/types/aboutSchema"; // Use the correct type for leadership team

interface AboutTeamProps {
  leadershipTeam: LeadershipTeam[];
}


// Helper function to render the appropriate icon
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return <LinkedinIcon className="w-6 h-6 text-blue-600 hover:text-blue-800" />;
  }
  if (url.includes("github.com")) {
    return <GithubIcon className="w-6 h-6 text-gray-700 hover:text-black" />;
  }
  if (url.includes("facebook.com")) {
    return <FacebookIcon className="w-6 h-6 text-blue-600 hover:text-blue-800" />;
  }
  // You can add more conditions for other social platforms here
  return null; // If no match, return null
};

const AboutTeam: React.FC<AboutTeamProps> = ({ leadershipTeam }) => {
  return (
    <div className="py-12 px-6 lg:px-24 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Our Leadership Team
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {leadershipTeam?.map((leader, index) => {
          const { member } = leader;

          // Ensure user_id and member exist
          if (!member || !member.user_id) {
            return null; // Skip rendering if any critical data is missing
          }

          return (
            <Card key={index} className="rounded-lg shadow-md">
              <CardHeader className="relative">
                <img
                  src={
                    member.user_id.profile_photo_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>

              <CardContent className="p-4 text-center">
                <CardTitle className="text-xl font-semibold">
                  {`${member.user_id.first_name} ${member.user_id.last_name}`}
                </CardTitle>
                <p className="text-md text-gray-500">
                  {member.specialization || "Specialization not provided"}
                </p>
                <p className="mt-2 text-gray-600">
                  {member.bio || "No bio available."}
                </p>
              </CardContent>

              <CardFooter className="flex justify-center space-x-4 p-4">
                {/* Map over social links and render appropriate icon */}
                {member.social_links?.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link)}
                  </a>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AboutTeam;
