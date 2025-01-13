"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import FollowUs from "../speed-dial/FollowUs";
import { Link, useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { slideInOut } from "../../lib/utils/pageTransitions";
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch about data
    const aboutData = await fetchAboutData();

    // Return data as props (no ISR)
    return {
      props: {
        aboutData,
        isError: false,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        aboutData: null,
        isError: true,
        error: error.message || "An unexpected error occurred.",
      },
    };
  }
};

const Footer = ({
  aboutData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const logo = aboutData?.logo_url || Logo.src;
  const router = useTransitionRouter();

  // Handle loading or error states
  if (isError) return <Error error={error} />;
  if (!aboutData) return <Loader />;

  const handleClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Prevent default link behavior
    router.push(url, { onTransitionReady: slideInOut });
  };

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
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/story" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/story")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/ongoing-projects" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/ongoing-projects")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/upcoming-events")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Events
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news-&-insights" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/news-&-insights")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    News & Insights
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/services")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faqs" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/faqs")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    FAQs
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/partners-&-sponsors" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/partners-&-sponsors")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Partners & Sponsors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/mission-&-vision" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/mission-&-vision")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Mission & Vision
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/achievements" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/achievements")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Achievements
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/exhibitions-&-sponsorship" legacyBehavior>
                  <a
                    onClick={(e) =>
                      handleClick(e, "/exhibitions-&-sponsorship")
                    }
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Our Exhibitions & Sponsorship
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
              Legal Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cookie-settings" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/cookie-settings")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Cookie Settings
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/privacy-policy")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/refund-policy")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Refund Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" legacyBehavior>
                  <a
                    onClick={(e) => handleClick(e, "/disclaimer")}
                    className="text-base hover:underline text-primary-foreground"
                  >
                    Disclaimer
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links Section */}
        <FollowUs />
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
