"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/useAuth";
import { Label } from "../ui/label";

interface SignUpFormProps {
  onComplete: () => void;
  onBack?: () => void; // Optional cancel handler
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onComplete, onBack }) => {
  const {
    signUp,
    loading: authLoading,
    error,
    isAuthenticated,
    user,
  } = useAuth();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
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
      } else if (error) {
        console.log("Signup failed:", error);
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

  return (
    <form onSubmit={onSubmit} className="space-y-8 p-4 w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Create Your Account</h2>
        <p className="text-sm">
          Join us today to access exclusive resources and opportunities.
        </p>
      </div>

      {error && <div className="text-destructive text-center">{error}</div>}

      <div className="space-y-4">
        <div>
          <Label>First Name</Label>
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={formErrors.first_name || undefined}
            placeholder="Enter your first name"
          />
          {!formErrors.first_name && (
            <p className="text-xs">This will be displayed on your profile.</p>
          )}
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            error={formErrors.last_name || undefined}
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <Label>Email Address</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email || undefined}
            disabled={isAuthenticated}
            placeholder="e.g., example@email.com"
          />
          {!formErrors.email && (
            <p className="text-xs">
              We'll send a confirmation email to this address.
            </p>
          )}
        </div>

        {!isAuthenticated && (
          <>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password || undefined}
                placeholder="Enter a secure password"
              />
              {!formErrors.password && (
                <p className="text-xs">Must be at least 6 characters.</p>
              )}
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword || undefined}
                placeholder="Re-enter your password"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>

        <Button type="submit" disabled={authLoading}>
          {authLoading ? "Creating Account..." : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
