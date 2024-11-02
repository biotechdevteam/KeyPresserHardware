"use client";

import AboutAchievements from "@/components/about/about-achievements/AboutAchievements";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AchievementsPage: React.FC<{ initialData: About }> = ({
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
    initialData: initialData as About, // Use pre-fetched data as initial value
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
      <AboutAchievements achievements={aboutData.achievements || []} aboutData={aboutData} />
    </div>
  );
};

export default AchievementsPage;
