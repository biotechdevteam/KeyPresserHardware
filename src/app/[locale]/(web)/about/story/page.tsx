"use client";
import CTASection from "@/components/about/about-cta/CTASection";
import AboutIntro from "@/components/about/about-intro/AboutIntro";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { slideFadeInOut } from "../../../../../lib/utils/pageTransitions";

const StoryPage: React.FC = () => {
  const router = useTransitionRouter();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 width-auto">
      {/* Introduction */}
      <div className="col-span-1 lg:col-span-2">
        <AboutIntro />
      </div>

      {/* CTA Section */}
      <div className="col-span-1 lg:col-span-2">
        <CTASection
          title="Join Us"
          description="Become a part of our mission!"
          action={() =>
            router.push("/apply", { onTransitionReady: slideFadeInOut })
          }
        />
      </div>
    </div>
  );
};

export default StoryPage;
