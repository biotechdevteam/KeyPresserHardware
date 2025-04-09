"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import FollowUs from "../speed-dial/FollowUs";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { About } from "@/types/aboutSchema";
import SubscribeDialog from "../speed-dial/SubscribeDialogue";

const Footer: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const logo = aboutData?.logo_url || Logo.src;

  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Slogan */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" aria-label="Homepage">
              <Image
                src={logo}
                alt={aboutData?.name || "Company Logo"}
                width={80}
                height={80}
                priority
                className="rounded-lg"
              />
            </Link>
            <p className="mt-3 text-primary-foreground font-medium">
              {aboutData?.slogan}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary-foreground border-b pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/projects", text: "Our Projects" },
                { href: "/events", text: "Events" },
                { href: "/news-&-insights", text: "News" },
                { href: "/services", text: "Services" },
                { href: "/faqs", text: "FAQs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground hover:underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary-foreground border-b pb-1">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                {
                  href: "/about/partners-&-sponsors",
                  text: "Partners & Sponsors",
                },
                { href: "/about/mission-&-vision", text: "Mission & Vision" },
                { href: "/about/achievements", text: "Achievements" },
                { href: "/exhibitions-&-sponsorship", text: "Exhibitions" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground hover:underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary-foreground border-b pb-1">
              Connect With Us
            </h3>
            <FollowUs aboutData={aboutData} />
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground" />

        <div className="text-center">
          <p className="text-xs text-primary-foreground">
            &copy; {new Date().getFullYear()}{" "}
            {aboutData?.name || "Company Name"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
