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

const LandingContainer: React.FC<{
  aboutData: About;
  services: Service[];
  blogs: any;
  faqs: FAQs;
  feedbacks: Feedback[];
  events: Event[];
  projects: Project[];
}> = ({
  aboutData,
  services,
  events,
  blogs,
  faqs,
  feedbacks,
  projects,
}) => {
  return (
    <div className="landing-page-container">
      <Hero aboutData={aboutData} />

      <ServicesSection services={services} aboutData={aboutData} />

      <AboutSection aboutData={aboutData} />

      <AboutPartnerships partnerships={aboutData.partnerships || []} />

      <ProjectPortfolioSection
        projects={projects
          .filter((pro) => pro.status === "ongoing")
          .slice(0, 3)}
      />

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

      <div className="bg-card">
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
    </div>
  );
};

export default LandingContainer;
