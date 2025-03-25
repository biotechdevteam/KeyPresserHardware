import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/types/contactFormSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  onSuccess?: (data: ContactFormValues) => void;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className }) => {
  const t = useTranslations("contactform");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validate on blur for better user experience
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form Submitted", data);
      setSubmitSuccess(true);

      if (onSuccess) {
        onSuccess(data);
      }

      // Reset form after successful submission
      setTimeout(() => {
        reset();
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
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
    },
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit(onSubmit)}
      className={`grid grid-cols-1 sm:grid-cols-2 gap-6 bg-card p-8 rounded-xl shadow-md border border-border/30 ${className}`}
    >
      {/* First Name Field */}
      <motion.div variants={itemVariants}>
        <Label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("firstNameLabel")}
        </Label>
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder={t("firstNamePlaceholder")}
          className={`w-full transition-all duration-200 ${
            errors.firstName
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("firstNameError")}
          </p>
        )}
      </motion.div>

      {/* Last Name Field */}
      <motion.div variants={itemVariants}>
        <Label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("lastNameLabel")}
        </Label>
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder={t("lastNamePlaceholder")}
          className={`w-full transition-all duration-200 ${
            errors.lastName
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("lastNameError")}
          </p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <Label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("emailLabel")}
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className={`w-full transition-all duration-200 ${
            errors.email
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("emailError")}
          </p>
        )}
      </motion.div>

      {/* Phone Field */}
      <motion.div variants={itemVariants}>
        <Label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("phoneLabel")}
        </Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("phonePlaceholder")}
          className={`w-full transition-all duration-200 ${
            errors.phone
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("phoneError")}
          </p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div className="sm:col-span-2" variants={itemVariants}>
        <Label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("messageLabel")}
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className={`w-full min-h-32 transition-all duration-200 ${
            errors.message
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("messageError")}
          </p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div className="sm:col-span-2" variants={itemVariants}>
        <Button
          type="submit"
          className={`w-full py-3 transition-all duration-300 ${
            submitSuccess
              ? "bg-green-500 hover:bg-green-600"
              : "bg-primary hover:bg-primary/90"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("sendingMessage")}
            </>
          ) : submitSuccess ? (
            t("messageSent")
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {t("sendMessageButton")}
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
