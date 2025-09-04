"use client";
import Head from "next/head";
import React, { ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import authBG1 from "../../../../public/animations/agreement-animate.svg";
import authBG2 from "../../../../public/animations/personal-data-animate.svg";
import authBG3 from "../../../../public/animations/new-team-members-animate.svg";
import authBG4 from "../../../../public/animations/completed-animate.svg";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import { StepProvider, useStep } from "@/contexts/ApplicationStepContext";
import Link from "next/link";

interface ApplyLayoutProps {
  children: ReactNode;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({ children }) => {
  return (
    <StepProvider>
      <ApplyContent>{children}</ApplyContent>
    </StepProvider>
  );
};

const ApplyContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentStep, totalSteps = 4 } = useStep();
  const associationEmail = process.env.NEXT_PUBLIC_BTVERSE_INFO_EMAIL;

  const getBackgroundImage = () => {
    switch (currentStep) {
      case 0:
        return authBG1;
      case 1:
        return authBG2;
      case 2:
        return authBG3;
      case 3:
        return authBG4;
      default:
        return authBG1;
    }
  };

  const getSubtitle = () => {
    switch (currentStep) {
      case 0:
        return "Review Our Membership Terms";
      case 1:
        return "Provide Your Personal Info";
      case 2:
        return "Write Your Motivation";
      case 3:
        return "Finalize The Application";
      default:
        return "";
    }
  };

  // Client-side metadata
  const title = "Apply to Join ~ BioTec Universe";
  const description =
    "Apply to become a member of BioTec Universe, a bio-technology association in Cameroon, and join our community.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://biotecuniverse.org/apply" />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/en-US/apply"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://biotecuniverse.org/fr-FR/apply"
          hrefLang="fr-FR"
        />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-hidden">
        {/* Left Side - Branding & Illustration */}
        <div className="hidden lg:flex flex-col h-screen bg-gradient-to-br from-background to-secondary/20 relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary.DEFAULT)_1px,transparent_0)] bg-[size:40px_40px]"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full px-12 py-16">
            {/* Top Content */}
            <div className="space-y-6">
              <motion.h1
                className="text-5xl font-bold tracking-tight text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Apply to Join the Team
              </motion.h1>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                      {currentStep + 1}
                    </span>
                    <h2 className="text-2xl font-medium text-foreground">
                      {getSubtitle()}
                    </h2>
                  </div>

                  <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                      }}
                      animate={{
                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Animated Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="w-4/5 mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={getBackgroundImage()}
                  alt={`Step ${currentStep + 1} illustration`}
                  width={500}
                  height={500}
                  priority
                  className="drop-shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Form Content */}
        <div className="bg-card py-8 px-6 lg:px-12 flex flex-col">
          {/* Mobile header (visible only on small screens) */}
          <div className="lg:hidden mb-8 space-y-4">
            <h1 className="text-3xl font-bold text-primary text-center">
              Apply to Join the Team
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                {currentStep + 1}
              </span>
              <h2 className="text-xl font-medium text-foreground">
                {getSubtitle()}
              </h2>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <ProgressBar />
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with help text - optional */}
          <div className="mt-8 pt-4 border-t border-border text-sm text-muted-foreground text-center">
            Need help? Contact{" "}
            <Link href={`mailto:${associationEmail}`}>{associationEmail}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyLayout;
