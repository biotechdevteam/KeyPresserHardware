import React from "react";
import { useTranslations } from "next-intl";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations("Header.about");

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background text-foreground p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("description")}</p>
      </header>
      <main className="">{children}</main>
      <footer className="mt-6 text-center text-muted">
        {/* Footer content can go here */}
      </footer>
    </div>
  );
};

export default AboutLayout;
