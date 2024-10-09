"use client";
import React from "react";
import AboutHeader from "@/components/about/about-header/AboutHeader";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section>
      <header>
        {/* Render the AboutHeader */}
        <AboutHeader />
      </header>
      {/* Render the rest of the children below */}
      <main>{children}</main>
      <footer>{/* Render the AboutFooter if exist */}</footer>
    </section>
  );
};

export default AboutLayout;
