"use client";

import CTASection from "@/components/about/about-cta/CTASection";
import AboutDetails from "@/components/about/about-details/AboutDetails";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { slideFadeInOut } from "../../../../../../pageTransitions";

const MissionVisionPage: React.FC<{ initialData: About }> = ({
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 width-auto">
      {/* Mission, Vision */}
      <div className="col-span-1 lg:col-span-2">
        <AboutDetails
          mission={aboutData.mission_statement}
          vision={aboutData.vision_statement}
        />
      </div>

      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Support Our Mission"
          action={() =>
            router.push("/donate", { onTransitionReady: slideFadeInOut })
          }
          description="Help us achieve our goals through your contributions."
        />
      </div>
    </div>
  );
};

export default MissionVisionPage;
