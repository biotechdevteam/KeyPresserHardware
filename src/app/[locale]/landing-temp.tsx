"use client";
import React from "react";
import {
  HomeIcon,
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
import { Separator } from "@radix-ui/react-separator"; // Import Separator
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components
import { useTransitionRouter } from "next-view-transitions";

const LandingTemp = () => {
  const router = useTransitionRouter();

  // Fetch about data using useQuery
  const {
    data: aboutData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity, // Prevent unnecessary refetching
  });

  // Handler for Go to Homepage button
  const handleGoHome = () => {
    router.push("/");
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = event.currentTarget.elements.namedItem(
      "search"
    ) as HTMLInputElement;
    router.push(`/search?query=${query.value}`);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground p-6">
      {/* Coming soon */}
      <h1 className="text-5xl font-bold">Coming Soon!</h1>
      <p className="text-lg">
        This feature is currently under development. Stay tuned for updates!
      </p>

      {/* Search Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-4">
            Search for Something
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-[1fr_auto] gap-4 items-center"
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search for something..."
              className="border px-4 py-2 rounded-md w-full"
            />
            <Button type="submit" className="px-6 py-2">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

      {/* Navigation Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-4">
            Explore Other Pages:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => router.push("/blog")} className="w-full">
              Visit Our Blogs
            </Button>
            <Button onClick={() => router.push("/about")} className="w-full">
              Know More About Us
            </Button>
            <Button onClick={() => router.push("/services")} className="w-full">
              Explore Our Services
            </Button>
            <Button onClick={() => router.push("/contact")} className="w-full">
              Browse Our Projects
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

      {/* Social Media Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-4">
            Connect with Us
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

      {/* Separator */}
      <Separator className="my-8" />

      {/* Footer Section */}
      <Card className="w-full max-w-2xl">
        <CardContent className="text-center border-t border-muted pt-8">
          <p>&copy; 2024 {aboutData?.name}. All rights reserved.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingTemp;
