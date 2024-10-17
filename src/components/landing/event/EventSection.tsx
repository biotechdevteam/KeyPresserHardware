"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const EventSection: React.FC<{ events: Event[] }> = ({ events }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // When the section is visible, enable animations
          } else {
            setIsVisible(false); // Disable animations when out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`py-12 transition-opacity duration-1000 ${
        isVisible ? "opacity-100 animate-fadeInUp" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-xl lg:text-3xl font-bold text-center">
          Upcoming Events
        </h2>
        <Separator className="w-16 mx-auto mb-8" />

        {/* Event Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto justify-center p-4 lg:p-16">
          {events.map((event) => (
            <Card
              key={event._id}
              className={`transition-transform duration-300 relative overflow-hidden ${
                isVisible ? "animate-spinCard hover:scale-105" : ""
              }`}
              style={{
                backgroundImage: `url(${event.eventImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "250px",
              }}
            >
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4">
                  <p className="text-card text-sm">
                    {new Date(event.startTime).toLocaleDateString()} -{" "}
                    {event.location}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Button
            className="animate-pulse"
            onClick={() => (window.location.href = "/events")} // Link to the events page
          >
            View All Events <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
