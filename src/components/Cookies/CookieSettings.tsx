"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CookieSettings: React.FC = () => {
  const [performanceCookies, setPerformanceCookies] = useState(false);
  const [functionalityCookies, setFunctionalityCookies] = useState(false);
  const [targetingCookies, setTargetingCookies] = useState(false);

  return (
    <div className="min-h-screen bg-background px-8 lg:px-16 py-12">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cookie Settings
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Welcome to our Cookie Settings page. Here, you can manage your cookie
          preferences. We use cookies to enhance your browsing experience,
          provide essential services, and analyze traffic. You can accept or
          reject non-essential cookies and change your preferences at any time.
        </p>

        {/* Cookie Categories */}
        <div className="space-y-8">
          {/* Strictly Necessary Cookies */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Strictly Necessary Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These cookies are essential for the website to function
                correctly and cannot be disabled in our systems. They are
                usually set in response to actions you take, such as setting
                your privacy preferences, logging in, or filling in forms.
              </p>
              <p className="mt-2 font-semibold">Status: Always Active</p>
            </CardContent>
          </Card>

          {/* Performance Cookies */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Performance Cookies</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Performance cookies help us understand how visitors interact
                with our website by collecting information anonymously. These
                cookies help us monitor the performance of the website and
                identify areas for improvement.
              </p>
              {/* <Switch
                checked={performanceCookies}
                onCheckedChange={setPerformanceCookies}
              /> */}
            </CardContent>
          </Card>

          {/* Functionality Cookies */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Functionality Cookies</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-muted-foreground">
                Functionality cookies allow us to remember your preferences,
                such as language selection or region, and provide enhanced
                features.
              </p>
              {/* <Switch
                checked={functionalityCookies}
                onCheckedChange={setFunctionalityCookies}
              /> */}
            </CardContent>
          </Card>

          {/* Targeting/Advertising Cookies */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Targeting/Advertising Cookies</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-muted-foreground">
                These cookies are used to deliver advertisements that are more
                relevant to you and your interests. They do not store personal
                information but are based on uniquely identifying your browser.
              </p>
              {/* <Switch
                checked={targetingCookies}
                onCheckedChange={setTargetingCookies}
              /> */}
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <Button
            className="px-6 py-3 text-lg"
            variant="default"
            onClick={() => alert("Preferences Saved!")}
          >
            Save Preferences
          </Button>
        </div>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">What happens if I disable all cookies?</h3>
              <p className="text-muted-foreground">
                Disabling all cookies may affect your ability to access some
                features and services on our website. Essential services such as
                logging in, saving preferences, and secure navigation may not
                work properly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can I change my mind later?</h3>
              <p className="text-muted-foreground">
                Yes, you can change your cookie preferences anytime by returning
                to this page or adjusting your browser settings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookieSettings;
