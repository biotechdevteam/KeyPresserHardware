"use client";
import React from "react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/utils/fetchUtils"; // Import the fetch function
import Loader from "@/components/loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";

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

const FollowUs = () => {
  const router = useTransitionRouter();

  // Fetch about data using useQuery
  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Can't fetch links.</p>;
  }

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
