"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { About } from "@/types/aboutSchema";
import AboutTeam from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import HistoryTimeline from "@/components/about/about-history/AboutHistory";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { Member } from "@/types/memberSchema";

interface AboutSectionProps {
  aboutData: About;
  members: Member[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, members }) => {
  return (
    <section className="p-8">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-xl lg:text-3xl font-bold animate-fadeInUp">
          About Us
        </h2>
        <Separator className="w-16 mx-auto mb-8 animate-fadeInUp" />

        {/* Welcome Video & story */}
        <div className="my-8 flex flex-col gap-8">
          {aboutData?.history && <p>{aboutData?.history}</p>}
          <video className="w-auto rounded-lg mx-auto" controls preload="none">
            <source
              src="../../../../public/animations/Flowered-DNA.mp4"
              type="video/mp4"
            />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser can not support this video.
          </video>
        </div>

        {/* Overview */}
        <HistoryTimeline />

        {/* Team Highlights */}
        <div>
          <AboutTeam members={members} />
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Link href="/about">
            <Button className="animate-beep">
              Know More About Us <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
