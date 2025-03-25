"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  CheckCheck,
  Save,
  Cookie,
  Shield,
  LineChart,
  PaintBucket,
  Target,
  Info,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const CookieSettings: React.FC = () => {
  const [performanceCookies, setPerformanceCookies] = useState(true);
  const [functionalityCookies, setFunctionalityCookies] = useState(true);
  const [targetingCookies, setTargetingCookies] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const savePreferences = () => {
    // Show success alert
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);

    // Here you would typically save the settings to localStorage or server
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        performance: performanceCookies,
        functionality: functionalityCookies,
        targeting: targetingCookies,
      })
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background px-4 sm:px-8 lg:px-16 py-12">
      <motion.div
        className="container mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center mb-3">
            <Cookie className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-4xl font-bold text-center">Cookie Settings</h1>
          </div>
          <Separator className="mx-auto w-32 mb-6 bg-primary/40" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-card/60 backdrop-blur-sm p-6 rounded-lg border shadow-sm mb-10"
        >
          <p className="text-lg text-center leading-relaxed">
            Welcome to our Cookie Settings. Here, you can manage your cookie
            preferences. We use cookies to enhance your browsing experience,
            provide essential services, and analyze traffic.
          </p>
        </motion.div>

        {/* About Cookies section */}
        <motion.section
          className="mb-12 bg-card p-6 rounded-lg border shadow-sm"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Info className="mr-2 h-6 w-6 text-primary" />
            About Cookies
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Cookies are small text files stored on your device that allow
            websites to remember your actions and preferences over a period of
            time. They enable you to navigate between pages efficiently,
            remember your preferences, and generally improve your experience.
          </p>
          <p className="text-muted-foreground font-medium mb-2">
            We classify cookies into the following categories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start space-x-3 p-3 rounded-md bg-primary/5 border border-primary/10">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Strictly Necessary</h3>
                <p className="text-sm text-muted-foreground">
                  Essential for website functionality
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-md bg-primary/5 border border-primary/10">
              <LineChart className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Help us improve website experience
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-md bg-primary/5 border border-primary/10">
              <PaintBucket className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Functionality</h3>
                <p className="text-sm text-muted-foreground">
                  Remember preferences & settings
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-md bg-primary/5 border border-primary/10">
              <Target className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Targeting/Advertising</h3>
                <p className="text-sm text-muted-foreground">
                  Deliver relevant advertisements
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Manage Cookie Preferences */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Manage Your Cookie Preferences
          </h2>

          <div className="space-y-4">
            {/* Strictly Necessary Cookies */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-l-4 border-l-blue-500">
                <CardHeader className="bg-blue-500/5 pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-blue-500" />
                      Strictly Necessary Cookies
                    </CardTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                            Required
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-64">
                            These cookies are essential and cannot be disabled
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are essential for the website to function
                    correctly and cannot be disabled in our systems. They are
                    usually set in response to actions you take, such as setting
                    your privacy preferences, logging in, or filling in forms.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 py-3">
                  <p className="font-medium text-sm">Always Active</p>
                  <Switch
                    checked
                    disabled
                    aria-readonly
                    className="pointer-events-none"
                  />
                </CardFooter>
              </Card>
            </motion.div>

            {/* Performance Cookies */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-l-4 border-l-green-500">
                <CardHeader className="bg-green-500/5 pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-green-500" />
                    Performance Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Performance cookies help us understand how visitors interact
                    with our website by collecting information anonymously.
                    These cookies help us monitor the performance of the website
                    and identify areas for improvement.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 py-3">
                  <p className="font-medium text-sm flex items-center">
                    Status:
                    <span
                      className={`ml-1 ${
                        performanceCookies ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {performanceCookies ? "Enabled" : "Disabled"}
                    </span>
                  </p>
                  <Switch
                    checked={performanceCookies}
                    onCheckedChange={setPerformanceCookies}
                  />
                </CardFooter>
              </Card>
            </motion.div>

            {/* Functionality Cookies */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-l-4 border-l-purple-500">
                <CardHeader className="bg-purple-500/5 pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <PaintBucket className="mr-2 h-5 w-5 text-purple-500" />
                    Functionality Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Functionality cookies allow us to remember your preferences,
                    such as language selection or region, and provide enhanced
                    features.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 py-3">
                  <p className="font-medium text-sm flex items-center">
                    Status:
                    <span
                      className={`ml-1 ${
                        functionalityCookies ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {functionalityCookies ? "Enabled" : "Disabled"}
                    </span>
                  </p>
                  <Switch
                    checked={functionalityCookies}
                    onCheckedChange={setFunctionalityCookies}
                  />
                </CardFooter>
              </Card>
            </motion.div>

            {/* Targeting/Advertising Cookies */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden border-l-4 border-l-amber-500">
                <CardHeader className="bg-amber-500/5 pb-3">
                  <CardTitle className="text-xl flex items-center">
                    <Target className="mr-2 h-5 w-5 text-amber-500" />
                    Targeting/Advertising Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are used to deliver advertisements that are
                    more relevant to you and your interests. They do not store
                    personal information but are based on uniquely identifying
                    your browser.
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t bg-muted/20 py-3">
                  <p className="font-medium text-sm flex items-center">
                    Status:
                    <span
                      className={`ml-1 ${
                        targetingCookies ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {targetingCookies ? "Enabled" : "Disabled"}
                    </span>
                  </p>
                  <Switch
                    checked={targetingCookies}
                    onCheckedChange={setTargetingCookies}
                  />
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4"
                >
                  <Alert
                    variant="default"
                    className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your cookie preferences have been saved successfully.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="default"
              onClick={savePreferences}
              className="px-8 py-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300"
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Preferences <Save className="w-4 h-4 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.section>

        {/* Additional Information Section */}
        <motion.section
          className="mt-12 bg-card/60 backdrop-blur-sm p-6 rounded-lg border shadow-sm"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            We use cookies to provide core functionalities such as security,
            network management, and accessibility, personalize your experience,
            gather data on website interactions to improve performance, and
            deliver relevant advertisements.
          </p>
          <div className="p-4 bg-primary/10 rounded-md border border-primary/20">
            <p className="text-foreground">
              Learn more about how we handle personal data in our{" "}
              <Link
                href="/privacy-policy"
                className="text-primary underline hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section className="mt-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="faq-1"
              className="bg-card border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 transition-colors">
                <span className="text-left font-medium">
                  What happens if I disable all cookies?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">
                <p className="leading-relaxed">
                  Disabling all cookies may affect your ability to access some
                  features and services on our website. Essential services such
                  as logging in, saving preferences, and secure navigation may
                  not work properly. Strictly necessary cookies cannot be
                  disabled as they are essential for the website to function.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-2"
              className="bg-card border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 transition-colors">
                <span className="text-left font-medium">
                  Can I change my mind later?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">
                <p className="leading-relaxed">
                  Yes, you can change your cookie preferences anytime by
                  returning to this page or adjusting your browser settings.
                  Your latest preferences will be saved and applied to your
                  browsing experience.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="faq-3"
              className="bg-card border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 transition-colors">
                <span className="text-left font-medium">
                  How long do cookies stay on my device?
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-muted-foreground">
                <p className="leading-relaxed">
                  The lifespan of cookies varies depending on their type.
                  Session cookies last only until you close your browser, while
                  persistent cookies remain on your device for a set period,
                  which can range from a few days to several months, depending
                  on their purpose.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default CookieSettings;
