"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

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
      className={`bg-muted py-12 transition-opacity duration-1000 ${
        isVisible ? "opacity-100 animate-fadeInUp" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Upcoming Events
        </h2>

        {/* Event Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
          {events.map((event) => (
            <Card
              key={event._id}
              className={`transition-transform duration-300 relative overflow-hidden ${
                isVisible ? "animate-spinCard hover:scale-105" : ""
              }`}
              style={{
                backgroundImage: `url(${event.eventImageUrl})`, // Assuming eventImageUrl exists in the event data
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "250px", // Set a minimum height for the cards
              }}
            >
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-white p-4">
                  <p className="text-sm">
                    {new Date(event.startTime).toLocaleDateString()} -{" "}
                    {event.location}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Button - View All Events */}
        <div className="flex justify-center mt-12">
          <Button
            className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300"
            onClick={() => (window.location.href = "/events")} // Link to the events page
          >
            View All Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
