"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAboutData } from "@/lib/fetchUtils";
import AboutContainer from "@/components/about/about-container/AboutContainer";
import { About } from "@/types/aboutSchema";
import Loader from "@/components/loader/Loader";

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

// Page component
export default async function AboutPage() {
  // Get the prefetched data from the server
  const { aboutData, loading, fetching, isError, error } = await getAboutData();

  // Handle loading state
  if (loading || fetching) {
    return <Loader />;
  }

  // Handle error state
  if (isError) {
    return ;
  }

  // Render the AboutContainer if data is successfully fetched
  return (
    <div>
      {/* Pass the prefetched data as props to the AboutContainer */}
      <AboutContainer initialData={aboutData as About} />
    </div>
  );
}
