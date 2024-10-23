"use client";

import AboutTeam from "@/components/about/about-team/AboutTeam";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ExecutiveBoardPage: React.FC<{ initialData: About }> = ({
  initialData,
}) => {
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
    <div className="col-span-1 lg:col-span-2 m-8">
      <AboutTeam leadershipTeam={aboutData.leadership_team} />
    </div>
  );
};

export default ExecutiveBoardPage;
