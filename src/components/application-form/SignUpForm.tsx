"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/useAuth";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";

interface SignUpFormProps {
  onComplete: () => void;
  onBack?: () => void;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onComplete, onBack }) => {
  const {
    signUp,
    loading: authLoading,
    error,
    isAuthenticated,
    user,
  } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required.";
      valid = false;
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required.";
      valid = false;
    }
    if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!isAuthenticated) {
      if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
        valid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
        valid = false;
      }
    }

    setFormErrors(errors);
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isAuthenticated) {
      const success = await signUp(
        formData.email,
        formData.password,
        formData.first_name,
        formData.last_name,
        "applicant"
      );

      if (success) {
        onComplete();
      }
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6 p-4 w-full max-w-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!user && (
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-primary">
            Create Your Account
          </h2>
          <p className="text-muted-foreground mt-2">
            Join us today to access exclusive resources and opportunities.
          </p>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="p-3 bg-destructive/10 border border-destructive rounded-md text-destructive flex items-center gap-2"
          variants={itemVariants}
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}

      <motion.div className="space-y-4" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Label htmlFor="first_name" className="font-medium">
            First Name
          </Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={formErrors.first_name || undefined}
            placeholder="Enter your first name"
            className={`mt-1 ${
              formErrors.first_name ? "border-destructive" : ""
            }`}
          />
          {formErrors.first_name ? (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {formErrors.first_name}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              This will be displayed on your profile.
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="last_name" className="font-medium">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            error={formErrors.last_name || undefined}
            placeholder="Enter your last name"
            className={`mt-1 ${
              formErrors.last_name ? "border-destructive" : ""
            }`}
          />
          {formErrors.last_name && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {formErrors.last_name}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label htmlFor="email" className="font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email || undefined}
            disabled={isAuthenticated}
            placeholder="e.g., example@email.com"
            className={`mt-1 ${
              formErrors.email
                ? "border-destructive"
                : isAuthenticated
                ? "bg-muted"
                : ""
            }`}
          />
          {formErrors.email ? (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {formErrors.email}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              We'll send a confirmation email to this address.
            </p>
          )}
        </motion.div>

        {!isAuthenticated && (
          <>
            <motion.div variants={itemVariants}>
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password || undefined}
                placeholder="Enter a secure password"
                className={`mt-1 ${
                  formErrors.password ? "border-destructive" : ""
                }`}
              />
              {formErrors.password ? (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.password}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 6 characters.
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="confirmPassword" className="font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword || undefined}
                placeholder="Re-enter your password"
                className={`mt-1 ${
                  formErrors.confirmPassword ? "border-destructive" : ""
                }`}
              />
              {formErrors.confirmPassword && (
                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {formErrors.confirmPassword}
                </p>
              )}
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div
        className="flex items-center justify-between mt-8 pt-2 border-t border-border"
        variants={itemVariants}
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          type="submit"
          disabled={authLoading}
        >
          {authLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Creating Account...
            </>
          ) : isAuthenticated ? (
            "Continue"
          ) : (
            "Create Account"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default SignUpForm;
