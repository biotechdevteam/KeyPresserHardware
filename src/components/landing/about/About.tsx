"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { About } from "@/types/aboutSchema"; // Assuming the type is defined for your About data
import AboutDetails from "@/components/about/about-details/AboutDetails";
import AboutTeam from "@/components/about/about-team/AboutTeam";

interface AboutSectionProps {
  aboutData: About;
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData }) => {
  return (
    <section className="py-16 bg-muted text-background">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-3xl text-primary sm:text-5xl font-bold text-center mb-8 animate-fadeInUp">
          About Us
        </h2>

        {/* Overview */}
        <div>
          <AboutDetails
            mission={aboutData.mission_statement}
            vision={aboutData.vision_statement}
          />
        </div>

        {/* Team Highlights */}
        <div>
          <AboutTeam leadershipTeam={aboutData.leadership_team} />
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <Button
            className="px-6 py-3 text-lg animate-zoomIn delay-400"
          >
            <a href="/about" className="text-muted hover:text-primary">Learn About Our Team</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
