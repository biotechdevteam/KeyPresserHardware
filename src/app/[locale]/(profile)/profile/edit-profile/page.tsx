"use client";

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { User } from "@/types/userSchema";
import { Member } from "@/types/memberSchema";
import { Applicant } from "@/types/applicant";
import EditProfile from "@/components/profile/EditProfile";
import useAuth from "@/lib/useAuth";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import { toast } from "sonner";

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

    if (!profile && !loading && !error) {
      console.log("Fetching profile for user:", user.email);
      getProfile();
    }
  }, [isAuthenticated, user, profile, loading, error, getProfile, router]);

  const handleUpdateSuccess = async (
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

  console.log({ isAuthenticated, user, profile, loading, error });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Loading your profile...</h2>
        <p className="text-muted-foreground">This will just take a moment</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-destructive/10 p-3 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-medium">Authentication Required</h2>
        <p className="text-muted-foreground mb-6">Please log in to continue</p>
        <Button
          onClick={() =>
            router.push("/auth/signin", { onTransitionReady: slideFadeInOut })
          }
        >
          Login
        </Button>
      </div>
    );
  }

  if (error && error !== "No member found") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-destructive/10 p-3 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-medium">Could not load profile</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button
          onClick={() =>
            router.push("/dashboard", { onTransitionReady: slideFadeInOut })
          }
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-medium">
          {user.user_type === "member"
            ? "Profile Not Created"
            : "Application Pending"}
        </h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          {user.user_type === "member"
            ? "It looks like you haven’t created your member profile yet. Complete your profile to get started."
            : "Your application hasn’t been submitted or approved yet. Please submit an application and ensure you’ve paid the registration fee. Log out and back in after approval if needed."}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              router.push(
                user.user_type === "member" ? "/profile/create" : "/apply",
                {
                  onTransitionReady: slideFadeInOut,
                }
              )
            }
          >
            {user.user_type === "member"
              ? "Create Profile"
              : "Submit Application"}
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              router.push("/dashboard", { onTransitionReady: slideFadeInOut })
            }
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <Helmet>
        <title>
          {user.first_name} {user.last_name}
        </title>
        <meta
          name="description"
          content="Update your personal and professional information"
        />
      </Helmet>

      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-2 pl-0 flex items-center gap-2 hover:bg-transparent hover:text-primary"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          Edit Your Profile
        </h1>
        <p className="text-muted-foreground">
          Update your personal information and customize how others see you
        </p>
      </div>

      <div className="mb-8 space-y-8">
        <EditProfile
          profile={profile}
          user={user as User}
          onUpdate={handleUpdateSuccess}
        />

        <Card className="bg-muted/30 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
            <CardDescription>
              Having trouble updating your profile?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Contact our support team if you encounter any issues or have
                questions about your profile settings.
              </p>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() =>
                  router.push("/profile/help", {
                    onTransitionReady: slideFadeInOut,
                  })
                }
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProfileEditPage;
