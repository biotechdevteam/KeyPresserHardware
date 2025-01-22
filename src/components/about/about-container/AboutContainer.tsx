"use client";
import React from "react";
import HistoryTimeline from "../about-history/AboutHistory";
import AboutFooter from "../about-footer/AboutFooter";
import SubscribeSection from "../subscribe/SubscribeSection";
import { About } from "@/types/aboutSchema";

const AboutContainer: React.FC<{ aboutData: About }> = ({ aboutData }) => {
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
        <AboutFooter aboutData={aboutData} />
      </div>
    </div>
  );
};

export default AboutContainer;
