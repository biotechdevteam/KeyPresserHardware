"use client";
import React from "react";
import Hero from "../hero/Hero";
import { Project } from "@/types/projectSchema";
import ProjectPortfolioSection from "../projects/Projects";
import ServicesSection from "../services/Services";
import ContactSection from "../contact/Contact";
import AboutPartnerships from "@/components/about/about-partnerships/AboutPartnerships";
import FAQContainer from "@/components/faq/faq-container/FAQContainer";
import Testimonials from "@/components/services/testimonials/Testimonials";
import { About } from "@/types/aboutSchema";
import { Feedback } from "@/types/feedbackSchema";
import { FAQs } from "@/types/FAQSchema";
import AboutAchievements from "@/components/about/about-achievements/AboutAchievements";

const LandingContainer: React.FC<{
  aboutData: About;
  projects: Project[];
  feedbacks: Feedback[];
  faqData: FAQs;
}> = ({ aboutData, feedbacks, projects, faqData }) => {
  return (
    <div className="landing-page-container">
      <Hero aboutData={aboutData} />
      <ServicesSection />
      <ProjectPortfolioSection
        projects={projects
          .filter((pro: Project) => pro.status === "ongoing")
          .slice(0, 3)}
      />
      <AboutAchievements aboutData={aboutData} />
      <AboutPartnerships aboutData={aboutData} />
      <div className="bg-card">
        <Testimonials feedbacks={feedbacks} title="Customer reviews" />
        <FAQContainer faqData={faqData} general />
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingContainer;
