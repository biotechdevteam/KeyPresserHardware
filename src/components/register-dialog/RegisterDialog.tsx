"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/lib/useAuth";
import SignUpForm from "../application-form/SignUpForm";

interface RegisterDialogProps {
  onComplete: () => void;
  onCancel?: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  onComplete,
  onCancel,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(true); // Controls dialog visibility

  // Handle dialog close action
  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  // Handle form completion
  const handleFormComplete = () => {
    setOpen(false); // Close dialog on form completion
    onComplete(); // Call parent's onComplete handler
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 flex items-center justify-center mx-4">
        {" "}
        {/* Add mx-4 for horizontal margins */}
        <DialogContent className="max-w-lg w-full bg-popover p-6 rounded-lg shadow-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {isAuthenticated && user
                ? `Is this you, ${user.first_name}?`
                : "Let’s get to know you!"}
            </DialogTitle>
          </DialogHeader>

          <SignUpForm onComplete={handleFormComplete} onBack={handleClose} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default RegisterDialog;
