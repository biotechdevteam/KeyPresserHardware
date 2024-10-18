"use client";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import FollowUs from "../speed-dial/FollowUs";
import { Link } from "next-view-transitions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { About } from "@/types/aboutSchema";
import Logo from "../../../public/images/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Footer: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const logo = aboutData?.logo_url || Logo.src;

  const handleSubscribe = () => {
    if (!email) {
      setError("Please enter a valid email.");
    } else {
      setIsSubscribed(true);
      setError("");
      // Add subscription logic here
    }
  };

  return (
    <footer className="bg-primary py-12">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 mx-auto">
        {/* Logo Section */}
        <div className="sm:col-span-2 lg:col-span-1 text-center lg:text-left mb-6 lg:mb-0">
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

        {/* Quick Links Section */}
        <div className=" text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-base hover:underline text-primary-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-base hover:underline text-primary-foreground"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-base hover:underline text-primary-foreground"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-base hover:underline text-primary-foreground"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="text-base hover:underline text-primary-foreground"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-base hover:underline text-primary-foreground"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className=" text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/partners"
                className="text-base hover:underline text-primary-foreground"
              >
                Our Partners
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="text-base hover:underline text-primary-foreground"
              >
                Testimonials
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
            <li>
              <Link
                href="/contact"
                className="text-base hover:underline text-primary-foreground"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className=" text-center lg:text-left">
          <h3 className="text-lg font-semibold mb-4">Legal Pages</h3>
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
                href="/terms-and-conditions"
                className="text-base hover:underline text-primary-foreground"
              >
                Terms & Conditions
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

        {/* Subscribe Section */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Subscribe To Our Newsletter
            </CardTitle>
            <CardDescription>
              Join our mailing list to receive the latest updates and special
              offers from {aboutData?.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="max-w-xs mx-auto">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="-mt-4">
            {isSubscribed ? (
              <p className="text-primary-foreground">
                Thank you for subscribing!
              </p>
            ) : (
              <Button onClick={handleSubscribe} size="lg" className="w-full">
                Subscribe
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Follow Us Section */}
        <FollowUs />
      </div>

      {/* Footer Bottom */}
      <Separator className="m-6 w-auto" />
      <div className="container mx-auto text-center">
        <p className="text-sm text-foreground italic">
          &copy; {new Date().getFullYear()} {aboutData?.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
