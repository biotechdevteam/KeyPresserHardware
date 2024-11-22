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
        <DialogContent className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg mx-auto">
          <DialogHeader>
            <DialogTitle>
              {isAuthenticated && user
                ? `Is this you, ${user.first_name}?`
                : "Let’s get to know you!"}
            </DialogTitle>
          </DialogHeader>

          <SignUpForm onComplete={handleFormComplete} onCancel={handleClose} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default RegisterDialog;
