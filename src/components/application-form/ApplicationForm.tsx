"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import useAuth from "@/lib/useAuth";
import useImgbb from "@/lib/useImgBB";
import useGoogleDrive from "@/lib/useGoogleDrive";
import { Member } from "@/types/memberSchema";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Image from "next/image";

interface ApplicationFormProps {
  onComplete: () => void;
  onBack?: () => void;
  members: Member[];
}

const specializationOptions = [
  "Biotechnology",
  "Graphic Designing",
  "Biomedical Engineering",
  "Molecular Biology",
  "Data Science",
  "Artificial Intelligence",
  "Biochemistry",
  "Environmental Biotechnology",
  "Other",
];

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onComplete,
  onBack,
  members,
}) => {
  const { user, error, loading, apply } = useAuth();
  const {
    imageUrl,
    loading: imgLoading,
    error: imgError,
    uploadImage,
  } = useImgbb();
  const {
    uploadFile,
    fileUrl,
    loading: fileLoading,
    error: fileError,
  } = useGoogleDrive();

  const [formData, setFormData] = useState({
    profilePhotoUrl: imageUrl || "",
    motivation_letter: "",
    specialization_area: "",
    resume_file: null as File | null,
    referred_by_member_id: "",
  });
  const [formErrors, setFormErrors] = useState({
    profilePhotoUrl: "",
    motivation_letter: "",
    specialization_area: "",
    resume_file: "",
    referred_by_member_id: "",
  });
  const [showOtherField, setShowOtherField] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setFormData((prev) => ({ ...prev, profilePhotoUrl: imageUrl }));
    }
    if (fileUrl) {
      setFormData((prev) => ({ ...prev, resume_url: fileUrl }));
    }
  }, [imageUrl, fileUrl]);

  const handleMotivationChange = (value: string) => {
    setFormData({ ...formData, motivation_letter: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ ...formData, resume_file: file });
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecializationSelect = (specialization: string) => {
    setShowOtherField(specialization === "Other");
    setFormData({
      ...formData,
      specialization_area: specialization === "Other" ? "" : specialization,
    });
  };

  const handleDropdownChange = (value: string) => {
    setFormData({ ...formData, referred_by_member_id: value });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      profilePhotoUrl: "",
      motivation_letter: "",
      specialization_area: "",
      resume_file: "",
      referred_by_member_id: "",
    };

    if (!formData.profilePhotoUrl.trim()) {
      errors.profilePhotoUrl = "Your photo is required.";
      valid = false;
    }
    if (!formData.motivation_letter.trim()) {
      errors.motivation_letter = "Your motivation letter is required.";
      valid = false;
    }
    if (!formData.specialization_area.trim()) {
      errors.specialization_area = "Field of specialization is required.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // if (formData.resume_file) {
    //   await uploadFile(formData.resume_file);
    // }

    const success = await apply(
      formData.motivation_letter,
      formData.specialization_area,
      fileUrl,
      imageUrl,
      formData.referred_by_member_id || undefined
    );

    if (success) {
      onComplete();
    } else if (error) {
      console.log("Failed to apply:", error);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setFormData({
        profilePhotoUrl: "",
        motivation_letter: "",
        specialization_area: "",
        resume_file: null as File | null,
        referred_by_member_id: "",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-12 grid-cols-1 md:grid-cols-2 w-full p-4"
    >
      <div className="col-span-2 text-center">
        <h2 className="text-2xl font-semibold">Membership Application</h2>
        <p className="text-muted-foreground">
          Complete this form to apply for membership with us.
        </p>
      </div>

      {error && (
        <div className="col-span-2 text-destructive text-sm">{error}</div>
      )}
      {imgError && (
        <div className="col-span-2 text-destructive text-sm">{imgError}</div>
      )}
      {fileError && (
        <div className="col-span-2 text-destructive text-sm">{fileError}</div>
      )}

      <div className="col-span-2 flex flex-col">
        {/* Profile Photo Upload */}
        <Label>Your Photo</Label>
        <div className="relative mt-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
            id="profile-photo"
          />
          <Label htmlFor="profile-photo" type="file">
            <span>Click to upload an image</span>
          </Label>
          {imgLoading && (
            <p className="text-xs text-border">Uploading image...</p>
          )}
          {imageUrl && (
            <div className="mt-4 relative">
              <Image
                src={imageUrl}
                alt="Profile Preview"
                width={50}
                height={50}
                className="rounded-sm border border-muted shadow-md"
              />
              <p className="text-xs">Image Preview</p>
            </div>
          )}
          {!formErrors.profilePhotoUrl && (
            <p className="text-xs">This will be displayed on your profile.</p>
          )}
          {formErrors.profilePhotoUrl && (
            <p className="text-destructive">{formErrors.profilePhotoUrl}</p>
          )}
        </div>

        {/* Resume Upload */}
        <Label className="mt-6">Resume</Label>
        <div className="relative mt-2">
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleResumeChange}
            className="sr-only"
            id="resume-upload"
          />
          <Label htmlFor="resume-upload" type="file">
            <span>Click to upload your resume (PDF)</span>
          </Label>
          {fileLoading && (
            <p className="text-xs text-muted">Uploading resume...</p>
          )}
          {fileUrl && (
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="block text-primary">
                Resume Uploaded Successfully
              </span>
            </div>
          )}
          {formErrors.resume_file && (
            <p className="text-destructive">{formErrors.resume_file}</p>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <Label className="font-semibold">Your Area of Specialization:</Label>
        <div className="flex flex-wrap gap-4 mt-3">
          {specializationOptions.map((option) => (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={
                formData.specialization_area === option ? "default" : "outline"
              }
              onClick={() => handleSpecializationSelect(option)}
              className={
                formData.specialization_area === option
                  ? "bg-primary border-transparent"
                  : "bg-card  border-border"
              }
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Additional Input for "Other" Specialization */}
        {showOtherField && (
          <Input
            placeholder="Please specify your specialization"
            name="specialization_area"
            value={formData.specialization_area}
            onChange={handleSpecializationChange}
            className="mt-4 px-4 py-2 border border-border rounded-lg"
          />
        )}

        {/* Error Message for Specialization */}
        {formErrors.specialization_area && (
          <p className="text-destructive text-sm">
            {formErrors.specialization_area}
          </p>
        )}
      </div>

      <div className="col-span-2 mb-8">
        <Label className="font-semibold">Your Motivation Letter</Label>
        <ReactQuill
          value={formData.motivation_letter}
          onChange={handleMotivationChange}
          style={{
            height: "250px",
            border: "1px solid border",
            padding: "8px",
          }}
          placeholder="Write your motivation letter here..."
        />
        {formErrors.motivation_letter && (
          <p className="text-destructive">{formErrors.motivation_letter}</p>
        )}
      </div>

      <div className="col-span-2">
        <Label>Referred by a Member?</Label>
        <Select
          value={formData.referred_by_member_id}
          onValueChange={handleDropdownChange}
        >
          <SelectTrigger className="w-full px-4 py-2 rounded-lg shadow-lg mt-2">
            <SelectValue placeholder="Select member..." />
          </SelectTrigger>
          <SelectContent>
            {members.map((member) => (
              <SelectItem key={member._id} value={member._id}>
                {member.user_id.first_name} {member.user_id.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>

        <Button type="submit" disabled={loading || imgLoading || fileLoading}>
          {loading ? "Submitting Application..." : "Next"}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
