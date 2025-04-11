"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useImgbb from "@/lib/useImgBB";
import useAuth from "@/lib/useAuth";
import { User } from "@/types/userSchema";
import { Member } from "@/types/memberSchema";
import { Applicant } from "@/types/applicant";
import {
  Save,
  Upload,
  X,
  AlertCircle,
  CheckCircle,
  User as UserIcon,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Define the social links schema
const SocialLinksSchema = z.array(z.string().url()).optional();

// Define the form schema based on user type
const BaseProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  profile_photo_url: z.string().url().optional(),
});

const MemberProfileSchema = BaseProfileSchema.extend({
  specialization: z.string().min(1, "Specialization is required"),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  interests: z.array(z.string()).optional(),
  address: z.string().optional(),
  resume_url: z.string().url().optional(),
  social_links: SocialLinksSchema,
});

const ApplicantProfileSchema = BaseProfileSchema.extend({
  specialization_area: z.string().min(1, "Specialization area is required"),
  motivation_letter: z.string().min(50, "Motivation letter is too short"),
  resume_url: z.string().url().optional(),
});

type BaseProfileFormData = z.infer<typeof BaseProfileSchema>;
type MemberProfileFormData = z.infer<typeof MemberProfileSchema>;
type ApplicantProfileFormData = z.infer<typeof ApplicantProfileSchema>;

interface EditProfileProps {
  profile: Member | Applicant;
  user: User;
  onUpdate: (
    memberId: string,
    bio: string,
    skills: string[],
    interests: string[],
    specialization: string,
    address: string,
    socialLinks: string[],
    resumeUrl: string
  ) => void; // Updated to match useAuth's updateProfile signature
}

