"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/fetchUtils"; // Import the fetch function
import Loader from "@/components/loader/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { useTransitionRouter } from "next-view-transitions";

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
    return (
      <div className="flex flex-col items-center">
        <p className="text-destructive mb-4">
          Something went wrong. Please try again later.
        </p>
        <Button onClick={() => router.refresh()}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="">
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-4">
            Follow Us On
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-6 justify-center">
            <a
              href={aboutData?.social_links?.facebook}
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href={aboutData?.social_links?.twitter}
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href={aboutData?.social_links?.instagram}
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href={aboutData?.social_links?.linkedin}
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={aboutData?.social_links?.github}
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowUs;
