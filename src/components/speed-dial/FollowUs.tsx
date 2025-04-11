"use client";
import React from "react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MessageCircleMoreIcon,
} from "lucide-react";
import Link from "next/link";
import { About } from "@/types/aboutSchema";

const getSocialIcon = (url: string, phone?: string) => {
  if (url.includes("linkedin.com")) return <LinkedinIcon className="w-5 h-5" />;
  if (url.includes("facebook.com")) return <FacebookIcon className="w-5 h-5" />;
  if (url.includes("instagram.com"))
    return <InstagramIcon className="w-5 h-5" />;
  if (url.includes("twitter.com")) return <TwitterIcon className="w-5 h-5" />;
  if (url === `https://wa.me/${phone?.replace(/\D/g, "")}`)
    return <MessageCircleMoreIcon className="w-5 h-5" />;
  return null;
};

// Helper to get platform name from URL
const getPlatformName = (url: string, phone?: string) => {
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("twitter.com")) return "Twitter";
  if (url === `https://wa.me/${phone?.replace(/\D/g, "")}`) return "WhatsApp";
  return "Social Media";
};

const FollowUs: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  // Extract social links from object if it exists, otherwise use empty array
  const socialLinksBase = aboutData?.social_links
    ? Object.values(aboutData.social_links).filter(
        (link) =>
          typeof link === "string" && link.trim() !== "" && link !== undefined
      )
    : [];

  // Add WhatsApp link if phone number exists
  const whatsappLink =
    aboutData?.contact_phone && typeof aboutData.contact_phone === "string"
      ? `https://wa.me/${aboutData.contact_phone.replace(/\D/g, "")}`
      : null;
  const socialLinks = whatsappLink
    ? [...socialLinksBase, whatsappLink]
    : socialLinksBase;

  if (socialLinks.length === 0) {
    return (
      <p className="text-primary-foreground text-sm">
        No social links available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((link: string, i: number) => {
        const icon = getSocialIcon(link, aboutData?.contact_phone);
        // Only render if we have a valid icon
        if (!icon) return null;

        const platformName = getPlatformName(link, aboutData?.contact_phone);

        return (
          <Link
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-primary/10 rounded-full transition-transform hover:scale-110"
            aria-label={`Follow us on ${platformName}`}
          >
            {icon}
          </Link>
        );
      })}
    </div>
  );
};

export default FollowUs;
