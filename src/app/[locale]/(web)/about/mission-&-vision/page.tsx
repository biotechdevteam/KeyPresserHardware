"use client";
import CTASection from "@/components/about/about-cta/CTASection";
import AboutDetails from "@/components/about/about-details/AboutDetails";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { slideFadeInOut } from "../../../../../lib/utils/pageTransitions";

const MissionVisionPage: React.FC = () => {
  const router = useTransitionRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 width-auto">
      {/* Mission, Vision */}
      <div className="col-span-1 lg:col-span-2">
        <AboutDetails />
      </div>

      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Support Our Mission"
          action={() =>
            router.push("/donate", { onTransitionReady: slideFadeInOut })
          }
          description="Help us achieve our goals through your contributions."
        />
      </div>
    </div>
  );
};

export default MissionVisionPage;
