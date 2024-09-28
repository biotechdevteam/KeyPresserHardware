"use client";
import React from "react";
import { useRouter } from "next/navigation";
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

const Custom404 = () => {
  const router = useRouter();

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
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      {/* Error Message Section */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-6xl font-bold mb-4">
            Oops!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-2xl mb-8">
            We can't seem to find the page you're looking for. But don’t worry,
            we’re here to help!
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              className="inline-flex items-center px-6 py-3"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

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
            <input
              type="text"
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
              Visit Blog
            </Button>
            <Button onClick={() => router.push("/about")} className="w-full">
              About Us
            </Button>
            <Button onClick={() => router.push("/services")} className="w-full">
              Our Services
            </Button>
            <Button onClick={() => router.push("/contact")} className="w-full">
              Contact Us
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

export default Custom404;
