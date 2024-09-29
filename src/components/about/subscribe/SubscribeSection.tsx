import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SubscribeSection: React.FC = () => {
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
    <div className="p-6 bg-card rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
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
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Button onClick={handleSubscribe} size="lg" className="w-full">
        Subscribe
      </Button>
      {isSubscribed && (
        <p className="text-green-500 mt-4">Thank you for subscribing!</p>
      )}
    </div>
  );
};

export default SubscribeSection;
