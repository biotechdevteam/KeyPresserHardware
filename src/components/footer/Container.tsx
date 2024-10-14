import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import the Card component from shadcn
import { Button } from "@/components/ui/button"; // Import the Button component from shadcn
import { Separator } from "@/components/ui/separator"; // For separating sections
import FollowUs from "../speed-dial/FollowUs"; // Assuming you have this component
import Link from "next/link";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Legal Section */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-4">Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
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
                <Link href="/disclaimer" className="text-sm hover:underline">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick Links Section */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-4">
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
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
                <Link href="/blog" className="text-sm hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Explore Section */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold mb-4">
              Explore
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm hover:underline">
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
        </Card>

        {/* Subscribe Section */}
        <Card className="p-4">
          <Subscribe />
        </Card>

        {/* Follow Us Section */}
          <FollowUs />
      </div>

      {/* Separator for clean UI separation */}
      <Separator className="my-6" />

      {/* Footer Bottom */}
      <div className="container mx-auto text-center text-sm italic">
        <p>&copy; {new Date().getFullYear()} BTVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
