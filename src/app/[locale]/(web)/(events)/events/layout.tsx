import React from "react";
import { useTranslations } from "next-intl";

const EventLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations("Header.events");

  return (
    <section className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("description")}</p>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        {/* <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Events Platform</p>
        </div> */}
      </footer>
    </section>
  );
};

export default EventLayout;
