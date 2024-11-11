"use client";

import Loader from "@/components/loader/Loader";
import MembershipBenefits from "@/components/membership/membership-benefits/MembershipBenefits";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MembershipBenefitsPage: React.FC<{ initialData: About }> = ({
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
    <div className="m-8">
      <MembershipBenefits aboutData={aboutData} />
    </div>
  );
};

export default MembershipBenefitsPage;
