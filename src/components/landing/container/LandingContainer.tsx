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
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import {
  fetchAboutData,
  fetchFeedbacks,
  fetchProjectsData,
} from "@/lib/utils/fetchUtils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch all data
    const aboutData = await fetchAboutData();
    const feedbacks = await fetchFeedbacks();
    const projects = await fetchProjectsData();

    // Return data as props (no ISR)
    return {
      props: {
        aboutData,
        feedbacks,
        projects,
        isError: false,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        aboutData: null,
        feedbacks: null,
        projects: null,
        isError: true,
        error: error.message || "An unexpected error occurred.",
      },
    };
  }
};

const LandingContainer = ({
  aboutData,
  feedbacks,
  projects,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading or error states
  if (isError) return <Error error={error} />;
  // if (!aboutData && !isError) return <Loader />;
  console.log("Fetched aboutData:", aboutData);
  console.log("Fetched Feedbacks:", feedbacks);
  console.log("Fetched projects:", projects);

  return (
    <div className="landing-page-container">
      <Hero aboutData={aboutData} />
      <ServicesSection />
      {/* <AboutPartnerships partnerships={aboutData.partnerships || []} /> */}
      <ProjectPortfolioSection
        projects={projects
          .filter((pro: Project) => pro.status === "ongoing")
          .slice(0, 3)}
      />
      <div className="bg-card">
        <Testimonials feedbacks={feedbacks} title="Customer reviews" />
        <FAQContainer general />
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingContainer;
