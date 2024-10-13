"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/useAuth";
import { Application } from "@/types/ApplicationSchema";
import { Member } from "@/types/memberSchema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface ApplicationFormProps {
  onComplete: () => void;
  onCancel?: () => void;
  members: Member[];
}

const specializationOptions = [
  "Biotechnology",
  "Bioinformatics",
  "Genetics",
  "Other",
];

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onComplete,
  onCancel,
  members,
}) => {
  const { user, error, loading, apply } = useAuth();

  // State for form data
  const [formData, setFormData] = useState({
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: "",
  });

  const [formErrors, setFormErrors] = useState({
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [showOtherField, setShowOtherField] = useState(false); // Track if "Other" is selected for specialization

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle specialization selection
  const handleSpecializationSelect = (specialization: string) => {
    if (specialization === "Other") {
      setShowOtherField(true);
      setFormData({ ...formData, specialization_area: "" });
    } else {
      setShowOtherField(false);
      setFormData({ ...formData, specialization_area: specialization });
    }
  };

  // Handle changes in the dropdown
  const handleDropdownChange = (value: string) => {
    setFormData({
      ...formData,
      referred_by_member_id: value,
    });
  };

  // Simple validation logic
  const validateForm = () => {
    let valid = true;
    const errors = {
      motivation_letter: "",
      specialization_area: "",
      resume_url: "",
      referred_by_member_id: "",
    };

    if (!formData.motivation_letter.trim()) {
      errors.motivation_letter = "Motivation letter is required.";
      valid = false;
    } else if (formData.motivation_letter.length < 10) {
      errors.motivation_letter =
        "Motivation letter must be at least 10 characters.";
      valid = false;
    }

    if (!formData.specialization_area.trim()) {
      errors.specialization_area = "Specialization area is required.";
      valid = false;
    }

    if (!formData.resume_url.trim()) {
      errors.resume_url = "Resume URL is required.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) return;

    const success = await apply(
      formData.motivation_letter,
      formData.specialization_area,
      formData.resume_url,
      formData.referred_by_member_id || undefined
    );

    if (success) {
      setSuccessMessage(
        "Your application has been submitted. Thank you for trust! Check your email."
      );
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Call the onCancel handler if provided
    } else {
      setFormData({
        motivation_letter: "",
        specialization_area: "",
        resume_url: "",
        referred_by_member_id: "",
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
      {successMessage && (
        <div className="col-span-2 text-primary">{successMessage}</div>
      )}
      {/* Motivation Letter */}
      <div className="col-span-2">
        <label htmlFor="motivation_letter" className="block mb-2 font-bold">
          Motivation Letter
        </label>
        <Textarea
          id="motivation_letter"
          name="motivation_letter"
          value={formData.motivation_letter}
          onChange={handleChange}
          className="w-full"
        />
        {formErrors.motivation_letter && (
          <p className="text-red-500 mt-1">{formErrors.motivation_letter}</p>
        )}
      </div>

      {/* Specialization Area */}
      <div className="col-span-2">
        <label htmlFor="specialization_area" className="block mb-2 font-bold">
          I am specialized in...
        </label>
        <div className="flex flex-wrap gap-4">
          {specializationOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant={
                formData.specialization_area === option ? "default" : "outline"
              }
              onClick={() => handleSpecializationSelect(option)}
              className={
                formData.specialization_area === option
                  ? "bg-primary text-white"
                  : ""
              }
            >
              {option}
            </Button>
          ))}
        </div>

        {showOtherField && (
          <div className="mt-4">
            <Input
              placeholder="Enter your specialization"
              name="specialization_area"
              value={formData.specialization_area}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        )}

        {formErrors.specialization_area && (
          <p className="text-red-500 mt-1">{formErrors.specialization_area}</p>
        )}
      </div>

      {/* Resume URL */}
      <div className="col-span-2">
        <label htmlFor="resume_url" className="block mb-2 font-bold">
          Resume URL
        </label>
        <Input
          id="resume_url"
          name="resume_url"
          value={formData.resume_url}
          onChange={handleChange}
          className="w-full"
        />
        {formErrors.resume_url && (
          <p className="text-red-500 mt-1">{formErrors.resume_url}</p>
        )}
      </div>

      {/* Referred by Member - ShadCN Select Dropdown */}
      <div className="col-span-2">
        <label htmlFor="referred_by_member" className="block mb-2 font-bold">
          Were you referred by a member of our team?
        </label>
        <Select
          value={formData.referred_by_member_id}
          onValueChange={handleDropdownChange}
        >
          <SelectTrigger className="w-full px-4 py-2 rounded-lg shadow-lg">
            <SelectValue placeholder="Select a team member" />
          </SelectTrigger>
          <SelectContent>
            {/* Disable the default "Select a referring member" */}
            <SelectItem value="none" disabled>
              Select a team member
            </SelectItem>
            {members.map((member) => (
              <SelectItem key={member._id} value={member._id}>
                {member.user_id.first_name} {member.user_id.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="col-span-2 flex justify-between">
        {/* Cancel Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="md:w-1/3 w-full"
        >
          Cancel
        </Button>

        {/* Submit Button */}
        <Button type="submit" className="md:w-1/3 w-full bg-primary text-white">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
