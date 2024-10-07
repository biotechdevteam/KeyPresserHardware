import React from "react";

// Layout component for the service details page
export default async function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      {/* Render the children (page content) below the header */}
      <main className="p-6">{children}</main>
    </div>
  );
}