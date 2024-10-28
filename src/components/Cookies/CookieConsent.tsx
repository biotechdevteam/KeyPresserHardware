"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  // Check if user has already given consent
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show after 3 seconds delay
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
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

  if (!isVisible || hasConsented !== null) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-popover text-popover-foreground border p-8 lg:p-16 shadow-lg z-50 transition-all duration-500 transform",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Message */}
        <p className="text-sm lg:text-base">
          We use cookies to improve your experience on our site. By accepting
          all, you agree to the use of cookies as described in our privacy policy.
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
