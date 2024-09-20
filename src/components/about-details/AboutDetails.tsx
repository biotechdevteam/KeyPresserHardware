import React from "react";
import { Card } from "@/components/ui/card";

interface AboutDetailsProps {
  mission: string;
  vision: string;
  history?: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  mission,
  vision,
  history,
}) => {
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-semibold">About Us</h2>
      <p className="mt-2">
        <strong>Mission:</strong> {mission}
      </p>
      <p className="mt-2">
        <strong>Vision:</strong> {vision}
      </p>
      <p className="mt-2">
        <strong>History:</strong> {history}
      </p>
    </Card>
  );
};

export default AboutDetails;
