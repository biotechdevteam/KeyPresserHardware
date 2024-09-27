"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HomeIcon, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-6">
      <div className="mb-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button
          onClick={handleGoHome}
          className="inline-flex items-center px-6 py-3"
        >
          <HomeIcon className="mr-2 h-5 w-5" />
          Go to Homepage
        </Button>
      </div>

      <div className="flex justify-center mb-12">
        <a href="#" className="text-muted hover:text-primary mx-2">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="#" className="text-muted hover:text-primary mx-2">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="#" className="text-muted hover:text-primary mx-2">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="#" className="text-muted hover:text-primary mx-2">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>

      <div className="border-t border-muted pt-8 text-center">
        <p>&copy; 2024 QuickPay by King&apos;s Digital. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Custom404;
