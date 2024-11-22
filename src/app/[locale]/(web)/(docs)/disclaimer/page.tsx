"use client";
import Loader from "@/components/loader/Loader";
import Disclaimer from "@/components/Policies/Disclaimer";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// This function runs on the server-side and fetches the about data.
async function getAboutData() {
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Return the prefetched data, loading, and error state
  return {
    aboutData: data,
    loading,
    fetching,
    isError,
    error,
  };
}

export default async function DisclaimerPage() {
  // Get the prefetched data from the server
  const { aboutData, loading, fetching, isError, error } = await getAboutData();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return { error };
  }

  return (
    <div>
      <Disclaimer aboutData={aboutData as About} />
    </div>
  );
}
