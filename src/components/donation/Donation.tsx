"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  Share2,
  Heart,
  Award,
  Book,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Label } from "../ui/label";
import SocialMediaShareTemplate from "../templates/SocialMediaShareTemplate";

// Define types for better type safety
type DonationAmount = 10 | 25 | 50 | 100 | number;
type DonationFrequency = "one-time" | "monthly";

interface PaymentDetails {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const Donation: React.FC = () => {
  // Enhanced state management with proper types
  const [amount, setAmount] = useState<DonationAmount | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<DonationFrequency>("one-time");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<PaymentDetails>>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Predefined donation amounts
  const donationOptions: DonationAmount[] = [10, 25, 50, 100];

  // Handle donation amount selection
  const handleAmountSelect = (selectedAmount: DonationAmount) => {
    setAmount(selectedAmount);
    setCustomAmount("");
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value ? Number(value) : null);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form on submission
  const validateForm = () => {
    const newErrors: Partial<PaymentDetails> = {};

    if (!paymentDetails.name) newErrors.name = "Name is required";
    if (!paymentDetails.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(paymentDetails.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!paymentDetails.cardNumber)
      newErrors.cardNumber = "Card number is required";
    if (!paymentDetails.expiry) newErrors.expiry = "Expiry date is required";
    if (!paymentDetails.cvv) newErrors.cvv = "CVV is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && amount) {
      // Here you would typically handle the payment processing
      console.log("Processing donation:", {
        amount,
        frequency,
        paymentDetails,
      });
      // Show success message, reset form, etc.
    }
  };

  // Check form validity whenever inputs change
  useEffect(() => {
    const valid =
      !!amount &&
      !!paymentDetails.name &&
      !!paymentDetails.email &&
      !!paymentDetails.cardNumber &&
      !!paymentDetails.expiry &&
      !!paymentDetails.cvv;

    setIsFormValid(valid);
  }, [amount, paymentDetails]);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-16">
      {/* Hero Section - Using Card for better structure */}
      <Card className="border-none shadow-lg overflow-hidden">
        <CardContent className="p-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Support Our Cause
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Your donation helps us drive impactful projects, foster
              innovation, and support the growth of the BioTec Community.
            </p>
            <Button
              size="lg"
              className="mt-8 px-10 py-6 text-lg rounded-xl shadow-md"
              onClick={() =>
                document
                  .getElementById("donation-options")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Donate Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Impact Section - Using motion for animation */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="group">
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card">
              <CardHeader className="text-center pb-0">
                <div className="mx-auto p-3 bg-sky-100 dark:bg-sky-900 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Heart className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Research Funding
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Your contributions fund groundbreaking research in
                  biotechnology that can change lives.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card">
              <CardHeader className="text-center pb-0">
                <div className="mx-auto p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Community Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Help us provide resources, mentorship, and education for
                  aspiring scientists worldwide.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card">
              <CardHeader className="text-center pb-0">
                <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Book className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Educational Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Your support enables us to offer workshops, seminars, and
                  accessible learning resources.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Donation Options - Enhanced UI with preset amounts and toggle button */}
      <motion.section
        id="donation-options"
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Donation
        </h2>

        <Card className="max-w-2xl mx-auto border-none shadow-lg">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-8">
              <div className="bg-input p-1 rounded-xl inline-flex">
                <button
                  onClick={() => setFrequency("one-time")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    frequency === "one-time"
                      ? "bg-card shadow-sm text-primary"
                      : "bg-background text-muted-foreground"
                  )}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setFrequency("monthly")}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    frequency === "monthly"
                      ? "bg-card shadow-sm text-primary"
                      : "bg-background text-muted-foreground"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {donationOptions.map((option) => (
                <Button
                  key={option}
                  variant={amount === option ? "default" : "outline"}
                  className={cn("h-16 text-lg font-semibold")}
                  onClick={() => handleAmountSelect(option)}
                >
                  ${option}
                </Button>
              ))}
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder="Custom Amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="text-center text-lg py-6 px-4 border-2"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  $
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Payment Form - Enhanced with validation and better UX */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Payment Details
        </h2>

        <Card className="max-w-xl mx-auto border-none shadow-lg">
          <CardContent className="pt-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name on Card
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={paymentDetails.name}
                  onChange={handleInputChange}
                  className={cn(
                    "focus:ring-2",
                    errors.name ? "border-destructive" : ""
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={paymentDetails.email}
                  onChange={handleInputChange}
                  className={cn(
                    "focus:ring-2",
                    errors.email ? "border-destructive" : ""
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-sm font-medium">
                  Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    className={cn(
                      "pl-10 focus:ring-2",
                      errors.cardNumber ? "border-destructive" : ""
                    )}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-medium">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentDetails.expiry}
                    onChange={handleInputChange}
                    className={cn(
                      "focus:ring-2",
                      errors.expiry ? "border-destructive" : ""
                    )}
                  />
                  {errors.expiry && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.expiry}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-sm font-medium">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    className={cn(
                      "focus:ring-2",
                      errors.cvv ? "border-destructive" : ""
                    )}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className={cn(
                  "w-full py-6 text-lg font-medium mt-4",
                  !isFormValid && "opacity-70 cursor-not-allowed"
                )}
              >
                {amount
                  ? `Donate ${
                      frequency === "monthly"
                        ? `$${amount} Monthly`
                        : `$${amount} Once`
                    }`
                  : "Select an amount"}
              </Button>

              <p className="text-xs text-center mt-2">
                Your payment information is secure and encrypted
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.section>

      {/* FAQ Section - Using Accordion for better UX */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <Card className=" mx-auto border-none shadow-lg">
          <CardContent className="pt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is my donation tax-deductible?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, all donations are tax-deductible to the full extent
                  permitted by law. You will receive a receipt for your donation
                  that can be used for tax purposes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Will I receive a receipt for my donation?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, a receipt will be emailed to you immediately after your
                  donation is processed. If you don't receive it, please check
                  your spam folder or contact our support team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How is my donation used?</AccordionTrigger>
                <AccordionContent>
                  Your donation supports research projects, community programs,
                  educational events, and operational costs. We maintain full
                  transparency about how funds are allocated and publish annual
                  reports detailing our expenditures.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I cancel my monthly donation?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your monthly donation at any time by
                  logging into your account or contacting our support team.
                  There are no penalties or fees for cancellation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.section>

      {/* Acknowledgment Section */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Card className="border-none shadow-lg">
          <CardContent className="p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Thank You for Your Support!
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Your contribution makes a real difference. Share your support on
              social media and inspire others to join our mission.
            </p>
            <SocialMediaShareTemplate
              donorName={paymentDetails.name}
              amount={amount || 0}
              isMonthly={frequency === "monthly"}
            />
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default Donation;
