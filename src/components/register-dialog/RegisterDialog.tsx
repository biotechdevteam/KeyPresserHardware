"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useAuth from "@/lib/useAuth";
import SignUpForm from "../application-form/SignUpForm";
import { motion } from "framer-motion";
import { UserRound, User2, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RegisterDialogProps {
  open: boolean;
  onComplete: () => void;
  onCancel?: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  open,
  onComplete,
  onCancel,
}) => {
  const { isAuthenticated, user, profile } = useAuth();

  // Handle dialog close action
  const handleClose = () => {
    if (onCancel) onCancel();
  };

  // Handle form completion
  const handleFormComplete = () => {
    onComplete(); // Call parent's onComplete handler
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg w-full p-0 rounded-xl shadow-xl overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col"
        >
          {/* Header with gradient background */}
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                {isAuthenticated && user ? (
                  <Avatar className="h-16 w-16 border-2 border-border">
                    <AvatarImage
                      src={profile?.profile_photo_url as string}
                      alt={user.first_name}
                    />
                    <AvatarFallback className="bg-primary-foreground text-primary">
                      {user.first_name?.[0]}
                      {user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-foreground flex items-center justify-center">
                    <UserRound className="h-10 w-10 text-primary" />
                  </div>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold text-center">
                {isAuthenticated && user
                  ? `Welcome back, ${user.first_name}!`
                  : "Let's get to know you!"}
              </DialogTitle>
              <DialogDescription className="text-center text-primary-foreground/90 mt-2">
                {isAuthenticated && user
                  ? "Quick confirmation before we proceed"
                  : "Please share your details to complete registration"}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form content */}
          <div className="p-6 -mt-6">
            <SignUpForm onComplete={handleFormComplete} onBack={handleClose} />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
