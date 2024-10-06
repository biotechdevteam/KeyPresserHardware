import React from "react";
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
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 space-y-0 sm:space-y-4"
    >
      {/* First Name Field */}
      <div className="transition-opacity duration-500 ease-in-out">
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("firstNameLabel")}
        </label>
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder={t("firstNamePlaceholder")}
          className="w-full rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.firstName && (
          <p className="text-sm text-red-600">{t("firstNameError")}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div className="">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("lastNameLabel")}
        </label>
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder={t("lastNamePlaceholder")}
          className="w-full rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.lastName && (
          <p className="text-sm text-red-600">{t("lastNameError")}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("emailLabel")}
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{t("emailError")}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("phoneLabel")}
        </label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("phonePlaceholder")}
          className="w-full rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{t("phoneError")}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {t("messageLabel")}
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.message && (
          <p className="text-sm text-red-600">{t("messageError")}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-secondary transition-colors rounded-md"
        >
          {t("sendMessageButton")}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
