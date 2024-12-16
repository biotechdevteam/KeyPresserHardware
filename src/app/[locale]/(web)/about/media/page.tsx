"use client";

import AboutMediaPage from "@/components/about/about-media/AboutMedia";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { About } from "@/types/aboutSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import sampleVideo1 from "../../../../../../videos/Biologist.mp4";
import sampleVideo2 from "../../../../../../videos/Flowered-DNA.mp4";

const sampleVideos = [
  {
    url: "../../../../../../videos/Biologist.mp4",
    description: "Our first conference video."
  },
  {
    url: "../../../../../../videos/Flowered-DNA.mp4",
    description: "Highlights from our annual biotech workshop."
  }
];

const sampleImages = [
  {
    src: "/images/event1.jpg",
    alt: "Biotech Workshop",
    description: "Attendees at the Biotech Workshop."
  },
  {
    src: "/images/event2.jpg",
    alt: "Conference Panel",
    description: "Panelists discussing biotech innovations."
  }
];

const samplePressMentions = [
  {
    title: "Biotech Association Hosts Annual Conference",
    url: "https://www.newssite.com/article/biotech-conference",
    source: "NewsSite"
  },
  {
    title: "Innovative Biotech Solutions by Biotech Universe",
    url: "https://www.techmag.com/biotech-solutions",
    source: "TechMag"
  }
];

const MediaPage: React.FC = () => {
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
    <div className="col-span-1 lg:col-span-2 my-8">
      {/* <AboutVideos videos={aboutData.videos || []} /> */}
      <AboutMediaPage videos={sampleVideos} images={sampleImages} pressMentions={samplePressMentions} />
    </div>
  );
};

export default MediaPage;
