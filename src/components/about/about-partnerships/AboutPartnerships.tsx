"use client";
import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import { About } from "@/types/aboutSchema";
import { motion } from "framer-motion";

interface Partnership {
  partner: string;
  description?: string;
  logo: string;
  website?: string;
}

const AboutPartnerships: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl lg:text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Valued Partners & Sponsors
        </motion.h2>

        <motion.p
          className="text-base mt-4 mb-10 max-w-3xl mx-auto text-center text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We are proud to collaborate with leading organizations and sponsors
          that share our commitment to advancing biotechnology. Together, we
          drive innovation, empower research, and create impactful solutions for
          a sustainable future.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {aboutData.partnerships?.map(
            (partnership: Partnership, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href={partnership?.website || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-center h-32 p-4 rounded-lg hover:shadow-md ${
                        !partnership.website && "cursor-default"
                      }`}
                    >
                      <Image
                        src={partnership.logo}
                        alt={`${partnership.partner} logo`}
                        style={{ objectFit: "contain" }}
                        className="max-h-full w-auto transition-opacity group-hover:opacity-90"
                        width={150}
                        height={150}
                      />
                    </Link>
                  </HoverCardTrigger>

                  <HoverCardContent>
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-lg font-semibold text-primary">
                        {partnership.partner}
                      </h3>
                      {partnership.description && (
                        <p className="text-sm text-muted-foreground">
                          {partnership.description}
                        </p>
                      )}
                      {partnership.website && (
                        <Link
                          href={partnership.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium mt-2 inline-flex items-center"
                        >
                          Visit Website
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutPartnerships;
