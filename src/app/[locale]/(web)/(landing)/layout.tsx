"use client";
import React from "react";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section>
      <main>{children}</main>
    </section>
  );
};

export default LandingLayout;
