import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-[80vw] flex items-center justify-center bg-background">
      <div className="w-full p-6 space-y-8 bg-card shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
