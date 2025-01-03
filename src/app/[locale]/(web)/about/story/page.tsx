"use client"

import CTASection from "@/components/about/about-cta/CTASection";
import AboutIntro from "@/components/about/about-intro/AboutIntro";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { slideFadeInOut } from "../../../../../lib/utils/pageTransitions";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";

const StoryPage: React.FC = () => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 width-auto">
      {/* Introduction */}
      <div className="col-span-1 lg:col-span-2">
        <AboutIntro
          name={aboutData?.name || "Biotech Universe Group"}
          slogan={aboutData?.slogan || "Our Slogan"}
          coverPhotoUrl={
            typeof aboutData?.cover_photo_url === "string"
              ? aboutData.cover_photo_url
              : ""
          }
          story={
            aboutData?.history ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut magna vel nisl cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut magna vel nisl cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut magna vel nisl cursus."
          }
        />
      </div>

      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Join Us"
          description="Become a part of our mission!"
          action={() =>
            router.push("/apply", { onTransitionReady: slideFadeInOut })
          }
        />
      </div>
    </div>
  );
};

export default StoryPage;
