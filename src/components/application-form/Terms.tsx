import { Button } from "@/components/ui/button";
import { About } from "@/types/aboutSchema";
import React, { useState, useEffect } from "react";
import MembershipAgreement from "../Policies/MembershipAgreement";
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
import { Progress } from "@/components/ui/progress";
import { CornerDownLeft, FileText, X } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface TermsProps {
  aboutData: About;
  onAccept: () => void; // Handler for accepting the terms
  onCancel: () => void; // Handler for canceling the process
}

const Terms: React.FC<TermsProps> = ({ aboutData, onAccept, onCancel }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  // Function to handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;

    // Calculate scroll percentage
    const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
    setScrollProgress(progress);

    // Check if user has scrolled to bottom (or near bottom)
    if (progress > 90) {
      setHasScrolledToBottom(true);
    }
  };

  // Auto-enable checkbox hint when scrolled to bottom
  useEffect(() => {
    if (hasScrolledToBottom && !agreedToTerms) {
      // Could add animation or highlight to the checkbox here
    }
  }, [hasScrolledToBottom, agreedToTerms]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-h-screen flex flex-col border border-muted rounded-lg overflow-hidden shadow-sm"
    >
      {/* Scroll progress indicator */}
      <Progress value={scrollProgress} className="h-1 w-full" />

      {/* Scrollable Terms */}
      <div className="overflow-y-auto flex-1 p-4" onScroll={handleScroll}>
        <MembershipAgreement aboutData={aboutData} />
      </div>

      {/* Fixed footer */}
      <div className="p-6 flex flex-col space-y-4 bg-background border-t">
        <div className="flex items-center justify-center">
          <motion.div
            animate={hasScrolledToBottom ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Checkbox
              checked={agreedToTerms}
              onCheckedChange={setAgreedToTerms}
              size="md"
              label="I agree to all the terms and conditions"
              disabled={!hasScrolledToBottom}
            />
          </motion.div>
        </div>

        <Separator />

        {/* Apply Now and Cancel buttons */}
        <div className="flex justify-between">
          <Button
            onClick={() => setShowCancelDialog(true)}
            variant="outline"
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={onAccept}
            disabled={!agreedToTerms}
            className={cn(
              "px-6 transition-all",
              hasScrolledToBottom && !agreedToTerms && "animate-pulse"
            )}
          >
            Proceed
          </Button>
        </div>
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Quit Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to quit the application?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={onCancel}
              className="bg-destructive hover:bg-destructive/90"
            >
              Quit
            </AlertDialogAction>
            <AlertDialogCancel>Go back</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default Terms;
