"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";
import { ExternalLinkIcon } from "lucide-react";

interface MembershipTier {
  id: string;
  name: string;
  description: string;
  benefits: string[];
}

const membershipTiers: MembershipTier[] = [
  {
    id: "1",
    name: "Student Membership",
    description:
      "Open to undergraduates, postgraduates, and PhD candidates interested in biotechnology.",
    benefits: [
      "Discounted event fees",
      "Access to mentorship programs",
      "Exclusive networking opportunities with industry professionals",
      "Biotech research internship opportunities",
    ],
  },
  {
    id: "2",
    name: "Professional Membership",
    description:
      "For individuals working in the biotech or technology field with 1+ years of experience.",
    benefits: [
      "Access to premium biotech research and reports",
      "Exclusive professional networking events",
      "Career development and training sessions",
      "Opportunities to collaborate on industry projects",
    ],
  },
  {
    id: "3",
    name: "Institutional Membership",
    description:
      "For organisations such as universities, biotech companies, and research centres.",
    benefits: [
      "Recognition as a biotech industry partner",
      "Opportunities for institutional collaborations",
      "Access to industry research insights",
      "Special invitations to biotech conferences and summits",
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
          We offer different membership tiers based on your professional
          background and experience. Choose the one that best suits your needs.
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
      </div>
    </section>
  );
};

export default MembershipSection;
