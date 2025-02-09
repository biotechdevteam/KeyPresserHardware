"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import { useTranslations } from "next-intl";
import ContactForm from "../contact-form/ContactForm";
import { extractUsername } from "@/lib/helpers";
import Link from "next/link";
import { extractDomain } from "@/lib/helpers";
import { About } from "@/types/aboutSchema";

const AboutFooter: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const t = useTranslations();
  const websiteURL = extractDomain();

  return (
    <footer className="py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card className="shadow-lg p-4">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-6">
              {t("footer.contactInformationTitle")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-3 text-primary" />
                <Link
                  href={`mailto:${aboutData.contact_email}`}
                  className="hover:text-primary transition-colors"
                >
                  {aboutData.contact_email}
                </Link>
              </div>
              <Separator />
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" />
                <Link
                  href={`tel:${aboutData.contact_phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {aboutData.contact_phone}
                </Link>
              </div>
              <Separator />
              {aboutData.address && (
                <div className="flex items-center">
                  <MapPin className="mr-3 text-primary" />
                  <span className="text-foreground">{aboutData.address}</span>
                </div>
              )}
              <Separator />
              {websiteURL && (
                <div className="flex items-center">
                  <Globe className="mr-3 text-primary" />
                  <Link
                    href="https://biotecuniverse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:transition-colors"
                  >
                    {/* {websiteURL} */}
                    https://biotecuniverse.com
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="bg-card shadow-lg p-4">
          <CardContent>
            <h3 className="text-2xl font-semibold mb-6">
              {t("footer.socialMediaTitle")}
            </h3>
            <div className="space-y-4">
              {aboutData.social_links?.linkedin && (
                <div className="flex items-center">
                  <Link
                    href={aboutData.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Linkedin className="w-5 h-5 mr-3" />
                    {extractUsername(aboutData.social_links.linkedin)}
                  </Link>
                </div>
              )}
              <Separator />
              {aboutData.social_links?.twitter && (
                <div className="flex items-center">
                  <Link
                    href={aboutData.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Twitter className="w-5 h-5 mr-3" />
                    {extractUsername(aboutData.social_links.twitter)}
                  </Link>
                </div>
              )}
              <Separator />
              {aboutData.social_links?.facebook && (
                <div className="flex items-center">
                  <Link
                    href={aboutData.social_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Facebook className="w-5 h-5 mr-3" />
                    {extractUsername(aboutData.social_links.facebook)}
                  </Link>
                </div>
              )}
              <Separator />
              {aboutData.social_links?.github && (
                <div className="flex items-center">
                  <Link
                    href={aboutData.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    {extractUsername(aboutData.social_links.github)}
                  </Link>
                </div>
              )}
              <Separator />
              {aboutData.social_links?.instagram && (
                <div className="flex items-center">
                  <Link
                    href={aboutData.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Instagram className="w-5 h-5 mr-3" />
                    {extractUsername(aboutData.social_links.instagram)}
                  </Link>
                </div>
              )}
              <Separator />
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-6">
            {t("footer.contactFormTitle")}
          </h3>
          <div className="max-w-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
