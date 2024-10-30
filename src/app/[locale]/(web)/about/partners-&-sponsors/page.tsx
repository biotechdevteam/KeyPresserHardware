"use client";

import AboutPartnerships from "@/components/about/about-partnerships/AboutPartnerships";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";

const PartnersSponsorsPage: React.FC<{ initialData: About }> = ({
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

  const router = useTransitionRouter();

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
      <div className="col-span-1 lg:col-span-2 my-8">
        <AboutPartnerships partnerships={aboutData.partnerships || []} />
      </div>
  );
};

export default PartnersSponsorsPage;
