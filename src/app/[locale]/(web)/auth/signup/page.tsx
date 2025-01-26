"use client";
import Error from "@/app/[locale]/error";
import SignUp from "@/components/auth/SignUp";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default async function SignUpPage() {
  // Fetch about data
  const {
    data: aboutData,
    isLoading: loading,
    isFetching: fetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div>
      <SignUp aboutData={aboutData as About} />
    </div>
  );
}
