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
import { motion, useScroll, useSpring } from "framer-motion";
import { Member } from "@/types/memberSchema";
import AboutSection from "../about/About";

const LandingContainer: React.FC<{
  aboutData: About;
  members: Member[];
  projects: Project[];
  feedbacks: Feedback[];
  faqData: FAQs;
}> = ({ aboutData, members, feedbacks, projects, faqData }) => {
  // For progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="landing-page-container relative overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="progress-bar fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <section className="relative z-10">
        <Hero aboutData={aboutData} cta="about-us" />
      </section>

      {/* Services Section - Light Background */}
      <section className="relative z-20 bg-gradient-to-b from-background to-background/80">
        <ServicesSection />
      </section>

      {/* About Us Section */}
      <section id="about-us" className="relative z-20 bg-background">
        <AboutSection aboutData={aboutData} members={members} />
      </section>

      {/* Project Portfolio Section - Contrasting Background */}
      <section className="relative z-20 bg-primary/5">
        <ProjectPortfolioSection
          projects={projects
            .filter((pro: Project) => pro.status === "ongoing")
            .slice(0, 3)}
        />
      </section>

      {/* Achievements Section */}
      <section className="relative z-20 bg-background">
        <AboutAchievements aboutData={aboutData} />
      </section>

      {/* Partnerships Section - Subtle Background */}
      <section className="relative z-20 bg-card/50">
        <AboutPartnerships aboutData={aboutData} />
      </section>

      {/* Final Sections Group */}
      <section className="relative z-20 bg-gradient-to-b from-background/80 to-background">
        <div className="container mx-auto px-4">
          {/* Testimonials */}
          {feedbacks.length > 0 && (
            <div className="py-16">
              <Testimonials
                feedbacks={feedbacks}
                title="What Our Clients Say"
                isHomepage
              />
            </div>
          )}

          {/* FAQ Section - With subtle divider */}
          <div className="py-16 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary/20 rounded-full"></div>
            <FAQContainer faqData={faqData} general />
          </div>

          {/* Contact Section - With subtle divider */}
          <div className="py-16 pb-24 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary/20 rounded-full"></div>
            <ContactSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingContainer;
