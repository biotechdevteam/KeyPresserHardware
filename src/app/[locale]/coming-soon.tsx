import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn's Button component

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 text-center space-y-4">
      <h1 className="text-5xl font-bold">Coming Soon!</h1>
      <p className="text-lg text-muted-foreground">
        This feature is currently under development. Stay tuned for updates!
      </p>
      <div className="relative mt-8 flex justify-center">
        {/* Circle Animation */}
        <div className="absolute rounded-full border-4 border-primary w-48 h-48 animate-spin-slow"></div>
        <div className="absolute rounded-full border-4 border-primary w-32 h-32 animate-spin-slow-reverse"></div>

        {/* Inner Circle */}
        <div className="relative w-16 h-16 rounded-full bg-primary"></div>
      </div>
      <Button size="lg" className="mt-8">
        Notify Me
      </Button>
    </div>
  );
};

export default ComingSoon;
