"use client";

import AboutTeam from "@/components/about/about-team/AboutTeam";
import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MembersPage: React.FC<{ initialData: About }> = ({ initialData }) => {
  const {
    data: aboutData,
    isLoading: loading,
    error,
    isError,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    initialData, // Use pre-fetched data as initial value
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (loading && !aboutData) {
    return <Loader />;
  }

  if (error || isError) {
    return (
      <div className="text-destructive text-center inset-0">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-2 m-8 text-center">
      <h2 className="text-xl lg:text-2xl font-bold">Our Members</h2>
      <Separator className="w-24 mx-auto mt-4" />
      <p className="text-base py-8 px-4">
        Meet the dedicated members of {aboutData.name} who contribute their
        expertise and passion towards advancing biotechnology. Each member
        brings unique skills and experience, working together to shape the
        future of the industry and foster innovation.
      </p>
      <AboutTeam leadershipTeam={aboutData.leadership_team} />
    </div>
  );
};

export default MembersPage;
