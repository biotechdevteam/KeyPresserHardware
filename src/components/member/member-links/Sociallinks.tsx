import React from "react";
import {
  LinkedinIcon,
  GithubIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Import Badge from shadcn

// Helper function to get the social media icon based on the URL
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return <LinkedinIcon className="w-6 h-6" />;
  }
  if (url.includes("github.com")) {
    return <GithubIcon className="w-6 h-6" />;
  }
  if (url.includes("facebook.com")) {
    return <FacebookIcon className="w-6 h-6" />;
  }
  if (url.includes("twitter.com")) {
    return <TwitterIcon className="w-6 h-6" />;
  }
  if (url.includes("instagram.com")) {
    return <InstagramIcon className="w-6 h-6" />;
  }
  return null; // If no match, return null
};

// Social Links Component
const SocialLinks: React.FC<{ links: string[] }> = ({ links }) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2 mt-2">
        {links.map((link, index) => {
          const icon = getSocialIcon(link);
          if (!icon) return null; // Skip if no icon is found for the link

          return (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <Badge variant="outline" className="p-2">
                {icon}
              </Badge>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
