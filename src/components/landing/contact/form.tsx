import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/types/contactFormSchema";
import { SendIcon, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

const ContactForm: React.FC = () => {
  const t = useTranslations("contactform");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Submitted", data);
      setSubmitStatus("success");
      reset();
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form field animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      ref={sectionRef}
      className={`container mx-auto p-8 border border-muted bg-card/80 backdrop-blur-sm rounded-xl shadow-lg max-w-3xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <h3 className="text-xl font-semibold text-center mb-6">
          We'd Love to Hear from You
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* First Name Field */}
          <motion.div variants={itemVariants} className="group">
            <Label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
            >
              {t("firstNameLabel")}
            </Label>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder={t("firstNamePlaceholder")}
              className={`w-full rounded-md border ${
                errors.firstName ? "border-destructive" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {t("firstNameError")}
              </p>
            )}
          </motion.div>

          {/* Last Name Field */}
          <motion.div variants={itemVariants} className="group">
            <Label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
            >
              {t("lastNameLabel")}
            </Label>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder={t("lastNamePlaceholder")}
              className={`w-full rounded-md border ${
                errors.lastName ? "border-destructive" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {t("lastNameError")}
              </p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="group">
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
            >
              {t("emailLabel")}
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className={`w-full rounded-md border ${
                errors.email ? "border-destructive" : ""
              }`}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {t("emailError")}
              </p>
            )}
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={itemVariants} className="group">
            <Label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
            >
              {t("phoneLabel")}
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              className={`w-full rounded-md border ${
                errors.phone ? "border-destructive" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {t("phoneError")}
              </p>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div variants={itemVariants} className="sm:col-span-2 group">
            <Label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors"
            >
              {t("messageLabel")}
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder={t("messagePlaceholder")}
              className={`w-full rounded-md border min-h-32 ${
                errors.message ? "border-destructive" : ""
              }`}
            />
            {errors.message && (
              <p className="text-destructive text-xs mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {t("messageError")}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 flex justify-center mt-4"
          >
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
              className={`px-6 py-2 rounded-full min-w-40 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-primary/80"
                  : "bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Message Sent!</span>
                </>
              ) : submitStatus === "error" ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Failed to Send</span>
                </>
              ) : (
                <>
                  {t("sendMessageButton")} <SendIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
