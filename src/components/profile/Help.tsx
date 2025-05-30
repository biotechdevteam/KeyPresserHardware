"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { HelpFormSchema, HelpFormData } from "@/types/HelpSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Send, Loader2, Upload, X, File } from "lucide-react";
import useAuth from "@/lib/useAuth";

const HelpForm: React.FC = () => {
  const t = useTranslations("Help");
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<HelpFormData>({
    resolver: zodResolver(HelpFormSchema),
    mode: "onBlur",
    defaultValues: {
      subject: undefined,
      description: "",
    },
  });

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("attachment", file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: HelpFormData) => {
    try {
      setIsSubmitting(true);

      // Prepare submission data with user info
      const submissionData = {
        name: `${user?.first_name} ${user?.last_name}`,
        email: user?.email,
        ...data,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Help Form Submitted", submissionData);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        reset();
        setSelectedFile(null);
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
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-card p-8 rounded-xl shadow-md"
    >
      {/* Subject Field */}
      <motion.div variants={itemVariants}>
        <Label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("subjectLabel")}
        </Label>
        <Select
          onValueChange={(value) =>
            setValue("subject", value as HelpFormData["subject"])
          }
          disabled={isSubmitting}
        >
          <SelectTrigger
            id="subject"
            className={`w-full transition-all duration-200 ${
              errors.subject
                ? "border-destructive focus:ring-destructive/50"
                : "focus:ring-primary/50"
            }`}
            aria-invalid={errors.subject ? "true" : "false"}
          >
            <SelectValue placeholder={t("subjectPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical_issue">
              {t("subjectOptions.technical_issue")}
            </SelectItem>
            <SelectItem value="billing_problem">
              {t("subjectOptions.billing_problem")}
            </SelectItem>
            <SelectItem value="feature_request">
              {t("subjectOptions.feature_request")}
            </SelectItem>
            <SelectItem value="account_issue">
              {t("subjectOptions.account_issue")}
            </SelectItem>
            <SelectItem value="other">{t("subjectOptions.other")}</SelectItem>
          </SelectContent>
        </Select>
        {errors.subject && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("subjectError")}
          </p>
        )}
      </motion.div>

      {/* Description Field */}
      <motion.div className="sm:col-span-2" variants={itemVariants}>
        <Label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("descriptionLabel")}
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder={t("descriptionPlaceholder")}
          className={`w-full min-h-32 transition-all duration-200 ${
            errors.description
              ? "border-destructive focus:ring-destructive/50"
              : "focus:ring-primary/50"
          }`}
          disabled={isSubmitting}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("descriptionError")}
          </p>
        )}
      </motion.div>

      {/* Attachment Field */}
      <motion.div className="sm:col-span-2" variants={itemVariants}>
        <Label
          htmlFor="attachment"
          className="block mb-2 text-sm font-medium text-foreground"
        >
          {t("attachmentLabel")}
        </Label>
        <div className="flex items-center gap-3 p-4 border border-muted rounded-lg bg-muted/10">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <File className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground">
              {selectedFile ? selectedFile.name : t("attachmentPlaceholder")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("attachmentHint")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="attachment"
              accept="image/png,image/jpeg,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("attachment")?.click()}
              disabled={isSubmitting}
            >
              <Upload className="h-4 w-4 mr-2" />
              {t("attachmentUpload")}
            </Button>
            {selectedFile && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => {
                  setSelectedFile(null);
                  setValue("attachment", undefined);
                }}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {errors.attachment && (
          <p className="mt-1.5 text-xs font-medium text-destructive">
            {t("attachmentError")}
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

export default HelpForm;
