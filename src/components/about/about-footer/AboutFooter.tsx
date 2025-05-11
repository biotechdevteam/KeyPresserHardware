"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Github,
  Instagram,
  MapPin,
  Globe,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ContactForm from "../contact-form/ContactForm";
import { extractUsername } from "@/lib/helpers";
import Link from "next/link";
import { About } from "@/types/aboutSchema";
import { motion } from "framer-motion";

interface ContactProps {
  aboutData: About;
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ aboutData, className }) => {
  const t = useTranslations();
  const websiteURL =
    process.env.NEXT_PUBLIC_WEBSITE_URL || "https://biotecuniverse.org";
  const infoEmail = process.env.BTVERSE_INFO_EMAIL || "info@biotecuniverse.org";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const contactItems = [
    {
      key: "email",
      value: infoEmail,
      icon: <Mail size={24} />,
      label: "Email",
      href: `mailto:${infoEmail}`,
      color: "bg-blue-500",
    },
    {
      key: "phone",
      value: aboutData.contact_phone,
      icon: <Phone size={24} />,
      label: "Phone",
      href: `tel:${aboutData.contact_phone}`,
      color: "bg-green-500",
    },
    aboutData.address && {
      key: "address",
      value: aboutData.address,
      icon: <MapPin size={24} />,
      label: "Address",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        aboutData.address
      )}`,
      color: "bg-red-500",
    },
    websiteURL && {
      key: "website",
      value: "www.biotecuniverse.org",
      icon: <Globe size={24} />,
      label: "Website",
      href: websiteURL,
      color: "bg-purple-500",
    },
  ].filter(Boolean);

  const socialLinks = [
    {
      key: "linkedin",
      url: aboutData.social_links?.linkedin,
      icon: <Linkedin size={24} />,
      extract: extractUsername,
      color: "bg-[#0077B5]",
      label: "LinkedIn",
    },
    {
      key: "twitter",
      url: aboutData.social_links?.twitter,
      icon: <Twitter size={24} />,
      extract: extractUsername,
      color: "bg-[#1DA1F2]",
      label: "Twitter",
    },
    {
      key: "facebook",
      url: aboutData.social_links?.facebook,
      icon: <Facebook size={24} />,
      extract: extractUsername,
      color: "bg-[#1877F2]",
      label: "Facebook",
    },
    {
      key: "github",
      url: aboutData.social_links?.github,
      icon: <Github size={24} />,
      extract: extractUsername,
      color: "bg-[#333333]",
      label: "GitHub",
    },
    {
      key: "instagram",
      url: aboutData.social_links?.instagram,
      icon: <Instagram size={24} />,
      extract: extractUsername,
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
      label: "Instagram",
    },
  ].filter((link) => link.url);

  return (
    <section className={`py-12 bg-background/50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            {t("footer.contactInformationTitle")}
          </motion.h2>

          {/* Contact Information Cards - Grid Layout */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactItems
              .filter(
                (
                  item
                ): item is {
                  key: string;
                  value: string | undefined;
                  icon: JSX.Element;
                  label: string;
                  href: string;
                  color: string;
                } => typeof item === "object" && item !== null
              )
              .map((item, index) => (
                <motion.div key={item.key} variants={fadeInUp} custom={index}>
                  <Link
                    href={item.href}
                    target={
                      item.key === "website" || "address" ? "_blank" : undefined
                    }
                  >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50 rounded-xl group hover:translate-y-[-5px]">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div
                          className={`${item.color} text-white p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {item.icon}
                        </div>
                        <h4 className="font-semibold text-lg mb-2">
                          {item.label}
                        </h4>
                        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.value}
                          {item.key === "phone" && (
                            <>
                              <br />
                              <span>or</span>
                              <br />
                              <Link
                                href="tel:+237671400077"
                                className="text-muted-foreground"
                              >
                                +237-671-400-077
                              </Link>
                            </>
                          )}
                          {item.key === "website" && (
                            <ExternalLink size={14} className="ml-1 inline" />
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </motion.div>

          {/* Social Media and Contact Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Media Links Card */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">
                    {t("footer.socialMediaTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-1 gap-4"
                  >
                    {socialLinks &&
                      socialLinks
                        .filter(
                          (social) => social.url && social.url !== undefined
                        )
                        .map((social, index) => (
                          <motion.div
                            key={social.key}
                            variants={fadeInUp}
                            custom={index}
                          >
                            <Link
                              href={social.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-lg hover:bg-accent transition-colors group"
                            >
                              <div
                                className={`${social.color} p-2 rounded-full mr-4 text-white`}
                              >
                                {social.icon}
                              </div>
                              <span className="flex-grow font-medium">
                                {social.label}
                              </span>
                              <ExternalLink
                                size={16}
                                className="opacity-70 group-hover:opacity-100"
                              />
                            </Link>
                          </motion.div>
                        ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form - Takes 2 columns in md+ screens */}
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <Card className="h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold flex items-center justify-center">
                    <MessageSquare className="mr-2 text-primary" />
                    {t("footer.contactFormTitle")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ContactForm className="h-full" />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
