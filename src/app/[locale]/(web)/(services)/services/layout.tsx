import React from "react";
import { useTranslations } from "next-intl";

const ServiceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const t = useTranslations("Header.services");

  return (
    <section className="grid min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="text-lg mt-4">{t("description")}</p>
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default ServiceLayout;
