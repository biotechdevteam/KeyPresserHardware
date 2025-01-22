"use client";
import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import { About } from "@/types/aboutSchema";

interface Partnership {
  partner: string;
  description?: string;
  logo: string;
  website?: string;
}

const AboutPartnerships: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  return (
    <div className="p-8 pb-16">
      <h2 className="text-xl lg:text-2xl font-bold text-center">
        Our Valued Partners & Sponsors
      </h2>
      <p className="text-base mt-4 mb-8 px-4 text-center">
        We are proud to collaborate with leading organizations and sponsors that
        share our commitment to advancing biotechnology. Together, we drive
        innovation, empower research, and create impactful solutions for a
        sustainable future.
      </p>

      {/* Limit the width of the grid to the width of the card */}
      <div className="overflow-x-clip">
        {/* Don't delete this comment! It might be needed tomorrow */}
        {/* <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-8 animate-slide"> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
          {aboutData.partnerships
            ?.concat(aboutData.partnerships)
            .map((partnership: Partnership, index: number) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Link
                    href={partnership?.website || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transform transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={partnership.logo}
                      alt={`${partnership.partner} logo`}
                      style={{ objectFit: "contain" }}
                      className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden"
                      width={300}
                      height={300}
                    />
                  </Link>
                </HoverCardTrigger>

                {/* Ensure HoverCardContent doesn't get cut off */}
                <HoverCardContent className="w-64 p-4 bg-card shadow-lg rounded-lg z-50 max-w-xs">
                  <h3 className="text-xl font-semibold text-primary">
                    {partnership.partner}
                  </h3>
                  {partnership.description && (
                    <p className="text-sm mt-2">{partnership.description}</p>
                  )}
                  {partnership.website && (
                    <Link
                      href={partnership.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline mt-4 block"
                    >
                      Visit Website
                    </Link>
                  )}
                </HoverCardContent>
              </HoverCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPartnerships;
