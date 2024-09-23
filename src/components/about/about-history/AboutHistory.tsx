import React from "react";
import { Separator } from "@/components/ui/separator"; // ShadCN Separator for timeline
import { Card } from "@/components/ui/card";

const HistoryTimeline: React.FC = () => {
  const history = [
    {
      year: "2021",
      description: "Founded with a global presence.",
      iconUrl: "https://via.placeholder.com/50.png?text=2021",
    },
    {
      year: "2023",
      description: "Reached 1,000 members.",
      iconUrl: "https://via.placeholder.com/50.png?text=2023",
    },
    {
      year: "2024",
      description: "Partnered with leading biotech companies.",
      iconUrl: "https://via.placeholder.com/50.png?text=2024",
    },
  ];

  return (
    <Card className="py-12 px-6 lg:px-24 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Our History</h2>
      <div className="space-y-8">
        {history.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img
              src={item.iconUrl}
              alt={`${item.year} Icon`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{item.year}</h3>
              <p className="text-md text-gray-600">{item.description}</p>
            </div>
            {index < history.length - 1 && (
              <div className="flex-grow">
                <Separator className="h-8 my-2" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryTimeline;
