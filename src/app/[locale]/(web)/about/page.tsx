"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import AboutContainer from "@/components/about/about-container/AboutContainer";
import { About } from "@/types/aboutSchema";
import Loader from "@/components/loader/Loader";
import AboutHeader from "@/components/about/about-header/AboutHeader";
import { generateMetadata } from "@/lib/utils/generateMetadata";
import Head from "next/head";

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

  const metadata = {
    title: "Dynamic Page Title",
    description: "Dynamic Page Description",
    ...generateMetadata({ params: { route: "/about" } }),
  };

  return (
    <div className="p-6">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <AboutHeader />
      <AboutContainer initialData={aboutData as About} />
    </div>
  );
}
