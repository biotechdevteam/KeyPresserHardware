import React from "react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

interface AboutDetailsProps {
  mission: string;
  vision: string;
  slogan?: string;
  coverPhotoUrl?: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  mission,
  vision,
  slogan,
  coverPhotoUrl,
}) => {
  return (
    <Card className="relative">
      {/* Mission and Vision Section */}
      <div className="py-12 px-6 lg:px-24 max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-8">{mission}</p>

          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">{vision}</p>
        </div>
      </div>
    </Card>
  );
};

export default AboutDetails;
