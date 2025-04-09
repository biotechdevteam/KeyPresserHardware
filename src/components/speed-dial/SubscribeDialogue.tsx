"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper } from "lucide-react";

const SubscribeDialog: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status on mount
  useEffect(() => {
    const subscribed = localStorage.getItem("isSubscribed");
    if (subscribed === "true") {
      setIsSubscribed(false);
    }
  }, []);

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribed with email:", email);
      // Here you would typically make an API call to subscribe
      // For this example, we'll just set it locally
      localStorage.setItem("isSubscribed", "true");
      setIsSubscribed(true);
      setEmail("");
    }
  };

  // If already subscribed, don't render the component
  if (isSubscribed) {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-8 z-20">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="flex items-center gap-2 shadow-lg"
            animation="beep"
          >
            <Newspaper className="h-4 w-4" />
            Get the Latest Scoop
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Unlock Exclusive Updates!</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Stay ahead with cutting-edge insights delivered straight to your
              inbox.
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <Input
              type="email"
              placeholder="Enter your email for VIP access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-primary"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" onClick={handleSubscribe}>
                Join the Insider List
              </Button>

              <DialogClose asChild>
                <Button variant="outline" className="flex-1">
                  Maybe Later
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscribeDialog;
