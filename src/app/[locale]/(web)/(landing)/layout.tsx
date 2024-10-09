"use client";
import React from "react";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </section>
  );
};

export default LandingLayout;
