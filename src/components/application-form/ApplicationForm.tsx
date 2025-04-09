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
import { Member } from "@/types/memberSchema";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Image from "next/image";
import { Application, ApplicationSchema } from "@/types/ApplicationSchema";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  User,
  UserCheck,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ApplicationFormProps {
  onComplete: () => void;
  onBack?: () => void;
  members: Member[];
}

// Define a type for form errors
type FormErrorType = {
  profile_photo_url: string;
  motivation_letter: string;
  specialization_area: string;
  resume_url: string;
  referred_by_member_id: string;
};

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
    imageUrl: fileUrl,
    loading: fileLoading,
    error: fileError,
    uploadImage: uploadFile,
  } = useImgbb();

  // Initialize formData with the Application type
  const [formData, setFormData] = useState<Application>({
    user_id: user?._id || "",
    profile_photo_url: "",
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: undefined,
  });

  const [formErrors, setFormErrors] = useState<FormErrorType>({
    profile_photo_url: "",
    motivation_letter: "",
    specialization_area: "",
    resume_url: "",
    referred_by_member_id: "",
  });

  const [showOtherField, setShowOtherField] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [formSection, setFormSection] = useState<
    "profile" | "specialization" | "motivation"
  >("profile");

  useEffect(() => {
    if (imageUrl) {
      setFormData((prev) => ({ ...prev, profile_photo_url: imageUrl }));
      setFormTouched(true);
    }
    if (fileUrl) {
      setFormData((prev) => ({ ...prev, resume_url: fileUrl }));
      setFormTouched(true);
    }
  }, [imageUrl, fileUrl]);

  const handleMotivationChange = (value: string) => {
    setFormData({ ...formData, motivation_letter: value });
    setFormTouched(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormTouched(true);
  };

  const handleSpecializationSelect = (specialization: string) => {
    setShowOtherField(specialization === "Other");
    setFormData({
      ...formData,
      specialization_area: specialization === "Other" ? "" : specialization,
    });
    setFormTouched(true);
  };

  const handleDropdownChange = (value: string) => {
    setFormData({ ...formData, referred_by_member_id: value });
    setFormTouched(true);
  };

  const validateForm = () => {
    const parsed = ApplicationSchema.safeParse({
      user_id: user?._id || "",
      profile_photo_url: formData.profile_photo_url,
      motivation_letter: formData.motivation_letter,
      referred_by_member_id: formData.referred_by_member_id || undefined,
      specialization_area: formData.specialization_area,
      resume_url: formData.resume_url || undefined,
    });

    if (!parsed.success) {
      const errors: FormErrorType = {
        profile_photo_url: "",
        motivation_letter: "",
        specialization_area: "",
        resume_url: "",
        referred_by_member_id: "",
      };

      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormErrorType;
        if (key) {
          errors[key] = err.message;
        }
      });

      setFormErrors(errors);
      return false;
    }

    setFormErrors({
      profile_photo_url: "",
      motivation_letter: "",
      specialization_area: "",
      resume_url: "",
      referred_by_member_id: "",
    });
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await apply(
      imageUrl,
      formData.motivation_letter,
      formData.specialization_area,
      fileUrl,
      formData.referred_by_member_id
    );

    if (success) {
      onComplete();
    } else if (error) {
      console.log("Failed to apply:", error);
    }
  };

  const handleBack = () => {
    if (formTouched) {
      setShowUnsavedDialog(true);
    } else {
      goBack();
    }
  };

  const goBack = () => {
    if (onBack) {
      onBack();
    } else {
      setFormData({
        user_id: user?._id || "",
        profile_photo_url: "",
        motivation_letter: "",
        specialization_area: "",
        resume_url: "",
        referred_by_member_id: "",
      });
    }
  };

  const getCompletionStatus = () => {
    const sections = {
      profile: !!formData.profile_photo_url && !!formData.resume_url,
      specialization: !!formData.specialization_area,
      motivation: formData.motivation_letter.length > 50,
    };

    return sections;
  };

  const completionStatus = getCompletionStatus();

  // Modules configuration for ReactQuill
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  console.log("formSection:", formSection);
  return (
    <div>
      <AnimatePresence mode="wait">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              Membership Application
            </h2>
            <p className="text-muted-foreground">
              Complete this form to apply for membership with us.
            </p>
          </div>

          {/* Form Navigation */}
          <div className="flex justify-between border-b border-border pb-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                formSection === "profile"
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
              onClick={() => setFormSection("profile")}
            >
              <User size={16} />
              <span>Profile</span>
              {completionStatus.profile && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                formSection === "specialization"
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
              onClick={() => setFormSection("specialization")}
            >
              <FileText size={16} />
              <span>Specialization</span>
              {completionStatus.specialization && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                formSection === "motivation"
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
              onClick={() => setFormSection("motivation")}
            >
              <Upload size={16} />
              <span>Motivation</span>
              {completionStatus.motivation && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </Button>
          </div>

          {/* Error Notifications */}
          {(error || imgError || fileError) && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive flex items-start gap-3">
              <AlertCircle size={18} />
              <div className="space-y-1">
                <p className="font-medium">There was a problem:</p>
                <ul className="list-disc list-inside text-sm ml-2">
                  {error && <li>{error}</li>}
                  {imgError && <li>{imgError}</li>}
                  {fileError && <li>{fileError}</li>}
                </ul>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {formSection === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Profile Photo Upload */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Your Photo / Resume
                </Label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-1/2">
                    <div className="relative border-2 border-dashed border-muted hover:border-muted-foreground rounded-lg p-6 transition-colors group flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="profile-photo"
                      />
                      <div className="flex flex-col items-center text-center">
                        {!imageUrl ? (
                          <>
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                              <Upload className="h-8 w-8 text-primary" />
                            </div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              Click to upload
                            </span>
                            <p className="text-xs text-muted-foreground max-w-xs">
                              Upload a professional profile photo (JPG, PNG)
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="relative">
                              <Image
                                src={imageUrl}
                                alt="Profile Preview"
                                width={100}
                                height={100}
                                className="rounded-full object-cover border-4 border-background shadow-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    profile_photo_url: "",
                                  })
                                }
                              >
                                <X size={12} />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Click again to replace image
                            </p>
                          </>
                        )}
                      </div>
                      {imgLoading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    {formErrors.profile_photo_url && (
                      <p className="text-destructive text-sm mt-2">
                        {formErrors.profile_photo_url}
                      </p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div className="w-full md:w-1/2">
                    <div className="relative border-2 border-dashed border-muted hover:border-muted-foreground rounded-lg p-6 transition-colors group flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleResumeChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="resume-upload"
                      />
                      <div className="flex flex-col items-center text-center">
                        {!fileUrl ? (
                          <>
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                              <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              Upload your resume
                            </span>
                            <p className="text-xs text-muted-foreground max-w-xs">
                              PDF format preferred (max 5MB)
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <FileText className="h-8 w-8 text-primary" />
                              <div className="flex flex-col items-start">
                                <span className="font-medium text-sm">
                                  Resume uploaded
                                </span>
                                <Link
                                  href={fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline"
                                >
                                  View file
                                </Link>
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 rounded-full ml-2"
                                onClick={() =>
                                  setFormData({ ...formData, resume_url: "" })
                                }
                              >
                                <X size={12} />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Click again to replace file
                            </p>
                          </>
                        )}
                      </div>
                      {fileLoading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    {formErrors.resume_url && (
                      <p className="text-destructive text-sm mt-2">
                        {formErrors.resume_url}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Referred By Section */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Referred by a Member?
                </Label>
                <Card className="border border-muted overflow-hidden">
                  <CardContent className="p-4">
                    <Select
                      value={formData.referred_by_member_id}
                      onValueChange={handleDropdownChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a member (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem key={member._id} value={member._id}>
                            <div className="flex items-center gap-2">
                              <UserCheck size={16} className="text-primary" />
                              <span>
                                {member.user_id.first_name}{" "}
                                {member.user_id.last_name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Being referred by an existing member can increase your
                      chances of acceptance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Specialization Section */}
          {formSection === "specialization" && (
            <motion.div
              key="specialization" // Add a unique key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-lg font-medium text-foreground">
                  Your Area of Specialization
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the field that best represents your expertise
                </p>
              </div>

              <div className="flex flex-row flex-wrap gap-3">
                {specializationOptions.map((option) => (
                  <TooltipProvider key={option}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant={
                            formData.specialization_area === option
                              ? "default"
                              : "outline"
                          }
                          onClick={() => handleSpecializationSelect(option)}
                          className={`h-auto py-3 w-auto justify-start`}
                        >
                          {option}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select this specialization</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {/* Additional Input for "Other" Specialization */}
              {showOtherField && (
                <motion.div
                  key="otherField" // Add a unique key
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Label>Please specify your specialization</Label>
                  <Input
                    placeholder="E.g. Quantum Computing, Synthetic Biology..."
                    name="specialization_area"
                    value={formData.specialization_area}
                    onChange={handleSpecializationChange}
                    className="mt-2"
                  />
                </motion.div>
              )}

              {/* Error Message for Specialization */}
              {formErrors.specialization_area && (
                <p className="text-destructive text-sm bg-destructive/10 p-2 rounded-md">
                  {formErrors.specialization_area}
                </p>
              )}
            </motion.div>
          )}

          {/* Motivation Section */}
          {formSection === "motivation" && (
            <motion.div
              key="specialization" // Add a unique key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-lg font-medium text-foreground">
                  Your Motivation Letter
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Tell us why you want to join and what you can contribute
                  (minimum 100 words)
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border px-4 py-2 bg-muted/30 flex items-center justify-between">
                  <span className="text-sm font-medium">Motivation Letter</span>
                  <span className="text-xs text-muted-foreground">
                    {formData.motivation_letter.length > 0
                      ? formData.motivation_letter.split(" ").length
                      : 0}{" "}
                    words
                  </span>
                </div>
                <div className="p-1">
                  <ReactQuill
                    value={formData.motivation_letter}
                    onChange={handleMotivationChange}
                    modules={quillModules}
                    className="h-64 text-foreground"
                    placeholder="Write your motivation letter here. Explain your interest in our team, your relevant experience, and how you can contribute to our mission..."
                    theme="snow"
                  />
                </div>
              </div>

              {formErrors.motivation_letter && (
                <p className="text-destructive text-sm bg-destructive/10 p-2 rounded-md">
                  {formErrors.motivation_letter}
                </p>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              Back
            </Button>

            <div className="flex gap-3">
              {formSection !== "motivation" ? (
                <Button
                  type="button"
                  onClick={() =>
                    setFormSection(
                      formSection === "profile"
                        ? "specialization"
                        : "motivation"
                    )
                  }
                  className="flex items-center gap-2"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading || imgLoading || fileLoading}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>Submit Application</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </AnimatePresence>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes in your application form. Are you sure
              you want to go back? All your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={goBack}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApplicationForm;
