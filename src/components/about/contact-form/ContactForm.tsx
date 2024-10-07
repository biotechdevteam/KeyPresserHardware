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
          className="block mb-2 text-sm font-medium text-muted"
        >
          {t("firstNameLabel")}
        </label>
        <Input
          id="firstName"
          {...register("firstName")}
          placeholder={t("firstNamePlaceholder")}
          className="w-auto rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{t("firstNameError")}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div className="">
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-muted"
        >
          {t("lastNameLabel")}
        </label>
        <Input
          id="lastName"
          {...register("lastName")}
          placeholder={t("lastNamePlaceholder")}
          className="w-auto rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.lastName && (
          <p className="text-sm text-destructive">{t("lastNameError")}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-muted"
        >
          {t("emailLabel")}
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className="w-auto rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{t("emailError")}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-muted"
        >
          {t("phoneLabel")}
        </label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("phonePlaceholder")}
          className="w-auto rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{t("phoneError")}</p>
        )}
      </div>

      {/* Message Field */}
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-muted"
        >
          {t("messageLabel")}
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          className="w-auto rounded-md border-muted focus:border-primary focus:ring-primary"
        />
        {errors.message && (
          <p className="text-sm text-destructive">{t("messageError")}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="w-auto bg-primary text-primary-foreground hover:bg-card transition-colors rounded-md"
        >
          {t("sendMessageButton")}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
