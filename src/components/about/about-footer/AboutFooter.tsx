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

interface AboutFooterProps {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
  };
}

const AboutFooter: React.FC<AboutFooterProps> = ({
  contactEmail,
  contactPhone,
  socialLinks,
  address,
  website,
}) => {
  const t = useTranslations();

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
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <Separator />
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" />
                <span className="text-foreground">{contactPhone}</span>
              </div>
              <Separator />
              {address && (
                <div className="flex items-center">
                  <MapPin className="mr-3 text-primary" />
                  <span className="text-foreground">{address}</span>
                </div>
              )}
              <Separator />
              {website && (
                <div className="flex items-center">
                  <Globe className="mr-3 text-foreground" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    {website}
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
              {socialLinks?.linkedin && (
                <div className="flex items-center">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Linkedin className="w-5 h-5 mr-3" />
                    {extractUsername(socialLinks.linkedin)}
                  </a>
                </div>
              )}
              <Separator />
              {socialLinks?.twitter && (
                <div className="flex items-center">
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Twitter className="w-5 h-5 mr-3" />
                    {extractUsername(socialLinks.twitter)}
                  </a>
                </div>
              )}
              <Separator />
              {socialLinks?.facebook && (
                <div className="flex items-center">
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Facebook className="w-5 h-5 mr-3" />
                    {extractUsername(socialLinks.facebook)}
                  </a>
                </div>
              )}
              <Separator />
              {socialLinks?.github && (
                <div className="flex items-center">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    {extractUsername(socialLinks.github)}
                  </a>
                </div>
              )}
              <Separator />
              {socialLinks?.instagram && (
                <div className="flex items-center">
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Instagram className="w-5 h-5 mr-3" />
                    {extractUsername(socialLinks.instagram)}
                  </a>
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
