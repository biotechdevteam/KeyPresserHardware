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
import { Separator } from "@/components/ui/separator";
import { useTransitionRouter } from "next-view-transitions";

interface AboutTeamProps {
  leadershipTeam: LeadershipTeam[];
}

// Helper function to render the appropriate icon
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return (
      <LinkedinIcon className="w-6 h-6 text-primary hover:text-accent transition-colors" />
    );
  }
  if (url.includes("github.com")) {
    return (
      <GithubIcon className="w-6 h-6 text-primary hover:text-accent transition-colors" />
    );
  }
  if (url.includes("facebook.com")) {
    return (
      <FacebookIcon className="w-6 h-6 text-primary hover:text-accent transition-colors" />
    );
  }
  return null; // If no match, return null
};

const AboutTeam: React.FC<AboutTeamProps> = ({ leadershipTeam }) => {
  const [isVisible, setIsVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement | null>(null);

  const router = useTransitionRouter() 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
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
    <div className="py-12 lg:px-24 text-center" ref={teamRef}>
      <h2 className="text-xl font-bold">Our Leadership Team</h2>
      <Separator className="w-16 mx-auto mt-4 mb-12" />

      <div className="flex flex-wrap lg:flex-row gap-8">
        {leadershipTeam?.map((leader, index) => {
          const { member } = leader;

          // Ensure user_id and member exist
          if (!member || !member.user_id) {
            return null; // Skip rendering if any critical data is missing
          }

          return (
            <Card
              key={index}
              className={`mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow bg-card ${
                isVisible ? "animate-spinCard" : "opacity-0"
              }`}
              onClick={() => router.push(`/members/${leader.member._id}`)} // Redirect to the member profile page
            >
              <CardHeader className="relative">
                <img
                  src={
                    member.user_id.profile_photo_url ||
                    `https://via.placeholder.com/150`
                  }
                  alt={`${member.user_id.first_name} ${member.user_id.last_name}`}
                  className="w-24 h-24 lg:w-32 lg:h-32 mx-auto object-cover rounded-full"
                />
              </CardHeader>

              <CardContent className="p-2">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {`${member.user_id.first_name} ${member.user_id.last_name}`}
                </CardTitle>
                <p className="text-xs uppercase">
                  {member.specialization || null}
                </p>
                <p className="m-4">{member.bio || null}</p>
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
