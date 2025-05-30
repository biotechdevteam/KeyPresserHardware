"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  User,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Plus,
  RefreshCw,
  Download,
  Share2,
  Copy,
  CheckCheck,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Application } from "@/types/ApplicationSchema";
import { Member } from "@/types/memberSchema";
import { toast } from "sonner";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";

// Enhanced Application type with additional fields for display
interface ApplicationWithDetails extends Application {
  _id: string;
  status?: "pending" | "approved" | "rejected";
  submitted_at?: string;
  application_number?: string;
}

interface ApplicationDetailsProps {
  application: ApplicationWithDetails;
  referredMember?: Member;
  canReapply: boolean;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  referredMember,
  canReapply,
}) => {
  const [showMotivationDialog, setShowMotivationDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useTransitionRouter();

  // Get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return {
          badge: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
        };
      case "rejected":
        return {
          badge: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
        };
      case "under_review":
        return {
          badge: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Eye,
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
        };
      default:
        return {
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
        };
    }
  };

  const statusConfig = getStatusStyle(
    application.status ? application.status : "undefined"
  );
  const StatusIcon = statusConfig.icon;

  // Copy application number to clipboard
  const copyApplicationNumber = async () => {
    try {
      await navigator.clipboard.writeText(
        application.application_number ? application.application_number : "N/A"
      );
      setCopied(true);
      toast.success("Application number copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy application number");
    }
  };

  function handleNewApplication() {
    router.push("/apply", { onTransitionReady: slideFadeInOut });
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Application Details
          </h1>
          <p className="text-muted-foreground">
            Review your membership application status and details
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Status Card */}
          <motion.div variants={cardVariants}>
            <Card className={`border-2`}>
              <div className="w-full h-1" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${statusConfig.bgColor}`}>
                      <StatusIcon
                        className={`h-5 w-5 ${statusConfig.iconColor}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Application Status
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Application #{application.application_number}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${statusConfig.badge} px-3 py-1 text-sm font-medium`}
                  >
                    {application.status?.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium">
                      {format(
                        new Date(
                          application.submitted_at
                            ? application.submitted_at
                            : new Date()
                        ),
                        "PPP"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyApplicationNumber}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy Application #"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Information */}
          <motion.div variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                      <AvatarImage
                        src={application.profile_photo_url}
                        alt="Profile Photo"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg font-semibold">
                        {application.user_id.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Specialization Area
                      </h3>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {application.specialization_area}
                      </Badge>
                    </div>

                    {referredMember && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Referred By
                        </h3>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              {referredMember.user_id.first_name}{" "}
                              {referredMember.user_id.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Member since{" "}
                              {referredMember.created_at
                                ? format(
                                    new Date(referredMember.created_at),
                                    "MMM yyyy"
                                  )
                                : "Unknown"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents Section */}
          <motion.div variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Resume */}
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Resume</p>
                        <p className="text-sm text-muted-foreground">
                          JPEG Format
                        </p>
                      </div>
                      <Link
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Motivation Letter */}
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          Motivation Letter
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.motivation_letter.split(" ").length}{" "}
                          words
                        </p>
                      </div>
                      <Dialog
                        open={showMotivationDialog}
                        onOpenChange={setShowMotivationDialog}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Read
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Motivation Letter</DialogTitle>
                            <DialogDescription>
                              Your submitted motivation letter for membership
                              application
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <div
                              className="prose prose-sm max-w-none text-foreground"
                              dangerouslySetInnerHTML={{
                                __html: application.motivation_letter,
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={cardVariants}>
            <div className="pt-6">
              {canReapply && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Submit New Application
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Submit New Application
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit a new membership
                        application? This will create a separate application
                        that will be reviewed independently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleNewApplication}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
