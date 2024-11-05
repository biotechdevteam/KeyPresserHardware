"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Donation: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-primary-200 rounded-md shadow-md">
        <h1 className="text-4xl font-bold">Support Our Cause</h1>
        <p className="text-lg mt-4">
          Your donation helps us drive impactful projects, foster innovation,
          and support the growth of the biotechnology community.
        </p>
        <Button className="mt-6 px-8 py-3 text-lg">Donate Now</Button>
      </section>

      {/* Impact Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary-100 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Research Funding</h3>
            <p>
              Your contributions fund groundbreaking research in biotechnology.
            </p>
          </div>
          <div className="bg-secondary-100 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Community Growth</h3>
            <p>
              Help us provide resources, mentorship, and education for young
              scientists.
            </p>
          </div>
          <div className="bg-secondary-100 p-6 rounded-lg text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Educational Programs</h3>
            <p>
              Your support enables us to offer workshops, seminars, and
              webinars.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Choose Your Donation
        </h2>
        <div className="flex justify-center space-x-4">
          <Button
            variant={isRecurring ? "outline" : "default"}
            onClick={() => setIsRecurring(false)}
          >
            One-Time
          </Button>
          <Button
            variant={!isRecurring ? "outline" : "default"}
            onClick={() => setIsRecurring(true)}
          >
            Monthly
          </Button>
        </div>
        <div className="mt-6 text-center">
          <Input
            type="number"
            placeholder="Enter amount (USD)"
            value={amount ?? ""}
            onChange={handleAmountChange}
            className="w-1/2 text-center mx-auto"
          />
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Payment Details
        </h2>
        <form className="space-y-6 max-w-lg mx-auto">
          <Input placeholder="Name on Card" />
          <Input type="email" placeholder="Email Address" />
          <Input type="text" placeholder="Card Number" />
          <div className="flex space-x-4">
            <Input type="text" placeholder="MM/YY" />
            <Input type="text" placeholder="CVV" />
          </div>
          <Button className="w-full">
            Donate {amount ? `$${amount}` : ""}
          </Button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="bg-primary-100 p-4 rounded-lg shadow-md">
            <summary className="font-semibold">
              Is my donation tax-deductible?
            </summary>
            <p className="mt-2">
              Yes, all donations are tax-deductible to the full extent permitted
              by law.
            </p>
          </details>
          <details className="bg-primary-100 p-4 rounded-lg shadow-md">
            <summary className="font-semibold">
              Will I receive a receipt for my donation?
            </summary>
            <p className="mt-2">
              Yes, a receipt will be emailed to you after your donation is
              processed.
            </p>
          </details>
          <details className="bg-primary-100 p-4 rounded-lg shadow-md">
            <summary className="font-semibold">
              How is my donation used?
            </summary>
            <p className="mt-2">
              Your donation supports research, community programs, and
              educational events.
            </p>
          </details>
        </div>
      </section>

      {/* Acknowledgment Section */}
      <section className="py-12 bg-secondary-200 text-center rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold">Thank You for Your Support!</h2>
        <p className="mt-4">
          Share your support on social media and inspire others to contribute.
        </p>
        <Button className="mt-4 px-6 py-2">Share on Social Media</Button>
      </section>
    </div>
  );
};

export default Donation;
