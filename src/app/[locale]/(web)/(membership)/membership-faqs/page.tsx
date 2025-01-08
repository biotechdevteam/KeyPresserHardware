"use client";

import Error from "@/app/[locale]/error";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Loader from "@/components/loader/Loader";
import { fetchFAQs } from "@/lib/utils/fetchUtils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MembershipFAQsPage: React.FC = () => {
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
    return <Error error="Failed to load membership FAQs." />;
  }

  // Filter the FAQs based on the "Membership" category
  const membershipFAQs = faqData?.filter(
    (faq) => faq.category === "Membership"
  );

  return <FAQContainer initialData={membershipFAQs} membership />;
};

export default MembershipFAQsPage;
