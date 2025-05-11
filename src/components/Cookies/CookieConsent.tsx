"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Link } from "next-view-transitions";
import { motion, AnimatePresence } from "framer-motion";

type ConsentStatus = "accepted" | "rejected" | null;

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState<ConsentStatus>(null);

  // Check if user has already given consent
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent") as ConsentStatus;

    if (!consent) {
      // Show more quickly but not immediately - better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show after 2 seconds instead of 10

      return () => clearTimeout(timer);
    } else {
      setHasConsented(consent);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    setHasConsented("accepted");
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    setHasConsented("rejected");
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (hasConsented !== null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:bottom-8 bg-card text-card-foreground rounded-lg border shadow-lg z-50 overflow-hidden"
        >
          <div className="relative p-4 md:p-6">
            {/* Close Button */}
            <Button
              onClick={closeBanner}
              aria-label="Close cookie consent banner"
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-1 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2">
              {/* Message */}
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-medium">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to improve your experience on our site. You can
                  accept all cookies or customize your preferences in the{" "}
                  <Link
                    href="/cookie-settings"
                    className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Cookie Settings
                  </Link>
                  . For more information, see our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col xs:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="default"
                  onClick={acceptCookies}
                  className="w-full xs:w-auto"
                >
                  Accept All
                </Button>
                {/* <Button
                  variant="outline"
                  onClick={rejectCookies}
                  className="w-full xs:w-auto"
                >
                  Reject All
                </Button> */}
              </div>
            </div>
          </div>

          {/* Progress bar that fills up over time */}
          <motion.div
            className="h-1 bg-primary/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 30 }} // 30 seconds until auto-close (optional)
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
