import React from "react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Image from "next/image";

interface Partnership {
  partner: string;
  description?: string;
  logo: string;
  website?: string;
}

interface AboutPartnershipsProps {
  partnerships: Partnership[];
}

const AboutPartnerships: React.FC<AboutPartnershipsProps> = ({
  partnerships,
}) => {
  return (
    <div className="lg:p-8 bg-background">
      <h2 className="text-xl font-bold mb-8 text-center">
        Our Partners & Sponsors
      </h2>
      {/* Limit the width of the grid to the width of the card */}
      <div className="overflow-hidden md:overflow-visible">
        <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-8 animate-slide">
          {partnerships.concat(partnerships).map((partnership, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <a
                  href={partnership.website}
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
                </a>
              </HoverCardTrigger>
              {/* Ensure HoverCardContent doesn't get cut off */}
              <HoverCardContent className="w-64 p-4 bg-card shadow-lg rounded-lg z-50 max-w-xs">
                <h3 className="text-xl font-semibold text-primary">
                  {partnership.partner}
                </h3>
                {partnership.description && (
                  <p className="text-sm mt-2">
                    {partnership.description}
                  </p>
                )}
                {partnership.website && (
                  <a
                    href={partnership.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline mt-4 block"
                  >
                    Visit Website
                  </a>
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
