"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";
import { ExternalLinkIcon } from "lucide-react";

// Define the MembershipTier type directly within this component
interface MembershipTier {
  id: string;
  name: string;
  description: string;
  benefits: string[];
}

const membershipTiers: MembershipTier[] = [
  {
    id: "1",
    name: "Standard",
    description:
      "A unified membership for all members of the biotechnology space.",
    benefits: [
      "Equal access to all resources",
      "Monthly community updates",
      "Participation in exclusive biotech events",
      "Access to the biotechnology research hub",
    ],
  },
];

const MembershipSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null); // Create a ref for the section
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  // Use IntersectionObserver to detect if section is in the viewport
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
      { threshold: 0.2 } // Trigger when 20% of the section is visible
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
    <section
      ref={sectionRef} // Attach ref to section
      className="py-12 bg-card"
    >
      <div className="container mx-auto px-4 sm:px-8">
        <h2
          className={`text-3xl font-bold text-center mb-6 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Join Us
        </h2>
        <p
          className={`text-center mb-4 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Explore the benefits of joining our community. Choose the membership
          tier that best fits your needs and unlock exclusive perks.
        </p>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-center mx-auto p-4 lg:px-16">
          {membershipTiers.map((tier, index) => (
            <Card
              key={tier.id}
              className={`p-4 rounded-lg shadow-lg transform transition-transform duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{tier.description}</p>
                <ul className="mb-4 space-y-2 list-inside">
                  {tier.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <svg
                        className="w-5 h-5 text-primary mr-2 mt-[2px]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="/apply">
                  <Button variant="default" className="w-full mt-4">
                    Join {tier.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-12 text-center transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href="/apply">
            <Button className="animate-beep" variant="default">
              Become a Member Now <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
