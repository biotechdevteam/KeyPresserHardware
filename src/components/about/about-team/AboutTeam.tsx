import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LinkedinIcon, GithubIcon, FacebookIcon } from "lucide-react";
import { LeadershipTeam } from "@/types/aboutSchema";

interface AboutTeamProps {
  leadershipTeam: LeadershipTeam[];
}

// Helper function to render the appropriate icon
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return (
      <LinkedinIcon className="w-6 h-6 text-primary hover:text-primary-foreground transition-colors" />
    );
  }
  if (url.includes("github.com")) {
    return (
      <GithubIcon className="w-6 h-6 text-muted hover:text-foreground transition-colors" />
    );
  }
  if (url.includes("facebook.com")) {
    return (
      <FacebookIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors" />
    );
  }
  return null; // If no match, return null
};

const AboutTeam: React.FC<AboutTeamProps> = ({ leadershipTeam }) => {
  const [isVisible, setIsVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false)
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  return (
    <div className="py-12 px-6 lg:px-24 w-full" ref={teamRef}>
      <h2 className="text-3xl font-bold mb-12 text-center text-primary">
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
            <Card
              key={index}
              className={`rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-card ${
                isVisible ? "animate-spinCard" : "opacity-0"
              }`}
            >
              <CardHeader className="relative">
                <img
                  src={
                    member.user_id.profile_photo_url ||
                    `https://via.placeholder.com/150`
                  }
                  alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>

              <CardContent className="p-6 text-center">
                <CardTitle className="text-xl font-semibold text-primary-foreground">
                  {`${member.user_id.first_name} ${member.user_id.last_name}`}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {member.specialization || "Specialization not provided"}
                </p>
                <p className="mt-4 text-muted">
                  {member.bio || "No bio available."}
                </p>
              </CardContent>

              <CardFooter className="flex justify-center space-x-4 p-4">
                {member.social_links?.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
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
