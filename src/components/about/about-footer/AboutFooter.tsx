"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import Error from "@/app/[locale]/error";
import Loader from "@/components/loader/Loader";
import { fetchAboutData } from "@/lib/utils/fetchUtils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { extractDomain } from "@/lib/helpers";

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

const AboutFooter = ({
  aboutData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const t = useTranslations();
  const websiteURL = extractDomain();

// Handle loading or error states
if (isError) return <Error error={error} />;
if (!aboutData) return <Loader />;

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
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {aboutData.contact_email}
                </Link>
              </div>
              <Separator />
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" />
                <Link
                  href={`tel:${aboutData.contact_phone}`}
                  className="text-secondary hover:text-primary transition-colors"
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
                  <Globe className="mr-3 text-foreground" />
                  <a
                    href={websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    {websiteURL}
                  </a>
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
              {aboutData.social_links.linkedin && (
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
        <Card className="bg-card shadow-lg col-span-1 md:col-span-2 p-4">
          <CardContent className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-6">
              {t("footer.contactFormTitle")}
            </h3>
            <div className="max-w-lg">
              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};

export default AboutFooter;
