import React from "react";
import { Card } from "@/components/ui/card";

interface AboutHeaderProps {
  name: string;
  slogan?: string;
  logoUrl?: string;
  coverPhotoUrl?: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({
  name,
  slogan,
  logoUrl,
  coverPhotoUrl,
}) => {
  return (
    <Card className="p-4 mb-4">
      <div className="relative">
        {coverPhotoUrl && (
          <img
            src={coverPhotoUrl}
            alt="Cover Photo"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        <img
          src={logoUrl}
          alt={`${name} Logo`}
          className="w-32 h-32 mx-auto rounded-full border-4 border-border -mt-16 relative z-10"
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
        {slogan && <p className="text-lg text-secondary">{slogan}</p>}
      </div>
    </Card>
  );
};

export default AboutHeader;
