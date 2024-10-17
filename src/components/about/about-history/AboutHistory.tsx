import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator"; // ShadCN Separator
import { Card } from "@/components/ui/card";

const HistoryTimeline: React.FC = () => {
  const history = [
    {
      year: "2021",
      description: "Founded with a global presence.",
      iconUrl: "https://via.placeholder.com/300x150.png?text=Global+Presence",
    },
    {
      year: "2023",
      description: "Reached 1,000 members.",
      iconUrl: "https://via.placeholder.com/300x150.png?text=1000+Members",
    },
    {
      year: "2024",
      description: "Partnered with leading biotech companies.",
      iconUrl:
        "https://via.placeholder.com/300x150.png?text=Biotech+Partnership",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const historyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
    );

    if (historyRef.current) {
      observer.observe(historyRef.current);
    }

    return () => {
      if (historyRef.current) {
        observer.unobserve(historyRef.current);
      }
    };
  }, []);

  return (
    <Card
      ref={historyRef}
      className={`py-12 p-6 lg:p-12 max-w-5xl mx-auto transition-opacity duration-500 ${
        isVisible ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <h2 className="text-xl lg:text-2xl font-bold text-center">Recent Activities</h2>
      <Separator className="w-24 mx-auto mb-12" />

      <div className="grid gap-12">
        {history.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center ${
              index % 2 === 1 ? "md:grid-cols-2-reverse" : ""
            }`}
          >
            {/* Image Section with Animation */}
            <div className="flex justify-center">
              <img
                src={item.iconUrl}
                alt={`${item.year} Icon`}
                className="w-40 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Content Section */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">{item.year}</h3>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HistoryTimeline;
