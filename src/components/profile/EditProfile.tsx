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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useImgbb from "@/lib/useImgBB";
import useAuth from "@/lib/useAuth";
import { User } from "@/types/userSchema";
import { Member } from "@/types/memberSchema";
import { Save, Upload, X, AlertCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { Applicant } from "@/types/applicant";

// User profile schema
const UserProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  profile_photo_url: z.string().url().optional().or(z.literal("")),
});

// Member profile schema
const MemberProfileSchema = UserProfileSchema.extend({
  specialization: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  address: z.string().optional(),
  resume_url: z.string().url().optional().or(z.literal("")),
  social_links: z.array(z.string().url()).optional(),
});

type UserProfileFormData = z.infer<typeof UserProfileSchema>;
type MemberProfileFormData = z.infer<typeof MemberProfileSchema>;

interface EditProfileProps {
  user: User;
  profile: Member | Applicant;
  memberProfile?: Member;
  onUserUpdate?: (
    firstName: string,
    lastName: string,
    profilePhotoUrl: string
  ) => void;
  onMemberUpdate?: (
    memberId: string,
    bio: string,
    skills: string[],
    interests: string[],
    specialization: string,
    address: string,
    socialLinks: string[],
    resumeUrl: string
  ) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  profile,
  memberProfile,
  onUserUpdate,
  onMemberUpdate,
}) => {
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
    "personal" | "professional" | "public"
  >("personal");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [newSocialLink, setNewSocialLink] = useState("");
  const [isFormDirty, setIsFormDirty] = useState(false);

  const isMember = user.user_type === "member";

  // Use appropriate schema based on user type
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<
    typeof isMember extends false ? UserProfileFormData : MemberProfileFormData
  >({
    resolver: zodResolver(isMember ? MemberProfileSchema : UserProfileSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      profile_photo_url: profile.profile_photo_url as string,
      ...(isMember && memberProfile
        ? {
            specialization: memberProfile.specialization || "",
            bio: memberProfile.bio || "",
            skills: memberProfile.skills || [],
            interests: memberProfile.interests || [],
            address: memberProfile.address || "",
            resume_url: memberProfile.resume_url || "",
            social_links: memberProfile.social_links || [],
          }
        : {}),
    },
  });

  // Initialize form values
  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
      setValue("email", user.email);
      setValue("profile_photo_url", profile.profile_photo_url as string);
    }

    if (isMember && memberProfile) {
      const memberForm = setValue as (
        name: keyof MemberProfileFormData,
        value: any
      ) => void;
      memberForm("specialization", memberProfile.specialization || "");
      memberForm("bio", memberProfile.bio || "");
      memberForm("address", memberProfile.address || "");
      memberForm("resume_url", memberProfile.resume_url || "");
      memberForm("skills", memberProfile.skills || []);
      memberForm("interests", memberProfile.interests || []);
      memberForm("social_links", memberProfile.social_links || []);

      setSkills(memberProfile.skills || []);
      setInterests(memberProfile.interests || []);
      setSocialLinks(memberProfile.social_links || []);
    }
  }, [user, profile, memberProfile, setValue, isMember]);

  // Update form value when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      setValue("profile_photo_url", imageUrl);
      setIsFormDirty(true);
    }
  }, [imageUrl, setValue]);

  // Update form value when fileUrl changes
  useEffect(() => {
    if (fileUrl && isMember) {
      setValue("resume_url", fileUrl);
      setIsFormDirty(true);
    }
  }, [fileUrl, setValue, isMember]);

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
      if (isMember) setValue("skills", updatedSkills);
      setNewSkill("");
      setIsFormDirty(true);
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    if (isMember) setValue("skills", updatedSkills);
    setIsFormDirty(true);
  };

  // Handle interests management
  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      const updatedInterests = [...interests, newInterest];
      setInterests(updatedInterests);
      if (isMember) setValue("interests", updatedInterests);
      setNewInterest("");
      setIsFormDirty(true);
    }
  };

  const removeInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    if (isMember) setValue("interests", updatedInterests);
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
      if (isMember) setValue("social_links", updatedLinks);
      setNewSocialLink("");
      setIsFormDirty(true);
    } else {
      toast.error("Please enter a valid URL starting with http:// or https://");
    }
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    if (isMember) setValue("social_links", updatedLinks);
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
    data: UserProfileFormData | MemberProfileFormData
  ) => {
    try {
      // Update user information
      // if (onUserUpdate) {
      //   await onUserUpdate(
      //     data.first_name,
      //     data.last_name,
      //     data.profile_photo_url || ""
      //   );
      // }

      // Update member profile if applicable
      if (isMember && memberProfile && onMemberUpdate) {
        const memberData = data as MemberProfileFormData;
        await onMemberUpdate(
          memberProfile._id,
          memberData.bio || "",
          skills,
          interests,
          memberData.specialization || "",
          memberData.address || "",
          socialLinks,
          memberData.resume_url || ""
        );
      }

      console.log("Data submitted:", data);

      toast.success("Profile updated successfully!");
      setIsFormDirty(false);
      reset(data);
    } catch (error) {
      toast.error("There was a problem updating your profile");
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

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
              <CardDescription className="text-base">
                Update your personal{isMember ? " and professional" : ""}{" "}
                information
              </CardDescription>
            </div>
            {isFormDirty && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center text-sm text-amber-200 px-3 py-1 rounded-full border border-amber-200 mt-2 sm:mt-0"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                Unsaved changes
              </motion.div>
            )}
          </div>
        </CardHeader>

        {/* Form Navigation */}
        {isMember && (
          <div className="border-b border-border bg-muted/10 overflow-x-auto">
            <div className="flex flex-row">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`rounded-none py-4 px-4 sm:px-6 relative transition-all duration-200 ${
                  formSection === "personal"
                    ? "text-primary font-medium"
                    : "hover:text-primary/70"
                }`}
                onClick={() => setFormSection("personal")}
              >
                Personal Info
                {formSection === "personal" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`rounded-none py-4 px-4 sm:px-6 relative transition-all duration-200 ${
                  formSection === "professional"
                    ? "text-primary font-medium"
                    : "hover:text-primary/70"
                }`}
                onClick={() => setFormSection("professional")}
              >
                Professional Details
                {formSection === "professional" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`rounded-none py-4 px-4 sm:px-6 relative transition-all duration-200 ${
                  formSection === "public"
                    ? "text-primary font-medium"
                    : "hover:text-primary/70"
                }`}
                onClick={() => setFormSection("public")}
              >
                Public Profiles
                {formSection === "public" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-4 sm:p-6">
            <AnimatePresence mode="wait">
              {/* Personal Information Section */}
              {formSection === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Photo */}
                    <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                      <Label className="text-base font-medium self-start">
                        Profile Photo
                      </Label>
                      <div className="relative group">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Avatar className="h-32 w-32 sm:h-40 sm:w-40 cursor-pointer transition-all duration-300 group-hover:shadow-xl ring-2 ring-transparent group-hover:ring-primary/20">
                            <AvatarImage
                              src={
                                watch("profile_photo_url") ||
                                (profile.profile_photo_url as string)
                              }
                              alt={`${user.first_name} ${user.last_name}`}
                            />
                            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                              {user.first_name[0]}
                              {user.last_name[0]}
                            </AvatarFallback>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              id="profile-photo"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full">
                              <Upload size={24} className="text-white" />
                            </div>
                          </Avatar>
                        </motion.div>
                        {watch("profile_photo_url") && (
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-1 z-20 shadow-lg"
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
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                          Uploading...
                        </motion.div>
                      )}
                      {imgError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-destructive flex items-center gap-2"
                        >
                          <AlertCircle size={14} />
                          {imgError}
                        </motion.p>
                      )}
                      <p className="text-sm text-muted-foreground text-center max-w-xs">
                        Click the photo to upload a new one
                      </p>
                    </div>

                    {/* Personal Details */}
                    <div className="w-full md:w-2/3 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="first_name" className="font-medium">
                            First Name
                          </Label>
                          <Input
                            id="first_name"
                            {...register("first_name")}
                            className={`transition-all duration-200 ${
                              errors.first_name
                                ? "border-destructive focus:ring-destructive/20"
                                : "focus:ring-primary/20"
                            }`}
                          />
                          {errors.first_name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-destructive"
                            >
                              {errors.first_name.message}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="last_name" className="font-medium">
                            Last Name
                          </Label>
                          <Input
                            id="last_name"
                            {...register("last_name")}
                            className={`transition-all duration-200 ${
                              errors.last_name
                                ? "border-destructive focus:ring-destructive/20"
                                : "focus:ring-primary/20"
                            }`}
                          />
                          {errors.last_name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-destructive"
                            >
                              {errors.last_name.message}
                            </motion.p>
                          )}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="email" className="font-medium">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          {...register("email")}
                          disabled
                          className="bg-muted/50 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground">
                          Contact support to change your email address
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Professional Details Section */}
              {formSection === "professional" && isMember && (
                <motion.div
                  key="professional"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="specialization" className="font-medium">
                        Specialization
                      </Label>
                      <Input
                        id="specialization"
                        {...register("specialization")}
                        className={`transition-all duration-200 ${
                          errors.specialization
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                      />
                      {errors.specialization && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.specialization.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="bio" className="font-medium">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        {...register("bio")}
                        className={`min-h-[100px] transition-all duration-200 ${
                          errors.bio
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                      />
                      {errors.bio && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.bio.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label className="font-medium">Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addSkill}
                          disabled={!newSkill}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5 p-1"
                                onClick={() => removeSkill(index)}
                              >
                                <X size={14} />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {errors.skills && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.skills.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label className="font-medium">Interests</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Add an interest"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addInterest}
                          disabled={!newInterest}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {interests.map((interest, index) => (
                            <motion.div
                              key={interest}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-sm"
                            >
                              {interest}
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-5 w-5 p-1"
                                onClick={() => removeInterest(index)}
                              >
                                <X size={14} />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {errors.interests && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.interests.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="address" className="font-medium">
                        Address
                      </Label>
                      <Input
                        id="address"
                        {...register("address")}
                        className={`transition-all duration-200 ${
                          errors.address
                            ? "border-destructive focus:ring-destructive/20"
                            : "focus:ring-primary/20"
                        }`}
                      />
                      {errors.address && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.address.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <Label className="font-medium">Resume</Label>
                      <div className="flex items-center gap-3 p-4 border rounded-lg">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {watch("resume_url")
                              ? "Resume Uploaded"
                              : "No resume uploaded"}
                          </p>
                          {watch("resume_url") && (
                            <Link
                              href={watch("resume_url")!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              View Resume
                            </Link>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeChange}
                            className="hidden"
                            id="resume-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById("resume-upload")?.click()
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                          {watch("resume_url") && (
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              onClick={() => {
                                setValue("resume_url", "");
                                setIsFormDirty(true);
                              }}
                              className="h-8 w-8 p-1"
                            >
                              <X size={14} />
                            </Button>
                          )}
                        </div>
                      </div>
                      {fileLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                          Uploading resume...
                        </motion.div>
                      )}
                      {fileError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-destructive flex items-center gap-2"
                        >
                          <AlertCircle size={14} />
                          {fileError}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Public Profiles Section */}
              {formSection === "public" && isMember && (
                <motion.div
                  key="public"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label className="font-medium">Public Links</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newSocialLink}
                          onChange={(e) => setNewSocialLink(e.target.value)}
                          placeholder="Add a public link (e.g., https://linkedin.com/)"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addSocialLink}
                          disabled={!newSocialLink}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2 mt-2">
                        <AnimatePresence>
                          {socialLinks.map((link, index) => (
                            <motion.div
                              key={link}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="font-medium">
                                  {getSocialPlatform(link)}
                                </p>
                                <Link
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {link}
                                </Link>
                              </div>
                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                onClick={() => removeSocialLink(index)}
                                className="h-8 w-8 p-1"
                              >
                                <X size={14} />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      {errors.social_links && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-destructive"
                        >
                          {errors.social_links.message}
                        </motion.p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 border-t border-border bg-muted/10 p-4 sm:p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset({
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  profile_photo_url: profile.profile_photo_url as string,
                  ...(isMember && memberProfile
                    ? {
                        specialization: memberProfile.specialization || "",
                        bio: memberProfile.bio || "",
                        skills: memberProfile.skills || [],
                        interests: memberProfile.interests || [],
                        address: memberProfile.address || "",
                        resume_url: memberProfile.resume_url || "",
                        social_links: memberProfile.social_links || [],
                      }
                    : {}),
                });
                setSkills(memberProfile?.skills || []);
                setInterests(memberProfile?.interests || []);
                setSocialLinks(memberProfile?.social_links || []);
                setIsFormDirty(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !isFormDirty || authLoading || imgLoading || fileLoading
              }
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-4">
        <p className="text-xs text-muted-foreground">
          Contact support to change your email address at{" "}
          <Link href="/profile/help">
            Help & Support.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
