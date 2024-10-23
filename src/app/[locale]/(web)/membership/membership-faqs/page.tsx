"use client";

import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Loader from "@/components/loader/Loader";
import { fetchFAQs } from "@/lib/fetchUtils";
import { FAQs } from "@/types/FAQSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

const MembershipFAQsPage: React.FC = async () => {
  // Fetch the FAQs data
  const { faqData, faqLoading, faqFetching, faqError } = await getFAQData();

  if (faqLoading || faqFetching) {
    return <Loader />;
  }

  if (faqError) {
    return (
      <div className="text-destructive text-center inset-0">
        Error: {faqError}
      </div>
    );
  }

  return (
    <div className="my-8">
      <FAQContainer
        initialData={faqData?.filter((faq) => faq.category === "Membership")}
      />
    </div>
  );
};

export default MembershipFAQsPage;
