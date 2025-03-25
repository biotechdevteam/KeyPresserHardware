"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Link, useTransitionRouter } from "next-view-transitions";
import {
  ExternalLink,
  Users,
  Building,
  GraduationCap,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { slideInOut } from "@/lib/utils/pageTransitions";

interface MembershipTier {
  id: string;
  name: string;
  type: "student" | "professional" | "institutional";
  description: string;
  benefits: string[];
  mostPopular?: boolean;
  recommended?: boolean;
}

const membershipTiers: MembershipTier[] = [
  {
    id: "1",
    name: "Student Membership",
    type: "student",
    description:
      "Open to undergraduates, postgraduates, and PhD candidates interested in biotechnology.",
    benefits: [
      "Discounted event fees",
      "Access to mentorship programs",
      "Exclusive networking opportunities with industry professionals",
      "Biotech research internship opportunities",
    ],
    mostPopular: true,
  },
  {
    id: "2",
    name: "Professional Membership",
    type: "professional",
    description:
      "For individuals working in the biotech or technology field with 1+ years of experience.",
    benefits: [
      "Access to premium biotech research and reports",
      "Exclusive professional networking events",
      "Career development and training sessions",
      "Opportunities to collaborate on industry projects",
    ],
    recommended: true,
  },
  {
    id: "3",
    name: "Institutional Membership",
    type: "institutional",
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useTransitionRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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

  const getTierIcon = (type: MembershipTier["type"]) => {
    switch (type) {
      case "student":
        return <GraduationCap className="h-5 w-5" />;
      case "professional":
        return <Users className="h-5 w-5" />;
      case "institutional":
        return <Building className="h-5 w-5" />;
    }
  };

  const getTierColor = (type: MembershipTier["type"]) => {
    switch (type) {
      case "student":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400";
      case "professional":
        return "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400";
      case "institutional":
        return "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We offer different membership tiers based on your professional
            background and experience. Choose the one that best suits your
            needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mx-auto max-w-6xl">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card
                className={`h-full overflow-hidden ${
                  tier.mostPopular
                    ? "border-primary shadow-lg"
                    : "border-border"
                }`}
              >
                {tier.mostPopular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    MOST POPULAR
                  </div>
                )}
                {tier.recommended && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${getTierColor(
                          tier.type
                        )}`}
                      >
                        {getTierIcon(tier.type)}
                        <span className="ml-1">
                          {tier.type.charAt(0).toUpperCase() +
                            tier.type.slice(1)}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="mb-6 text-muted-foreground">
                    {tier.description}
                  </p>
                  <h4 className="text-sm font-semibold mb-3">
                    Benefits include:
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant={tier.recommended ? "default" : "outline"}
                    className="w-full group"
                    onClick={() =>
                      router.push("/apply", { onTransitionReady: slideInOut })
                    }
                  >
                    <span>Apply for {tier.name}</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
