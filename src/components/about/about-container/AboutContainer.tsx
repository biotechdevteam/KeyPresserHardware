"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AboutHeader from "../about-header/AboutHeader";
import AboutDetails from "../about-details/AboutDetails";
import AboutAchievements from "../about-achievements/AboutAchievements";
import AboutTeam from "../about-team/AboutTeam";
import AboutPartnerships from "../about-partnerships/AboutPartnerships";
import AboutVideos from "../about-videos/AboutVideos";
import HistoryTimeline from "../about-history/AboutHistory";
import AboutFooter from "../about-footer/AboutFooter";
import TermsModal from "../terms-modal/TermsModal";
import { extractDomain } from "@/lib/helpers";
import { fetchAboutData } from "@/lib/fetchUtils";
import CTASection from "../about-cta/CTASection";

// Accept the pre-fetched initialData as a prop
const AboutContainer: React.FC<{ initialData: any }> = ({ initialData }) => {
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
  });

  const websiteURL = extractDomain();

  if (loading && !aboutData) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Main Details Section */}
      <div className="col-span-1 lg:col-span-2">
        <AboutHeader
          name={aboutData.name}
          slogan={aboutData.slogan}
          logoUrl={aboutData.logo_url}
          coverPhotoUrl={aboutData.cover_photo_url}
        />
      </div>

      {/* CTA Section after About Header */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Join Us"
          description="Become a part of our mission!"
        />
      </div>

      {/* Mission, Vision */}
      <div className="col-span-1 lg:col-span-2">
        <AboutDetails
          mission={aboutData.mission_statement}
          vision={aboutData.vision_statement}
        />
      </div>

      {/* Leadership Team */}
      <div className="col-span-1 lg:col-span-2">
        <AboutTeam leadershipTeam={aboutData.leadership_team} />
      </div>

      {/* CTA Section before Achievements */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Support Our Vision"
          description="Help us achieve our goals through your contributions."
        />
      </div>

      {/* History, Timeline */}
      <div className="col-span-1 lg:col-span-2">
        <HistoryTimeline />
      </div>

      {/* Partnerships Section */}
      <div className="col-span-1 lg:col-span-2">
        <AboutPartnerships partnerships={aboutData.partnerships || []} />
      </div>

      {/* Achievements */}
      <div className="col-span-1 lg:col-span-2">
        <AboutAchievements achievements={aboutData.achievements || []} />
      </div>

      {/* Videos */}
      <div className="col-span-1 lg:col-span-2">
        <AboutVideos videos={aboutData.videos || []} />
      </div>

      {/* CTA Section before Footer */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Stay Connected"
          description="Subscribe to our newsletter for the latest updates."
        />
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
