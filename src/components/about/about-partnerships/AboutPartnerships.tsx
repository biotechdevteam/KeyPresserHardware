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
    <div className="p-8 bg-background overflow-visible">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Our Partners & Sponsors
      </h2>
      <div className="relative">
        {/* Limit the width of the grid to the width of the card */}
        <div className="max-w-full overflow-visible">
          <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-8 animate-slide infinite">
            {partnerships.concat(partnerships).map((partnership, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <a
                    href={partnership.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transform transition-transform duration-300 hover:scale-105"
                    style={{ maxWidth: '100%' }}
                  >
                    <Card className="shadow-md hover:shadow-xl transition-shadow border border-muted rounded-lg overflow-hidden">
                      <AspectRatio ratio={1}>
                        <Image
                          src={partnership.logo}
                          alt={`${partnership.partner} logo`}
                          style={{ objectFit: "contain" }}
                          className="p-4"
                          width={200}
                          height={300}
                        />
                      </AspectRatio>
                    </Card>
                  </a>
                </HoverCardTrigger>
                {/* Ensure HoverCardContent doesn't get cut off */}
                <HoverCardContent className="w-64 p-4 bg-card shadow-lg rounded-lg z-50 max-w-xs">
                  <h3 className="text-xl font-semibold text-primary">
                    {partnership.partner}
                  </h3>
                  {partnership.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {partnership.description}
                    </p>
                  )}
                  {partnership.website && (
                    <a
                      href={partnership.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline mt-4 block"
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
    </div>
  );
};

export default AboutPartnerships;
