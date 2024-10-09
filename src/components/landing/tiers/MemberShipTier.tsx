"use client";

import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Reuse the ShadCN Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card components
import { Separator } from "@/components/ui/separator"; // ShadCN Separator component
import { Link } from "next-view-transitions";

// Define the MembershipTier type directly within this component
interface MembershipTier {
  id: string;
  name: string;
  description: string;
  benefits: string[];
}

interface MembershipSectionProps {
  membershipTiers: MembershipTier[];
}

const MembershipSection: React.FC<MembershipSectionProps> = ({
  membershipTiers,
}) => {
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
      className="py-16 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-8">
        <h2
          className={`text-3xl font-bold text-center mb-6 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Join BTVERSE
        </h2>
        <p
          className={`text-center mb-12 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Explore the benefits of joining our community. Choose the membership
          tier that best fits your needs and unlock exclusive perks.
        </p>
        <Separator className="mb-8" /> {/* ShadCN Separator component */}
        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membershipTiers.map((tier, index) => (
            <Card
              key={tier.id}
              className={`p-6 rounded-lg shadow-lg transform transition-transform duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {tier.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{tier.description}</p>
                <ul className="mb-4 list-disc list-inside">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
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
            <Button className="px-6 py-3 text-lg" variant="default">
              Become a Member Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