const EditProfile: React.FC<EditProfileProps> = ({
  profile,
  user,
  onUpdate,
}) => {
  const { toast } = useToast();
  const { loading: authLoading } = useAuth();
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

  const [formSection, setFormSection] = useState<
    "personal" | "professional" | "social"
  >("personal");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [motivationLetter, setMotivationLetter] = useState("");
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Determine if profile is a Member or Applicant
  const isMember = "specialization" in profile;
  const isApplicant = "specialization_area" in profile;

  // Create the appropriate form based on user type
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<MemberProfileFormData | ApplicantProfileFormData>({
    resolver: zodResolver(
      isMember ? MemberProfileSchema : ApplicantProfileSchema
    ),
    defaultValues: isMember
      ? {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_photo_url: user.profile_photo_url || "",
          specialization: (profile as Member).specialization || "",
          bio: (profile as Member).bio || "",
          skills: (profile as Member).skills || [],
          interests: (profile as Member).interests || [],
          address: (profile as Member).address || "",
          resume_url: (profile as Member).resume_url || "",
          social_links: (profile as Member).social_links || [],
        }
      : {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_photo_url: user.profile_photo_url || "",
          specialization_area: (profile as Applicant).specialization_area || "",
          motivation_letter: (profile as Applicant).motivation_letter || "",
          resume_url: (profile as Applicant).resume_url || "",
        },
  });

  // Initialize form values from profile
  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("email", user.email);
      setValue("profile_photo_url", user.profile_photo_url || "");
    }

    if (isMember) {
      const memberProfile = profile as Member;
      setValue("specialization", memberProfile.specialization || "");
      setValue("bio", memberProfile.bio || "");
      setValue("address", memberProfile.address || "");
      setValue("resume_url", memberProfile.resume_url || "");
      setSkills(memberProfile.skills || []);
      setInterests(memberProfile.interests || []);
      setSocialLinks(memberProfile.social_links || []);
    } else if (isApplicant) {
      const applicantProfile = profile as Applicant;
      setValue(
        "specialization_area",
        applicantProfile.specialization_area || ""
      );
      setMotivationLetter(applicantProfile.motivation_letter || "");
      setValue("resume_url", applicantProfile.resume_url || "");
    }
  }, [profile, user, setValue, isMember, isApplicant]);

  // Update form value when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      setValue("profile_photo_url", imageUrl);
      setIsFormDirty(true);
    }
  }, [imageUrl, setValue]);

  // Update form value when fileUrl changes
  useEffect(() => {
    if (fileUrl) {
      setValue("resume_url", fileUrl);
      setIsFormDirty(true);
    }
  }, [fileUrl, setValue]);

  // Handle profile photo upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  // Handle resume upload
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  // Handle skills management
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills);
      setNewSkill("");
      setIsFormDirty(true);
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
    setIsFormDirty(true);
  };

  // Handle interests management
  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      const updatedInterests = [...interests, newInterest];
      setInterests(updatedInterests);
      setValue("interests", updatedInterests);
      setNewInterest("");
      setIsFormDirty(true);
    }
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    setValue("interests", updatedInterests);
    setIsFormDirty(true);
  };

  // Handle social links management
  const addSocialLink = () => {
    if (
      newSocialLink &&
      newSocialLink.startsWith("http") &&
      !socialLinks.includes(newSocialLink)
    ) {
      const updatedLinks = [...socialLinks, newSocialLink];
      setSocialLinks(updatedLinks);
      setValue("social_links", updatedLinks);
      setNewSocialLink("");
      setIsFormDirty(true);
    } else {
      toast({
        title: "Invalid URL",
        description:
          "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
    }
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    setValue("social_links", updatedLinks);
    setIsFormDirty(true);
  };

  // Handle motivation letter change for applicants
  const handleMotivationChange = (value: string) => {
    setMotivationLetter(value);
    setValue("motivation_letter", value);
    setIsFormDirty(true);
  };

  // Detect form changes
  useEffect(() => {
    const subscription = watch(() => {
      setIsFormDirty(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Handle form submission
  const onSubmit = async (
    data: MemberProfileFormData | ApplicantProfileFormData
  ) => {
    try {
      if (isMember) {
        const memberData = data as MemberProfileFormData;
        const success = await onUpdate(
          (profile as Member)._id, // Assuming profile has _id
          memberData.bio,
          skills,
          interests,
          memberData.specialization,
          memberData.address || "",
          socialLinks,
          memberData.resume_url || ""
        );

        if (success !== null) {
          toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated",
            variant: "default",
          });
          setIsFormDirty(false);
          reset(data); // Reset form with updated values
        }
      } else if (isApplicant) {
        // Applicants don't use updateProfile directly in this context; handle separately if needed
        toast({
          title: "Notice",
          description:
            "Applicant profiles cannot be updated this way. Please contact support.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
    }
  };

  // Function to get social media platform name from URL
  const getSocialPlatform = (url: string) => {
    if (url.includes("facebook.com")) return "Facebook";
    if (url.includes("twitter.com")) return "Twitter";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("github.com")) return "GitHub";
    if (url.includes("linkedin.com")) return "LinkedIn";
    return "Website";
  };

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  // Handle navigation with unsaved changes
  const handleSectionChange = (
    section: "personal" | "professional" | "social"
  ) => {
    if (isFormDirty) {
      setShowUnsavedDialog(true);
    } else {
      setFormSection(section);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-primary">
                Edit Profile
              </CardTitle>
              <CardDescription>
                Update your personal and professional information
              </CardDescription>
            </div>
            {isFormDirty && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                Unsaved changes
              </div>
            )}
          </div>
        </CardHeader>

        {/* Form Navigation */}
        <div className="border-b border-border">
          <div className="flex">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-none py-4 px-6 ${
                formSection === "personal"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : ""
              }`}
              onClick={() => handleSectionChange("personal")}
            >
              Personal Info
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-none py-4 px-6 ${
                formSection === "professional"
                  ? "border-b-2 border-primary text-primary font-medium"
                  : ""
              }`}
              onClick={() => handleSectionChange("professional")}
            >
              {isMember ? "Professional Details" : "Application Details"}
            </Button>
            {isMember && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`rounded-none py-4 px-6 ${
                  formSection === "social"
                    ? "border-b-2 border-primary text-primary font-medium"
                    : ""
                }`}
                onClick={() => handleSectionChange("social")}
              >
                Social Profiles
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Personal Information Section */}
              {formSection === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Photo */}
                    <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                      <Label className="text-base font-medium self-start">
                        Profile Photo
                      </Label>
                      <div className="relative group">
                        <Avatar className="h-40 w-40 cursor-pointer transition-opacity group-hover:opacity-80">
                          <AvatarImage
                            src={watch("profile_photo_url") || ""}
                            alt={`${user.first_name} ${user.last_name}`}
                          />
                          <AvatarFallback className="text-2xl">
                            {user.first_name[0]}
                            {user.last_name[0]}
                          </AvatarFallback>
                          {/* Overlay input for clicking the avatar */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="profile-photo"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <Upload size={24} className="text-white" />
                          </div>
                        </Avatar>
                        {watch("profile_photo_url") && (
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-1 z-20"
                            onClick={() => {
                              setValue("profile_photo_url", "");
                              setIsFormDirty(true);
                            }}
                          >
                            <X size={14} />
                          </Button>
                        )}
                      </div>
                      {imgLoading && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                          Uploading...
                        </div>
                      )}
                      {imgError && (
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle size={14} />
                          {imgError}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground text-center max-w-xs">
                        Click the photo to upload a new one or enhance your
                        profile
                      </p>
                    </div>

                    {/* Personal Details */}
                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name" className="font-medium">
                            First Name
                          </Label>
                          <Input
                            id="first_name"
                            {...register("first_name")}
                            className={
                              errors.first_name ? "border-destructive" : ""
                            }
                          />
                          {errors.first_name && (
                            <p className="text-xs text-destructive">
                              {errors.first_name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="last_name" className="font-medium">
                            Last Name
                          </Label>
                          <Input
                            id="last_name"
                            {...register("last_name")}
                            className={
                              errors.last_name ? "border-destructive" : ""
                            }
                          />
                          {errors.last_name && (
                            <p className="text-xs text-destructive">
                              {errors.last_name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          {...register("email")}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Contact support to change your email address
                        </p>
                      </div>

                      {isMember && (
                        <div className="space-y-2">
                          <Label htmlFor="address" className="font-medium">
                            Address
                          </Label>
                          <Input id="address" {...register("address")} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Professional/Application Details Section */}
              {formSection === "professional" && (
                <motion.div
                  key="professional"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Member Professional Details */}
                  {isMember && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="specialization"
                            className="font-medium"
                          >
                            Specialization
                          </Label>
                          <Input
                            id="specialization"
                            {...register("specialization")}
                            // className={
                            //   errors.specialization ? "border-destructive" : ""
                            // }
                          />
                          {/* {errors.specialization && (
                            <p className="text-xs text-destructive">
                              {errors.specialization.message}
                            </p>
                          )} */}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className="font-medium">
                            Professional Bio
                          </Label>
                          <Textarea
                            id="bio"
                            {...register("bio")}
                            rows={5}
                            // className={errors.bio ? "border-destructive" : ""}
                          />
                          {/* {errors.bio && (
                            <p className="text-xs text-destructive">
                              {errors.bio.message}
                            </p>
                          )} */}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <Label className="font-medium">Skills</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              {skill}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 rounded-full"
                                onClick={() => removeSkill(index)}
                              >
                                <X size={12} />
                              </Button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <Button type="button" onClick={addSkill}>
                            Add
                          </Button>
                        </div>
                        {/* {errors.skills && (
                          <p className="text-xs text-destructive">
                            {errors.skills.message}
                          </p>
                        )} */}
                      </div>

                      {/* Interests */}
                      <div className="space-y-2">
                        <Label className="font-medium">Interests</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {interests.map((interest, index) => (
                            <span
                              key={index}
                              className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                              {interest}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 rounded-full"
                                onClick={() => removeInterest(index)}
                              >
                                <X size={12} />
                              </Button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add an interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addInterest();
                              }
                            }}
                          />
                          <Button type="button" onClick={addInterest}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Applicant Details */}
                  {isApplicant && (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="specialization_area"
                            className="font-medium"
                          >
                            Specialization Area
                          </Label>
                          <Input
                            id="specialization_area"
                            {...register("specialization_area")}
                            // className={
                            //   errors.specialization_area
                            //     ? "border-destructive"
                            //     : ""
                            // }
                          />
                          {/* {errors.specialization_area && (
                            <p className="text-xs text-destructive">
                              {errors.specialization_area.message}
                            </p>
                          )} */}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="motivation_letter"
                            className="font-medium"
                          >
                            Motivation Letter
                          </Label>
                          <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <div className="border-b border-border px-4 py-2 bg-muted/30 flex items-center justify-between">
                              <span className="text-sm font-medium">
                                Edit Letter
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {motivationLetter.length > 0
                                  ? motivationLetter.split(" ").length
                                  : 0}{" "}
                                words
                              </span>
                            </div>
                            <div className="p-1">
                              <ReactQuill
                                value={motivationLetter}
                                onChange={handleMotivationChange}
                                modules={quillModules}
                                className="h-64 text-foreground"
                                theme="snow"
                              />
                            </div>
                          </div>
                          {/* {errors.motivation_letter && (
                            <p className="text-xs text-destructive">
                              {errors.motivation_letter.message}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <Label className="font-medium">Resume / CV</Label>
                    <div className="relative group">
                      <div className="border-2 border-dashed border-muted hover:border-primary rounded-lg p-6 transition-colors cursor-pointer bg-background group-hover:bg-primary/5">
                        <div className="flex flex-col items-center text-center relative">
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="resume-upload"
                          />
                          {!watch("resume_url") ? (
                            <>
                              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
                                <FileText className="h-8 w-8 text-primary" />
                              </div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                Click to upload your resume
                              </span>
                              <p className="text-xs text-muted-foreground max-w-xs">
                                PDF format preferred (max 5MB)
                              </p>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <FileText className="h-8 w-8 text-primary" />
                              <div className="flex flex-col items-start">
                                <span className="font-medium text-sm">
                                  Resume uploaded
                                </span>
                                <a
                                  href={watch("resume_url")}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline"
                                >
                                  View file
                                </a>
                              </div>
                            </div>
                          )}
                          {/* Hover overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none">
                            <Upload size={24} className="text-white" />
                          </div>
                        </div>
                      </div>
                      {watch("resume_url") && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1 z-20"
                          onClick={() => {
                            setValue("resume_url", "");
                            setIsFormDirty(true);
                          }}
                        >
                          <X size={12} />
                        </Button>
                      )}
                      {fileLoading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    {fileError && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle size={12} /> {fileError}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Social Profiles Section - Only for Members */}
              {formSection === "social" && isMember && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <Label className="font-medium">Social Links</Label>
                    <div className="space-y-4">
                      {socialLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {getSocialPlatform(link)}
                            </div>
                            <Link
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline truncate block"
                            >
                              {link}
                            </Link>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeSocialLink(index)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label htmlFor="social-link">Add Social Profile</Label>
                        <div className="flex gap-2">
                          <Input
                            id="social-link"
                            placeholder="https://..."
                            value={newSocialLink}
                            onChange={(e) => setNewSocialLink(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSocialLink();
                              }
                            }}
                          />
                          <Button type="button" onClick={addSocialLink}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border bg-muted/30 p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (isFormDirty) {
                  setShowUnsavedDialog(true);
                } else {
                  reset();
                }
              }}
              disabled={authLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                authLoading || (!isFormDirty && !imgLoading && !fileLoading)
              }
              className="min-w-[120px]"
            >
              {authLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes that will be lost. Do you want to
              continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (formSection !== "personal") {
                  setFormSection("personal");
                } else {
                  reset();
                  setIsFormDirty(false);
                }
                setShowUnsavedDialog(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditProfile;
