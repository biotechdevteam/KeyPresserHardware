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

const ContactForm: React.FC = () => {
  const t = useTranslations("contactform");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-card p-6 rounded-lg shadow-lg"
    >
      {/* First Name Field */}
      <div>
        <Label
          htmlFor="firstName"
          className="block mb-2 text-sm font-semibold text-muted-primary"
        >
          {t("firstNameLabel")}
        </Label>
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder={t("firstNamePlaceholder")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.firstName
              ? "border-destructive ring-destructive"
              : "border-border focus:ring-primary"
          }`}
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-destructive">{t("firstNameError")}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div>
        <Label
          htmlFor="lastName"
          className="block mb-2 text-sm font-semibold text-muted-primary"
        >
          {t("lastNameLabel")}
        </Label>
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder={t("lastNamePlaceholder")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.lastName
              ? "border-destructive ring-destructive"
              : "border-border focus:ring-blue-500"
          }`}
        />
        {errors.lastName && (
          <p className="mt-1 text-xs text-destructive">{t("lastNameError")}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <Label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-muted-primary"
        >
          {t("emailLabel")}
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-destructive ring-destructive"
              : "border-border focus:ring-blue-500"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{t("emailError")}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <Label
          htmlFor="phone"
          className="block mb-2 text-sm font-semibold text-muted-primary"
        >
          {t("phoneLabel")}
        </Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("phonePlaceholder")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.phone
              ? "border-destructive ring-destructive"
              : "border-border focus:ring-blue-500"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{t("phoneError")}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="sm:col-span-2">
        <Label
          htmlFor="message"
          className="block mb-2 text-sm font-semibold text-muted-primary"
        >
          {t("messageLabel")}
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none ${
            errors.message
              ? "border-destructive ring-destructive"
              : "border-border focus:ring-blue-500"
          }`}
          rows={4}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{t("messageError")}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full"
        >
          {t("sendMessageButton")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
