"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../../../lib/utils/pageTransitions";
import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, Network, Zap } from "lucide-react";

const EventExhibitions: React.FC = () => {
  const router = useTransitionRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 mx-auto max-w-5xl">
      {/* Page Header */}
      <motion.header
        className="text-center mb-12 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Exhibitions & Sponsorship
        </h1>
        <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto">
          Join us in showcasing the future of biotechnology. Discover unique
          opportunities to exhibit and sponsor our groundbreaking events.
        </p>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Exhibition Opportunities Section */}
        <motion.section variants={itemVariants} className="my-6">
          <Card className="p-6 md:p-8 overflow-hidden relative shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 right-0 h-24 w-24 bg-blue-100 dark:bg-blue-900/30 rounded-bl-full opacity-70 z-10"></div>
            <div className="text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Exhibition Opportunities
                </h2>
                <Separator className="w-24 mx-auto sm:mx-0 my-4" />
                <p className="text-base">
                  Present your products, services, and innovations to a targeted
                  audience. Our exhibitions offer prime visibility for biotech
                  companies, research institutions, and entrepreneurs.
                </p>
              </div>
              <Button
                className="mt-6 sm:mt-0 group"
                variant="default"
                size="lg"
                onClick={() =>
                  router.push("/contact", { onTransitionReady: slideInOut })
                }
              >
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Sponsorship Packages Section */}
        <motion.section variants={itemVariants} className="my-6">
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Sponsorship Packages
              </h2>
              <Separator className="w-24 mx-auto my-4" />
              <p className="text-base max-w-2xl mx-auto">
                Partner with us and gain visibility, enhance your brand image,
                and engage with the biotech community. We offer tailored
                sponsorship packages to suit diverse needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-background border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-ring flex flex-col">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">Gold Sponsor</h3>
                  <p className="text-sm mt-3 flex-grow">
                    Maximum visibility, keynote speaking slots, and premium
                    promotional opportunities throughout the event.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Learn More
                  </Button>
                </div>
                <div className="bg-background border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-ring flex flex-col">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">Silver Sponsor</h3>
                  <p className="text-sm mt-3 flex-grow">
                    Prominent branding on event materials, dedicated exhibit
                    space, and exclusive networking sessions.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Learn More
                  </Button>
                </div>
                <div className="bg-background border p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-ring flex flex-col">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Network className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">Bronze Sponsor</h3>
                  <p className="text-sm mt-3 flex-grow">
                    Brand recognition, exhibit space, and privileged access to
                    our biotech community.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Benefits of Sponsorship Section */}
        <motion.section variants={itemVariants} className="my-6">
          <Card className="p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Benefits of Sponsorship
              </h2>
              <Separator className="w-24 mx-auto my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start p-4 rounded-lg bg-background shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-green-700 dark:text-green-400">
                      Industry Exposure
                    </h3>
                    <p className="mt-1 text-sm">
                      Direct exposure to industry leaders, researchers, and key
                      stakeholders in biotechnology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-background shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-green-700 dark:text-green-400">
                      Brand Visibility
                    </h3>
                    <p className="mt-1 text-sm">
                      Increased brand visibility and credibility within the
                      biotechnology community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-background shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-green-700 dark:text-green-400">
                      Networking
                    </h3>
                    <p className="mt-1 text-sm">
                      Valuable opportunities to network and forge new
                      partnerships and collaborations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 rounded-lg bg-background shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-green-700 dark:text-green-400">
                      Thought Leadership
                    </h3>
                    <p className="mt-1 text-sm">
                      Enhanced reputation as a thought leader and innovator in
                      biotechnology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Contact Section */}
        <motion.section variants={itemVariants} className="my-10">
          <Card className="p-8 md:p-10 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Ready to Partner With Us?
            </h2>
            <p className="text-base mb-6 max-w-lg mx-auto">
              Contact our team to discuss how you can participate in our
              exhibitions or become a sponsor for our upcoming biotechnology
              events.
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() =>
                router.push("/contact", { onTransitionReady: slideInOut })
              }
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default EventExhibitions;
