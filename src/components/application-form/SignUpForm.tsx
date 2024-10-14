"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/useAuth";

interface SignUpFormProps {
  onComplete: () => void;
  onCancel?: () => void; // Optional cancel handler
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onComplete, onCancel }) => {
  const { signUp, signIn, loading, error, isAuthenticated, user } = useAuth();

  // Pre-fill form if the user is already authenticated
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "", // We don't pre-fill password for security reasons
  });

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Update the form if the user data changes (in case of re-authentication)
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "", // Don't pre-fill the password field
      });
    }
  }, [isAuthenticated, user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Simple validation logic
  const validateForm = () => {
    let valid = true;
    const errors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
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
    if (!isAuthenticated && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Handle form submission
  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Validate the form before proceeding
    if (!validateForm()) return;

    if (!isAuthenticated) {
      console.log("Submitting form data for new user:", formData); // Debugging - Check if this logs the form data
      const success = await signUp(
        formData.email,
        formData.password,
        formData.first_name,
        formData.last_name,
        "applicant"
      );

      // Check if the email is already in use
      if (error === "Email is already in use") {
        console.log("Email already in use, attempting to sign in");
        // Attempt to sign in the user with the same credentials
        const signInSuccess = await signIn(formData.email, formData.password);

        if (signInSuccess) {
          onComplete(); // Move to the next step if signIn is successful
        } else {
          setFormErrors({
            ...formErrors,
            password: "This email has been used. Please try again.",
          });
        }
        return; // Exit here to avoid further code execution
      }

      if (success) {
        onComplete(); // Move to the next step only if signUp was successful
      } else if (error) {
        console.log("Signup failed:", error); // Log any other errors
      }
    } else {
      console.log("User is authenticated, moving to the next step");
      onComplete(); // Move to the next step without signing up
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Call the onCancel handler if provided
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      }); // Reset form data if no custom cancel handler is provided
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full"
    >
      {/* Display Error */}
      {error && <div className="col-span-2 text-destructive">{error}</div>}

      {/* First Name Input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={formErrors.first_name || undefined}
        />
      </div>

      {/* Last Name Input */}
      <div className="col-span-2 md:col-span-1">
        <Input
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={formErrors.last_name || undefined}
        />
      </div>

      {/* Email Input */}
      <div className="col-span-2">
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email || undefined}
          disabled={isAuthenticated} // Disable email if user is authenticated
        />
      </div>

      {/* Password Input - Hide if the user is authenticated */}
      {!isAuthenticated && (
        <div className="col-span-2">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password || undefined}
          />
        </div>
      )}

      {/* Cancel and Next Buttons */}
      <div className="col-span-2 flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="md:w-1/3 w-full"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="md:w-1/3 w-full bg-primary text-white"
        >
          {loading ? "Verifying..." : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
