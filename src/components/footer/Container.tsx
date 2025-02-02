"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import FollowUs from "../speed-dial/FollowUs";
import { Link, useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
// import { slideInOut } from "../../lib/utils/pageTransitions";
import { About } from "@/types/aboutSchema";

const Footer: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const logo = aboutData?.logo_url || Logo.src;
  // const router = useTransitionRouter();

  // const handleClick = (e: React.MouseEvent, url: string) => {
  //   e.preventDefault(); // Prevent default link behavior
  //   router.push(url, { onTransitionReady: slideInOut });
  // };

  return (
    <div className="bg-secondary py-12">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 mx-auto">
        {/* Logo Section */}
        <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center">
          <Link href="/" aria-label="Homepage">
            <Image
              src={logo}
              alt={aboutData?.name}
              width={100}
              height={100}
              priority
              className="mx-auto lg:mx-0 rounded-lg"
            />
          </Link>
          <p className="mt-4 text-lg font-semibold text-primary-foreground">
            {aboutData?.slogan}
          </p>
        </div>

        <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mx-auto sm:col-span-2 lg:col-span-1">
          {/* Quick Links Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground underline">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about/story"
                  className="text-base hover:underline text-primary-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/ongoing-projects"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Events
                </Link>
              </li>
              <li>
                <Link
                  href="/news-&-insights"
                  className="text-base hover:underline text-primary-foreground"
                >
                  News & Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-base hover:underline text-primary-foreground"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground underline">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about/partners-&-sponsors"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Partners & Sponsors
                </Link>
              </li>
              <li>
                <Link
                  href="/about/mission-&-vision"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Mission & Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/about/achievements"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitions-&-sponsorship"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Our Exhibitions & Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground underline">
              Legal Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cookie-settings"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-base hover:underline text-primary-foreground"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links Section */}
        <FollowUs aboutData={aboutData} />
      </div>

      {/* Footer Bottom */}
      <Separator className="m-6 w-auto bg-primary-foreground" />
      <div className="container mx-auto text-center">
        <p className="text-sm text-primary-foreground italic">
          &copy; {new Date().getFullYear()} {aboutData?.name}. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
