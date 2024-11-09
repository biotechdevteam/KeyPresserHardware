"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { CheckCheck, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Link } from "next-view-transitions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const CookieSettings: React.FC = () => {
  const [performanceCookies, setPerformanceCookies] = useState(true);
  const [functionalityCookies, setFunctionalityCookies] = useState(true);
  const [targetingCookies, setTargetingCookies] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const savePreferences = () => {
    setShowAlert(true);
    // Hide the alert after a short delay
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="min-h-screen px-8 lg:px-16 py-12">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4">Cookie Settings</h1>
        <Separator className="mx-auto w-24 mb-8" />
        <p className="text-lg text-muted-foreground text-center mb-6">
          Welcome to our Cookie Settings. Here, you can manage your cookie
          preferences. We use cookies to enhance your browsing experience,
          provide essential services, and analyze traffic. You can accept or
          reject non-essential cookies and change your preferences at any time.
        </p>

        {/* About Cookies section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center">About Cookies</h2>
          <p className="text-muted-foreground mb-4">
            Cookies are small text files stored on your device that allow
            websites to remember your actions and preferences over a period of
            time. They enable you to navigate between pages efficiently,
            remember your preferences, and generally improve your experience.
          </p>
          <p className="text-muted-foreground">
            We classify cookies into the following categories:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
            <li>Strictly Necessary Cookies</li>
            <li>Performance Cookies</li>
            <li>Functionality Cookies</li>
            <li>Targeting/Advertising Cookies</li>
          </ul>
        </section>

        {/* Manage Cookie Preferences */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Manage Your Cookie Preferences
          </h2>
          <p className="text-muted-foreground mb-8 text-center">
            You can choose which types of cookies you want to allow by adjusting
            the settings below.
          </p>

          <div className="space-y-8">
            {/* Strictly Necessary Cookies */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl">
                  Strictly Necessary Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These cookies are essential for the website to function
                  correctly and cannot be disabled in our systems. They are
                  usually set in response to actions you take, such as setting
                  your privacy preferences, logging in, or filling in forms.
                </p>
                <div className="flex items-center justify-between">
                  <p className="mt-2 font-semibold">
                    Status: Always Active (Cannot be disabled)
                  </p>
                  <Switch checked disabled aria-readonly />
                </div>
              </CardContent>
            </Card>

            {/* Performance Cookies */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Performance Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Performance cookies help us understand how visitors interact
                  with our website by collecting information anonymously. These
                  cookies help us monitor the performance of the website and
                  identify areas for improvement.
                </p>
                <div className="flex items-center justify-between">
                  <p className="mt-2 font-semibold">
                    Status: {performanceCookies ? "Enabled" : "Disabled"}
                  </p>
                  <Switch
                    checked={performanceCookies}
                    onCheckedChange={setPerformanceCookies}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Functionality Cookies */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Functionality Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Functionality cookies allow us to remember your preferences,
                  such as language selection or region, and provide enhanced
                  features.
                </p>
                <div className="flex items-center justify-between">
                  <p className="mt-2 font-semibold">
                    Status: {functionalityCookies ? "Enabled" : "Disabled"}
                  </p>
                  <Switch
                    checked={functionalityCookies}
                    onCheckedChange={setFunctionalityCookies}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Targeting/Advertising Cookies */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-xl">
                  Targeting/Advertising Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These cookies are used to deliver advertisements that are more
                  relevant to you and your interests. They do not store personal
                  information but are based on uniquely identifying your
                  browser.
                </p>
                <div className="flex items-center justify-between">
                  <p className="mt-2 font-semibold">
                    Status: {targetingCookies ? "Enabled" : "Disabled"}
                  </p>
                  <Switch
                    checked={targetingCookies}
                    onCheckedChange={setTargetingCookies}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="text-center mt-8">
            {/* Alert that shows conditionally */}
            {showAlert && (
              <Alert variant="success">
                <CheckCheck className="w-4 h-4" />
                <AlertTitle>Saved!</AlertTitle>
                <AlertDescription>
                  Your preferences have been saved.
                </AlertDescription>
              </Alert>
            )}
            <Button variant="default" onClick={() => savePreferences}>
              Save Preferences <Save className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Additional Information Sections */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies to provide core functionalities such as security,
            network management, and accessibility, personalize your experience,
            gather data on website interactions to improve performance, and
            deliver relevant advertisements.
          </p>
          <p className="text-muted-foreground">
            Learn more about how we handle personal data in our{" "}
            <Link href="/privacy-policy">Privacy Policy.</Link>
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="faq 1">
              <AccordionTrigger>
                What happens if I disable all cookies?
              </AccordionTrigger>
              <AccordionContent>
                Disabling all cookies may affect your ability to access some
                features and services on our website. Essential services such as
                logging in, saving preferences, and secure navigation may not
                work properly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq 2">
              <AccordionTrigger>Can I change my mind later?</AccordionTrigger>
              <AccordionContent>
                Yes, you can change your cookie preferences anytime by returning
                to this page or adjusting your browser settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default CookieSettings;
