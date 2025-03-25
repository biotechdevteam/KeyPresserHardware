"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { About } from "@/types/aboutSchema";
import { motion } from "framer-motion";
import {
  Check,
  FileText,
  Users,
  BookOpen,
  Building,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

const MembershipQualifications: React.FC<{ aboutData: About }> = ({
  aboutData,
}) => {
  const router = useTransitionRouter();
  const infoEmail = process.env.BTVERSE_INFO_EMAIL || "info@biotecuniverse.org";
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl lg:text-5xl font-bold inline-block px-6 py-2 rounded-lg">
          Membership Qualifications
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
          Join a community of innovators driving the future of biotechnology. To
          ensure our members contribute to and benefit from our network, we have
          specific membership qualifications that applicants must meet.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8"
      >
        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-2xl font-semibold">
                  General Qualifications
                </h2>
              </div>
              <p className="mb-4 text-muted-foreground">
                At{" "}
                <span className="font-medium text-foreground">
                  {aboutData.name}
                </span>
                , we welcome individuals and organizations who are passionate
                about biotechnology and committed to its advancement. To become
                a member, you must meet one or more of the following criteria:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  {
                    title: "Academic Background:",
                    description:
                      "Possess a degree (BSc, MSc, PhD) in Biotechnology, Biochemistry, Molecular Biology, Genetics, Bioinformatics, or any related life sciences field.",
                  },
                  {
                    title: "Professional Experience:",
                    description:
                      "Individuals working in biotechnology, pharmaceuticals, agriculture, healthcare, or any related industry with a minimum of 2 years of experience.",
                  },
                  {
                    title: "Institutional Membership:",
                    description:
                      "Universities, research institutes, and organizations working in biotechnology or life sciences are encouraged to apply.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{item.title}</span>{" "}
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-amber-500 mr-3" />
                <h2 className="text-2xl font-semibold">
                  Documentation Required
                </h2>
              </div>
              <p className="mb-4 text-muted-foreground">
                When applying for membership, please be ready to submit the
                following documents:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  {
                    title: "Academic Transcripts",
                    description:
                      "or proof of current enrollment for student members.",
                  },
                  {
                    title: "Professional Resume or CV",
                    description:
                      "outlining relevant work experience and contributions.",
                  },
                  {
                    title: "Letter of Recommendation",
                    description:
                      "from a current member (optional) or a professional reference in the biotechnology sector.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">{item.title}</span>{" "}
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-semibold">Membership Tiers</h2>
              </div>
              <p className="mb-4 text-muted-foreground">
                We offer different membership tiers based on your professional
                background and experience. These include:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                {[
                  {
                    title: "Student Membership",
                    description:
                      "Open to undergraduates, postgraduates, and PhD candidates.",
                    icon: Users,
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    title: "Professional Membership",
                    description:
                      "For individuals working in the biotech field with 2+ years of experience.",
                    icon: Users,
                    color: "bg-purple-100 text-purple-600",
                  },
                  {
                    title: "Institutional Membership",
                    description:
                      "For organizations such as universities, biotech companies, and research centers.",
                    icon: Building,
                    color: "bg-amber-100 text-amber-600",
                  },
                ].map((tier, index) => (
                  <Card
                    key={index}
                    className="p-4 flex flex-col h-full border border-muted hover:border-primary transition-colors"
                  >
                    <div
                      className={`p-3 rounded-full ${tier.color} w-fit mb-3`}
                    >
                      <tier.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tier.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-500 mr-3" />
                <h2 className="text-2xl font-semibold">Code of Conduct</h2>
              </div>
              <p className="mb-4 text-muted-foreground">
                {aboutData.name} is a professional association that values
                ethical behavior and mutual respect among its members. All
                applicants are required to adhere to our{" "}
                <strong>Code of Conduct</strong>, which promotes:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  "Integrity in research and biotechnology practices.",
                  "Respect for intellectual property rights.",
                  "Commitment to advancing the biotech industry and sharing knowledge with fellow members.",
                ].map((item, index) => (
                  <li key={index} className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="mt-4">
          <Card className="overflow-hidden bg-gradient-to-r from-primary/10 to-background hover:shadow-lg transition-shadow">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
              <p className="mb-6">
                Interested in becoming a member? Simply fill out our membership
                application form and attach your required documents. Once
                submitted, our team will review your application, and you will
                be notified within 14 business days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() =>
                    router.push("/membership-tiers", {
                      onTransitionReady: slideInOut,
                    })
                  }
                >
                  Apply for Membership
                </Button>

                <div className="text-sm text-muted-foreground">
                  <strong>For inquiries:</strong>{" "}
                  <Link href={`mailto:${infoEmail}`}>{infoEmail}</Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MembershipQualifications;
