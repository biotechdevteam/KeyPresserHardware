"use client";

import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import MembershipQualifications from "@/components/membership/membership-qualifications/MembershipQualifications";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MembershipQualificationsPage: React.FC = () => {
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

  if (loading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return <MembershipQualifications aboutData={aboutData as About} />;
};

export default MembershipQualificationsPage;
