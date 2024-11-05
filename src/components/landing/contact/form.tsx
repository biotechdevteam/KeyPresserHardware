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
import { SendIcon } from "lucide-react";

const ContactForm: React.FC = () => {
  const t = useTranslations("contactform");
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        root: null, // Observe relative to the viewport
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    // Cleanup observer on component unmount
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

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
    <div
      ref={sectionRef}
      className="container mx-auto p-8 border-muted bg-card rounded-lg max-w-3xl transition-all duration-700"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* First Name Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <Input
            id="firstName"
            {...register("firstName")}
            label={t("firstNameLabel")}
            placeholder={t("firstNamePlaceholder")}
          />
          {errors.firstName && (
            <p className="text-destructive text-xs border-destructive focus-visible:ring-destructive">
              {t("firstNameError")}
            </p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <Input
            id="lastName"
            {...register("lastName")}
            label={t("lastNameLabel")}
            placeholder={t("lastNamePlaceholder")}
          />
          {errors.lastName && (
            <p className="text-destructive text-xs border-destructive focus-visible:ring-destructive">
              {t("lastNameError")}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="transition-transform duration-300 hover:scale-105">
          <Input
            id="email"
            type="email"
            {...register("email")}
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
          />
          {errors.email && (
            <p className="text-destructive text-xs border-destructive focus-visible:ring-destructive">
              {t("emailError")}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="transition-transform duration-300 hover:scale-105 ">
          <Input
            id="phone"
            {...register("phone")}
            label={t("phoneLabel")}
            placeholder={t("phonePlaceholder")}
          />
          {errors.phone && (
            <p className="text-destructive text-xs border-destructive focus-visible:ring-destructive">
              {t("phoneError")}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2 transition-transform duration-300 hover:scale-105">
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            {t("messageLabel")}
          </label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder={t("messagePlaceholder")}
          />
          {errors.message && (
            <p className="text-destructive text-xs border-destructive focus-visible:ring-destructive">
              {t("messageError")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-center">
          <Button type="submit">
            {t("sendMessageButton")} <SendIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
