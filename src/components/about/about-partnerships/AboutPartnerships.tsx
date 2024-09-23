import React from "react";
import { Card } from "@/components/ui/card";

interface Partnership {
  partner: string;
  description: string;
}

interface AboutPartnershipsProps {
  partnerships: Partnership[];
}

const AboutPartnerships: React.FC<AboutPartnershipsProps> = ({
  partnerships,
}) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-2">Partnerships</h2>
      <ul className="list-disc list-inside">
        {partnerships.map((partnership, index) => (
          <li key={index} className="mt-2">
            <strong>{partnership.partner}</strong>
            <p className="text-gray-600">{partnership.description}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AboutPartnerships;
