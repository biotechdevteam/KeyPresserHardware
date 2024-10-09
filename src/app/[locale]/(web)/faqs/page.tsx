"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFAQs } from "@/lib/fetchUtils";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Loader from "@/components/loader/Loader";
import { FAQ } from "@/types/FAQSchema";

// This function runs on the server-side and fetches the FAQs data.
async function getFAQData() {
  const faqQuery = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    faqData: faqQuery.data,
    faqLoading: faqQuery.isLoading,
    faqFetching: faqQuery.isFetching,
    faqError: faqQuery.isError,
  };
}

// FAQPage component to fetch and display FAQs data
const FAQPage: React.FC = async () => {
  // Fetch the FAQs data
  const { faqData, faqLoading, faqFetching, faqError } = await getFAQData();

  // Handle loading state
  if (faqLoading || faqFetching) {
    return <Loader />;
  }

  // Handle error state
  if (faqError) {
    return <div>Error loading FAQ data...</div>;
  }

  // Render the FAQContainer with the prefetched data
  return (
    <div>
      <FAQContainer initialData={faqData as FAQ[]} />
    </div>
  );
};

export default FAQPage;
