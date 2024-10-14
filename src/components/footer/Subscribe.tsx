import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Subscribed with email:", email);
    setIsSubscribed(true);
    setEmail("");
    setError("");
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg mx-auto text-center max-w-4xl mt-6">
      <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
      <p className="mb-4">Subscribe to our newsletter for the latest updates</p>
      <div className="max-w-xs mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="mb-4"
        />
        {isSubscribed ? (
          <div className="text-center bg-primary w-auto mx-auto">
            <p className="text-primary-foreground">Thank you for subscribing!</p>
          </div>
        ) : (
          <>
            {error && <p className="text-destructive text-sm mb-2">{error}</p>}
            <Button onClick={handleSubscribe} size="lg" className="w-full">
              Subscribe
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
