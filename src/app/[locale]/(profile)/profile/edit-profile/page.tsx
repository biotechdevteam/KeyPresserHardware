"use client";

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { User } from "@/types/userSchema";
import { Member } from "@/types/memberSchema";
import EditProfile from "@/components/profile/EditProfile";
import useAuth from "@/lib/useAuth";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import { toast } from "sonner";
import { Applicant } from "@/types/applicant";

const ProfileEditPage: React.FC = () => {
  const router = useTransitionRouter();
  const {
    user,
    profile,
    loading,
    error,
    getProfile,
    updateProfile,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/auth/signin", { onTransitionReady: slideFadeInOut });
      return;
    }

    // Only fetch profile for members
    if (user.user_type === "member" && !profile && !loading && !error) {
      console.log("Fetching profile for user:", user.email);
      getProfile();
    }
  }, [isAuthenticated, user, profile, loading, error, getProfile, router]);

  // Do not delete this commented code block yet, it will be useful later
  // const handleUserUpdate = async (
  //   firstName: string,
  //   lastName: string,
  //   profilePhotoUrl: string,
  //   userCategory: string
  // ) => {
  //   const success = await updateUser(
  //     firstName,
  //     lastName,
  //     profilePhotoUrl,
  //     userCategory
  //   );

  //   if (success) {
  //     toast.success("Your profile has been successfully updated.");
  //   } else {
  //     toast.error("There was an error updating your profile.");
  //   }
  // };

  const handleMemberUpdate = async (
    memberId: string,
    bio: string,
    skills: string[],
    interests: string[],
    specialization: string,
    address: string,
    socialLinks: string[],
    resumeUrl: string
  ) => {
    const success = await updateProfile(
      memberId,
      bio,
      skills,
      interests,
      specialization,
      address,
      socialLinks,
      resumeUrl
    );

    if (success) {
      toast.success("Your profile has been successfully updated.");
      getProfile(); // Refresh profile after update
    } else {
      toast.error("There was an error updating your profile.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Loading your profile...</h2>
        <p className="text-muted-foreground">This will just take a moment</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 max-w-3xl"
    >
      <Helmet>
        <title>
          {user?.first_name} {user?.last_name} - Edit Profile
        </title>
        <meta
          name="description"
          content="Update your personal and professional information"
        />
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Edit Your Profile
        </h1>
        <p className="text-muted-foreground">
          Update your personal information and customize how others see you
        </p>
      </div>

      <div className="mb-8 space-y-8">
        <EditProfile
          user={user as User}
          memberProfile={profile as Member}
          profile={profile as Member | Applicant}
          // onUserUpdate={handleUserUpdate}
          onMemberUpdate={handleMemberUpdate}
        />
      </div>
    </motion.div>
  );
};

export default ProfileEditPage;
