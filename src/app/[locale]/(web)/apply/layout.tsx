import React from "react";
import { cn } from "@/lib/utils";

interface ApplyLayoutProps {
  children: React.ReactNode;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({ children }) => {
  return (
    <div className={cn("min-h-screen flex flex-col")}>
      {/* You can add a header or navigation here if needed */}
      <header className="bg-primary text-white py-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Apply to Join the Team</h1>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      {/* Footer Section */}
      <footer className="bg-secondary text-secondary-foreground py-6 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ApplyLayout;
