"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/lib/useAuth";
import { Application } from "@/types/ApplicationSchema";
import { Member } from "@/types/memberSchema";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelect from "../ui/multiple-select";
import useImgbb from "@/lib/useImgBB";

interface ApplicationFormProps {
  onComplete: () => void;
  onCancel?: () => void;
  members: Member[];
}

const options = [
  { id: 1, label: "React" },
  { id: 2, label: "Next.js" },
  { id: 3, label: "Tailwind CSS" },
  { id: 4, label: "TypeScript" },
  { id: 5, label: "GraphQL" },
];

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
  const {
    imageUrl,
    loading: imgLoading,
    error: imgError,
    uploadImage,
  } = useImgbb(); // Use the imgbb hook

  // State for form data
  const [formData, setFormData] = useState({
    profilePhotoUrl: imageUrl || "",
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: "",
  });

  const [formErrors, setFormErrors] = useState({
    profilePhotoUrl: "",
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [showOtherField, setShowOtherField] = useState(false); // Track if "Other" is selected for specialization
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  // Handle image file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file); // Upload image via the useImgbb hook
    }
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
      profilePhotoUrl: "",
      motivation_letter: "",
      specialization_area: "",
      resume_url: "",
      referred_by_member_id: "",
    };

    if (!formData.profilePhotoUrl.trim()) {
      errors.profilePhotoUrl = "Your photo is required.";
      valid = false;
    }
    if (!formData.motivation_letter.trim()) {
      errors.motivation_letter = "Your motivation letter is required.";
      valid = false;
    } else if (formData.motivation_letter.length < 500) {
      errors.motivation_letter =
        "Motivation letter must be at least 500 characters.";
      valid = false;
    }
    if (!formData.specialization_area.trim()) {
      errors.specialization_area = "Field of specialization is required.";
      valid = false;
    }
    if (!formData.resume_url.trim()) {
      errors.resume_url = "Your resume is required.";
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
      imageUrl,
      formData.referred_by_member_id || undefined,
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
        profilePhotoUrl: "",
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
      {imgError && (
        <div className="col-span-2 text-destructive">{imgError}</div>
      )}
      {successMessage && (
        <div className="col-span-2 text-primary">{successMessage}</div>
      )}

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

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Select your skills</h1>
          <MultipleSelect
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            placeholder="Start typing..."
          />
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
          disabled={imgLoading}
          className="md:w-1/3 w-full"
        >
          Cancel
        </Button>

        {/* Submit Button */}
        <Button type="submit" className="md:w-1/3 w-full bg-primary text-white">
          {imgLoading ? "Uploading Docs..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
