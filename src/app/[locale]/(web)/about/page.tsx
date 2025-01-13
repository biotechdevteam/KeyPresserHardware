"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import AboutContainer from "@/components/about/about-container/AboutContainer";
import { About } from "@/types/aboutSchema";
import Loader from "@/components/loader/Loader";

export default async function AboutPage() {
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<About>({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-destructive text-center inset-0">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="p-6">
      <AboutContainer initialData={aboutData as About} />
    </div>
  );
}
