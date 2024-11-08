"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { XIcon } from "lucide-react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../../../pageTransitions";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const router = useTransitionRouter();

  // Check if user has already given consent
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Show after 5 seconds
    } else {
      setHasConsented(consent === "accepted");
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    setHasConsented(true);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    setHasConsented(false);
  };

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible || hasConsented !== null) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-popover text-popover-foreground border p-4 lg:p-8 shadow-lg z-50 transition-transform duration-500 transform",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      {/* Close Icon */}
      <Button
        onClick={closeBanner}
        aria-label="Close"
        size="close"
        className="absolute top-4 right-4"
      >
        <XIcon />
      </Button>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 mt-8">
        {/* Message */}
        <p className="text-sm lg:text-base flex-1 px-2">
          We use cookies to improve your experience on our site. You can accept
          all cookies or select preferences in the{" "}
          <Link
            href="/cookie-settings"
            onClick={() =>
              router.push("/cookie-settings", { onTransitionReady: slideInOut })
            }
          >
            Cookie Settings.
          </Link>{" "}
          For more information, see our{" "}
          <Link
            href="/privacy-policy"
            onClick={() =>
              router.push("/privacy-policy", { onTransitionReady: slideInOut })
            }
          >
            Privacy Policy.
          </Link>
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="default" onClick={acceptCookies}>
            Accept All
          </Button>
          <Button variant="outline" onClick={rejectCookies}>
            Reject All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
