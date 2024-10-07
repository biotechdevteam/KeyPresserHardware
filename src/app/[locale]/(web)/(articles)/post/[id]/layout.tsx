import React from "react";

// Layout component for the post details page
export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      {/* Render the children */}
      <main className="p-6">{children}</main>
    </div>
  );
}
