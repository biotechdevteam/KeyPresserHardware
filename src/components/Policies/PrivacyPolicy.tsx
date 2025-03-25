"use client";
import { About } from "@/types/aboutSchema";
import React from "react";
import { Separator } from "../ui/separator";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { ArrowUpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const dateUpdated = "8th November 2024";
  const parentalGuide = 13;
  const infoEmail = process.env.BTVERSE_INFO_EMAIL || "info@biotecuniverse.org";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 px-4 sm:px-8 lg:px-16 py-12">
      <motion.div
        className="container mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="mb-10 relative" variants={sectionVariants}>
          <h1 className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Privacy Policy
          </h1>
          <Separator className="mx-auto w-24 mb-8 bg-primary/50" />
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-sm text-primary dark:text-primary-foreground">
              Last updated: <span className="font-semibold">{dateUpdated}</span>
            </span>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Welcome to{" "}
              <span className="font-medium text-foreground">
                {aboutData?.name}
              </span>
              . We are committed to protecting your privacy and ensuring that
              your personal information is secure. This Privacy Policy outlines
              how we collect, use, disclose, and safeguard your data when you
              visit our website, use our services, or engage with us in any way.
            </p>
            <p>
              By using our services, you agree to the terms outlined in this
              Privacy Policy. If you disagree with any part of this policy,
              please discontinue the use of our services.
            </p>
          </div>
        </motion.section>

        <ScrollArea className="h-full">
          <div className="space-y-12">
            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  1
                </span>
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground/90">
                    1.1 Personal Information
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    When you use our website or services, we may collect
                    personal information that you voluntarily provide,
                    including:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none ml-4 text-muted-foreground">
                    {[
                      "Name",
                      "Email address",
                      "Contact number",
                      "Billing and shipping address",
                      "Payment information",
                      "Other personal information necessary for service delivery",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground/90">
                    1.2 Non-Personal Information
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    We may also collect non-personal data automatically through
                    cookies, log files, or other similar technologies,
                    including:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none ml-4 text-muted-foreground">
                    {[
                      "Browser type and version",
                      "Device type (mobile or desktop)",
                      "IP address",
                      "Operating system",
                      "Pages viewed on our website",
                      "Time spent on the website",
                      "Referring website addresses",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground/90">
                    1.3 Cookies and Tracking Technologies
                  </h3>
                  <p className="text-muted-foreground">
                    We use cookies and similar tracking technologies to enhance
                    your experience. Cookies are small data files stored on your
                    device that help us understand user behavior, provide
                    personalized services, and improve our website
                    functionality. For more information on our cookie practices,
                    please refer to our{" "}
                    <Link href="/cookie-settings" className="text-primary">
                      Cookie Settings
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  2
                </span>
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect for various purposes,
                including:
              </p>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                {[
                  "To provide, manage, and improve the services you request.",
                  "To personalize your experience on our website by offering tailored content or recommendations.",
                  "To send you updates, newsletters, marketing materials, or service-related announcements.",
                  "To analyze website performance and improve our services.",
                  "To protect our website, users, and systems from fraud, cyber-attacks, or unauthorized access.",
                  "To comply with applicable laws, regulations, and contractual obligations.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2 mt-2"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Continue the pattern for other sections */}
            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  3
                </span>
                Sharing Your Information
              </h2>
              <p className="text-muted-foreground mb-3">
                We may share your personal information with trusted third
                parties in the following scenarios:
              </p>
              <ul className="space-y-2 ml-4 text-muted-foreground mb-4">
                {[
                  "We may share your data with third-party vendors or service providers who help us operate our website and deliver services.",
                  "We may disclose your data when required by law or in response to a valid request by public authorities.",
                  "If our company undergoes a merger, acquisition, or sale, your information may be transferred as part of that transaction.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2 mt-2"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-md text-foreground/90 font-medium">
                We do not sell or rent your personal information to any third
                parties.
              </div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  4
                </span>
                Data Retention
              </h2>
              <p className="text-muted-foreground">
                We retain your personal information for as long as necessary to
                provide the services outlined in this Privacy Policy or as
                required by law. Once we no longer need your data for these
                purposes, we will securely delete or anonymize it.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  5
                </span>
                Your Rights
              </h2>
              <p className="text-muted-foreground mb-3">
                Depending on your location and applicable law, you may have the
                following rights:
              </p>
              <ul className="space-y-2 ml-4 text-muted-foreground mb-4">
                {[
                  "Right to request a copy of the personal information we hold about you.",
                  "Right to request that we correct any inaccurate or incomplete information.",
                  "Right to request the deletion of your personal data when it is no longer necessary for us to retain it.",
                  "Right to request that we limit how we process your data in certain circumstances.",
                  "Right to object to our processing of your data for marketing or other purposes.",
                  "Right to request a portable copy of your data.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mr-2 mt-2"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                To exercise these rights, please contact us at{" "}
                <Link
                  href={`mailto:${infoEmail}`}
                  className="text-primary hover:underline transition-colors"
                >
                  {infoEmail}
                </Link>
                . We will respond to your request within the time frames
                required by applicable laws.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  6
                </span>
                Security of Your Information
              </h2>
              <p className="text-muted-foreground">
                We take the security of your personal information seriously and
                implement industry-standard security measures, such as
                encryption and access controls, to protect your data. However,
                no method of data transmission or storage is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  7
                </span>
                Children's Privacy
              </h2>
              <p className="text-muted-foreground">
                Our services are not directed to individuals under the age of{" "}
                <span className="font-medium text-foreground">
                  {parentalGuide}
                </span>
                , and we do not knowingly collect personal data from children.
                If we become aware that we have collected personal information
                from a child under {parentalGuide} without parental consent, we
                will delete that information as quickly as possible.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  8
                </span>
                Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, legal requirements, or for other
                operational reasons. When we make updates, we will revise the{" "}
                <span className="font-medium text-foreground">
                  Last Updated
                </span>{" "}
                date at the top of this document. We encourage you to
                periodically review this page for the latest information on our
                privacy practices.
              </p>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  9
                </span>
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions or concerns about this Privacy Policy
                or how we handle your personal information, please contact us
                at:
              </p>
              <div className="space-y-3 p-4 rounded-md bg-card">
                <div className="flex items-center space-x-2">
                  <span className="text-primary">Email:</span>
                  <Link href={`mailto:${infoEmail}`}>{infoEmail}</Link>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary">Phone:</span>
                  <Link href={`tel:${aboutData?.contact_phone}`}>
                    {aboutData?.contact_phone}
                  </Link>
                  <span>|</span>
                  <Link
                    href={`tel:+237671400077`}
                    className="text-primary hover:underline"
                  >
                    +237671400077
                  </Link>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={sectionVariants}
              className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary mr-3 text-sm">
                  10
                </span>
                Governing Law
              </h2>
              <p className="text-muted-foreground">
                This Privacy Policy shall be governed and construed in
                accordance with the laws of Cameroon, without regard to its
                conflict of law provisions.
              </p>
            </motion.section>
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
