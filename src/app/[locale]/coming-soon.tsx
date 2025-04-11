import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "This feature is currently under development.",
  buttonText = "Notify Me",
  className,
}) => {
  return (
    <section className="min-h-screen p-4 md:p-8">
      <div
        className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      >
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">{description}</p>

        {/* Simple pulse animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-primary"></div>
        </motion.div>

        <Button className="gap-2" size="lg">
          <Bell className="h-4 w-4" />
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default ComingSoon;
