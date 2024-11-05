"use client";

import AboutTeam from "@/components/about/about-team/AboutTeam";
import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ExecutiveBoardPage: React.FC = () => {
  const {
    data: aboutData,
    isLoading: loading,
    error,
    isError,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
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
      <h2 className="text-xl lg:text-2xl font-bold">Our Leadership Team</h2>
      <Separator className="w-24 mx-auto mt-4" />
      <p className="text-base py-8 px-4">
        Our board members are seasoned professionals dedicated to driving
        innovation and excellence in biotechnology. With diverse expertise and a
        shared vision for the future, they lead Biotech Universe towards
        groundbreaking discoveries and impactful solutions.
      </p>

      <AboutTeam leadershipTeam={aboutData?.leadership_team || []} />
    </div>
  );
};

export default ExecutiveBoardPage;
