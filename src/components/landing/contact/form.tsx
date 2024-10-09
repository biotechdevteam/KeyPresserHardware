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
    <div className="container mx-auto p-8 shadow-xl bg-opacity rounded-lg max-w-3xl">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* First Name Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium"
          >
            {t("firstNameLabel")}
          </label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder={t("firstNamePlaceholder")}
            className="w-full rounded-lg border-border focus:border-primary focus:ring-primary transition-colors"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{t("firstNameError")}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium"
          >
            {t("lastNameLabel")}
          </label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder={t("lastNamePlaceholder")}
            className="w-full rounded-lg border-border focus:border-primary focus:ring-primary transition-colors"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{t("lastNameError")}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium"
          >
            {t("emailLabel")}
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-lg border-border focus:border-primary focus:ring-primary transition-colors"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{t("emailError")}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="transition-transform duration-300 hover:scale-105 ">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium"
          >
            {t("phoneLabel")}
          </label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder={t("phonePlaceholder")}
            className="w-full rounded-lg border-border focus:border-primary focus:ring-primary transition-colors"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{t("phoneError")}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2 transition-transform duration-300 hover:scale-105">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium"
          >
            {t("messageLabel")}
          </label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder={t("messagePlaceholder")}
            className="w-full rounded-lg border-border focus:border-primary focus:ring-primary transition-colors"
          />
          {errors.message && (
            <p className="text-sm text-destructive">{t("messageError")}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-center">
          <Button
            type="submit"
            className="w-auto px-6 py-3"
            variant="secondary"
          >
            {t("sendMessageButton")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
