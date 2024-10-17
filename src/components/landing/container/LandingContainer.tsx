"use client";
import React from "react";
import Hero from "../hero/Hero";
import { About } from "@/types/aboutSchema";
import AboutSection from "../about/About";
import { Project } from "@/types/projectSchema";
import ProjectPortfolioSection from "../projects/Projects";
import ServicesSection from "../services/Services";
import { Service } from "@/types/ServiceSchema";
import MembershipSection from "../tiers/MemberShipTier";
import ContactSection from "../contact/Contact";
import EventSection from "../event/EventSection";
import { Event } from "@/types/eventsSchema";
import AboutPartnerships from "@/components/about/about-partnerships/AboutPartnerships";
import { FAQs } from "@/types/FAQSchema";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import { Feedback } from "@/types/feedbackSchema";
import Testimonials from "@/components/services/testimonials/Testimonials";
import BlogSection from "../blogs/BlogSection";

const membershipTiers = [
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

const LandingContainer: React.FC<{
  aboutData: About;
  services: Service[];
  blogs: any;
  faqs: FAQs;
  feedbacks: Feedback[];
  events: Event[];
  members: any;
  projects: Project[];
}> = ({
  aboutData,
  services,
  events,
  blogs,
  faqs,
  feedbacks,
  members,
  projects,
}) => {
  return (
    <div className="landing-page-container">
      <Hero aboutData={aboutData} />

      <ServicesSection services={services} />

      <AboutSection aboutData={aboutData} />

      <AboutPartnerships partnerships={aboutData.partnerships || []} />

      <ProjectPortfolioSection
        projects={projects
          .filter((pro) => pro.status === "ongoing")
          .slice(0, 3)}
      />

      <MembershipSection membershipTiers={membershipTiers} />

      <EventSection
        events={
          events
            .filter((ev) => new Date(ev.endTime) > new Date()) // Filter out past events
            .sort(
              (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
            ) // Sort by startTime (ascending)
            .slice(0, 2) // Get the first two upcoming events
        }
      />

      <BlogSection blogs={blogs} />

      <Testimonials
        feedbacks={feedbacks}
        title="Reviews From Clients & Partners"
      />

      <FAQContainer
        initialData={faqs.filter((faq) => faq.category === "General")}
        general
      />

      <ContactSection />
    </div>
  );
};

export default LandingContainer;
