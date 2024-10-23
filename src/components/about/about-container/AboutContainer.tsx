"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HistoryTimeline from "../about-history/AboutHistory";
import AboutFooter from "../about-footer/AboutFooter";
import TermsModal from "../terms-modal/TermsModal";
import { extractDomain } from "@/lib/helpers";
import { fetchAboutData } from "@/lib/fetchUtils";
import { Loader } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import SubscribeSection from "../subscribe/SubscribeSection";
import { About } from "@/types/aboutSchema";

// Accept the pre-fetched initialData as a prop
const AboutContainer: React.FC<{ initialData: About}> = ({ initialData }) => {
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
  const websiteURL = extractDomain();

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mt-8 width-auto">
      {/* History, Timeline */}
      <div className="col-span-1 lg:col-span-2">
        <HistoryTimeline />
      </div>

      {/* Subscribe Section */}
      <div className="col-span-1 lg:col-span-2" id="subscribe-section">
        <SubscribeSection />
      </div>

      {/* Footer Section */}
      <div className="col-span-1 lg:col-span-2">
        <AboutFooter
          contactPhone={aboutData.contact_phone}
          socialLinks={aboutData.social_links}
          contactEmail={aboutData.contact_email}
          address={aboutData.address}
          website={websiteURL}
        />
      </div>

      {/* Terms Modal Section */}
      <div className="col-span-1 lg:col-span-2">
        <TermsModal
          termsAndConditions={
            aboutData.terms_and_conditions ||
            "Terms & Conditions are not available at the moment."
          }
          privacyPolicy={
            aboutData.privacy_policy ||
            "Privacy Policy is not available at the moment."
          }
        />
      </div>
    </div>
  );
};

export default AboutContainer;
