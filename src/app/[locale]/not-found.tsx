"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";
import { motion } from "framer-motion";
import { slideInOut } from "@/lib/utils/pageTransitions";

const Custom404 = () => {
  const router = useTransitionRouter();

  // Handler for Go to Homepage button
  const handleGoHome = () => {
    router.push("/", { onTransitionReady: slideInOut });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div className="w-full max-w-md text-center space-y-6">
        {/* Error Message */}
        <div>
          <h1 className="text-5xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-medium mt-2 mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => router.back()} size="lg">
            Go Back
          </Button>

          <Button
            variant="outline"
            onClick={handleGoHome}
            className="flex items-center gap-2"
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Custom404;
