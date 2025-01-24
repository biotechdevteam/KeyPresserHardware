"use client";
import React from "react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { About } from "@/types/aboutSchema";

// Helper function to render the appropriate icon
const getSocialIcon = (url: string) => {
  if (url.includes("linkedin.com")) {
    return <LinkedinIcon className="w-5 h-5" />;
  }
  if (url.includes("facebook.com")) {
    return <FacebookIcon className="w-5 h-5" />;
  }
  if (url.includes("instagram.com")) {
    return <InstagramIcon className="w-5 h-5" />;
  }
  if (url.includes("twitter.com")) {
    return <TwitterIcon className="w-5 h-5" />;
  }
  return null; // If no match, return null
};

const FollowUs: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  // Ensure social_links is an array before mapping
  const socialLinks = Array.isArray(aboutData?.social_links)
    ? aboutData.social_links
    : [];

  return (
    <Card className="bg-transparent border-none shadow-none mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-primary-foreground">Follow Us On</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 justify-center">
          {socialLinks.length > 0 ? (
            socialLinks.map((link: string, i: number) => (
              <Link
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110"
              >
                {getSocialIcon(link)}
              </Link>
            ))
          ) : (
            <p className="text-primary-foreground">No social media links available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUs;
