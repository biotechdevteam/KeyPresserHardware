"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import FollowUs from "../speed-dial/FollowUs";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

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
    <footer className="bg-muted-primary py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Legal Section */}
        <Card className="p-4">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="flex cursor-pointer">
                <CardTitle className="text-lg font-semibold flex justify-between items-center">
                  Legal Pages
                  <ChevronDown className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="grid space-y-2">
                  <li>
                    <Link
                      href="/cookie-settings"
                      className="text-sm hover:underline"
                    >
                      Cookie Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-sm hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="text-sm hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/disclaimer"
                      className="text-sm hover:underline"
                    >
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Quick Links Section */}
        <Card className="p-4">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="flex cursor-pointer">
                <CardTitle className="text-lg font-semibold flex justify-between items-center">
                  Quick Links
                  <ChevronDown className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="space-y-2 grid">
                  <li>
                    <Link href="/" className="text-sm hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-sm hover:underline">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-sm hover:underline">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-sm hover:underline">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="text-sm hover:underline">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm hover:underline">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Explore Section */}
        <Card className="p-4">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <CardHeader className="flex cursor-pointer">
                <CardTitle className="text-lg font-semibold flex justify-between items-center">
                  Explore
                  <ChevronDown className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <ul className="space-y-2 grid">
                  <li>
                    <Link href="/about" className="text-sm hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-sm hover:underline"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="text-sm hover:underline">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" className="text-sm hover:underline">
                      Our Partners
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Subscribe Section */}
        <Card className="p-4">
          <CardHeader className="flex cursor-pointer">
            <CardTitle className="text-lg text-center">Subscribe</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-center">
              <p className="mb-4">
                Subscribe to our newsletter for the latest updates
              </p>
              <div className="max-w-xs mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="mb-4"
                />
                {isSubscribed ? (
                  <div className="text-center bg-primary w-auto mx-auto">
                    <p className="text-primary-foreground">
                      Thank you for subscribing!
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <p className="text-destructive text-sm mb-2">{error}</p>
                    )}
                    <Button
                      onClick={handleSubscribe}
                      size="lg"
                      className="w-full"
                    >
                      Subscribe
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Follow Us Section */}
        <FollowUs />
      </div>

      {/* Separator for clean UI separation */}
      <Separator className="m-6 w-auto" />

      {/* Footer Bottom */}
      <div className="container mx-auto text-center">
        <p className=" text-sm text-foreground italic">
          &copy; {new Date().getFullYear()} Biotech Universe. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
