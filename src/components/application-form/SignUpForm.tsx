"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/useAuth";
import useImgbb from "@/lib/useImgBB"; // Import the custom useImgbb hook
import MultipleSelect from "../ui/multiple-select";

const options = [
  { id: 1, label: "React" },
  { id: 2, label: "Next.js" },
  { id: 3, label: "Tailwind CSS" },
  { id: 4, label: "TypeScript" },
  { id: 5, label: "GraphQL" },
];

interface SignUpFormProps {
  onComplete: () => void;
  onCancel?: () => void; // Optional cancel handler
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onComplete, onCancel }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {
    signUp,
    signIn,
    loading: authLoading,
    error,
    isAuthenticated,
    user,
  } = useAuth();
  const {
    imageUrl,
    loading: imgLoading,
    error: imgError,
    uploadImage,
  } = useImgbb(); // Use the imgbb hook

  // Pre-fill form if the user is already authenticated
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "", // We don't pre-fill password for security reasons
    profilePhotoUrl: imageUrl || "", // Add profilePhotoUrl to the form state
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
        password: "",
        profilePhotoUrl: imageUrl || "", // Update the image URL
      });
    }
  }, [isAuthenticated, user, imageUrl]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file); // Upload image via the useImgbb hook
    }
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
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Validate the form before proceeding
    if (!validateForm()) return;

    if (!isAuthenticated) {
      const success = await signUp(
        formData.email,
        formData.password,
        formData.first_name,
        formData.last_name,
        "applicant",
        imageUrl // Pass the uploaded image URL to signUp
      );

      if (success) {
        onComplete(); // Move to the next step if signUp was successful
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
        profilePhotoUrl: "",
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
      {imgError && (
        <div className="col-span-2 text-destructive">{imgError}</div>
      )}

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

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Select your skills</h1>
        <MultipleSelect
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          placeholder="Start typing..."
        />
      </div>

      {/* Profile Photo Input */}
      <div className="col-span-2">
        <label className="block text-sm font-medium">Profile Photo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imgLoading && <p>Uploading image...</p>}
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Profile Preview"
              className="h-20 w-20 object-cover mt-2"
            />
          </div>
        )}
      </div>

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
          disabled={authLoading || imgLoading}
          className="md:w-1/3 w-full bg-primary text-white"
        >
          {authLoading
            ? "Verifying..."
            : imgLoading
            ? "Uploading Image..."
            : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
