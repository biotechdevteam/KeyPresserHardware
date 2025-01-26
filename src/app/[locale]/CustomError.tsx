"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomErrorProps {
  error: Error | string;
}

const CustomError: React.FC<CustomErrorProps> = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    // Optionally log the error to a service or console
    console.error(error);
  }, [error]);

  // Extract the error message based on the type of error
  const errorMessage =
    process.env.NODE_ENV === "development"
      ? typeof error === "string"
        ? error
        : error.message
      : "An error occurred.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-6xl font-bold mb-4">
            Oops!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-2xl mb-8">
            Something went wrong. Please try again, or go back to the Home page.
          </p>

          {/* Error details */}
          <pre className="bg-destructive/50 p-4 rounded-md text-destructive mb-4 text-wrap">
            {errorMessage}
          </pre>

          <div className="flex justify-center space-x-4">
            {/* Retry Button */}
            <Button
              onClick={() => window.location.reload()}
              className="px-6 py-2"
            >
              Try Again
            </Button>

            {/* Redirect to Home Button */}
            <Button
              onClick={() => router.push("/home")}
              className="inline-flex items-center px-6 py-3"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomError;
