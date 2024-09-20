import React from "react";
import { Card } from "@/components/ui/card";

interface AboutHeaderProps {
  name: string;
  slogan?: string;
  logoUrl?: string;
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ name, slogan, logoUrl }) => {
  return (
    <Card className="p-4 mb-4">
      <img src={logoUrl} alt={`${name} Logo`} className="w-32 h-32 mx-auto" />
      <h1 className="text-2xl font-semibold text-center">{name}</h1>
      <p className="text-lg text-center text-gray-600">{slogan}</p>
    </Card>
  );
};

export default AboutHeader;
