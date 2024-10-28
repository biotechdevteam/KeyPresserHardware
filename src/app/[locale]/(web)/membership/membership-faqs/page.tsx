"use client";

import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Loader from "@/components/loader/Loader";
import { fetchFAQs } from "@/lib/fetchUtils";
import { FAQs } from "@/types/FAQSchema";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MembershipFAQsPage: React.FC = () => {
  // Fetch the FAQs data using useQuery directly in the component
  const {
    data: faqData,
    isLoading: faqLoading,
    isFetching: faqFetching,
    isError: faqError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    staleTime: Infinity, // Prevent unnecessary refetching, keep data fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Show a loader if data is loading or fetching
  if (faqLoading || faqFetching) {
    return <Loader />;
  }

  // Show an error message if there was an error fetching data
  if (faqError) {
    return (
      <div className="text-destructive text-center inset-0">
        Error: Failed to load FAQs.
      </div>
    );
  }

  // Filter the FAQs based on the "Membership" category
  const membershipFAQs = faqData?.filter(
    (faq) => faq.category === "Membership"
  );

  return (
    <div className="my-8">
      <FAQContainer initialData={membershipFAQs} membership />
    </div>
  );
};

export default MembershipFAQsPage;
