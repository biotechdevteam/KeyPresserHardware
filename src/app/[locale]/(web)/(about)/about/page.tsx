import React from "react";
import AboutContainer from "@/components/about/about-container/AboutContainer";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto bg-background text-foreground shadow-md rounded-lg p-6">
      <AboutContainer />
    </div>
  );
};

export default AboutPage;
