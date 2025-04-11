"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/lib/utils/pageTransitions";

interface CustomErrorProps {
  error: Error | string;
  resetError?: () => void;
}

const CustomError: React.FC<CustomErrorProps> = ({ error, resetError }) => {
  const router = useTransitionRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage =
    process.env.NODE_ENV === "development"
      ? typeof error === "string"
        ? error
        : error.message
      : undefined;

  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background/95 p-4">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-4xl font-bold text-primary">
            Oops!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-6">
            Something went wrong. Please try again or return to the home page.
          </p>

          {errorMessage && (
            <div className="bg-destructive/10 p-3 rounded-md mb-6 overflow-auto max-h-32">
              <p className="text-destructive text-sm font-mono">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={handleRetry} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                router.push("/home", { onTransitionReady: slideInOut })
              }
              className="flex items-center gap-2"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomError;
