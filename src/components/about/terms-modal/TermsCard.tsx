import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CustomCheckbox from "@/components/ui/mycustomcheckbox";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface TermsCardProps {
  termsAndConditions: string;
  privacyPolicy: string;
  onAccept: () => void; // Handler for accepting the terms
  onCancel: () => void; // Handler for canceling the process
}

const TermsCard: React.FC<TermsCardProps> = ({
  termsAndConditions,
  privacyPolicy,
  onAccept,
  onCancel,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [activeTab, setActiveTab] = useState("terms");
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Alert state

  const handleApplyNow = () => {
    if (!agreedToTerms || !agreedToPrivacy) {
      // Show alert dialog
      setIsAlertOpen(true);
    } else {
      onAccept(); // Call onAccept when terms are agreed
    }
  };

  return (
    <div className="text-foreground flex flex-col overflow-hidden border border-muted p-0">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex flex-col flex-1"
      >
        {/* Tabs List */}
        <TabsList className="flex justify-center items-center p-0 mb-4">
          <TabsTrigger
            value="terms"
            className="px-4 py-2 font-medium text-primary bg-transparent data-[state=active]:bg-primary data-[state=active]:text-white rounded w-full"
          >
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="px-4 py-2 font-medium text-primary bg-transparent data-[state=active]:bg-primary data-[state=active]:text-white rounded w-full"
          >
            Privacy & Security Policy
          </TabsTrigger>
        </TabsList>

        {/* Scrollable TabsContent */}
        <div
          className="overflow-y-auto flex-1 px-4 py-2"
          style={{ maxHeight: "50vh" }}
        >
          <TabsContent value="terms" className="pt-4">
            <div
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: termsAndConditions }}
            />
          </TabsContent>
          <TabsContent value="privacy" className="pt-4">
            <div
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: privacyPolicy }}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Fixed footer */}
      <div className="p-4 border-t border-muted mt-4 flex flex-col space-y-4">
        {/* Show the custom checkbox based on the active tab */}
        {activeTab === "terms" && (
          <CustomCheckbox
            checked={agreedToTerms}
            onCheckedChange={setAgreedToTerms}
            label="I agree to the terms and conditions"
          />
        )}
        {activeTab === "privacy" && (
          <CustomCheckbox
            checked={agreedToPrivacy}
            onCheckedChange={setAgreedToPrivacy}
            label="I agree to the privacy and security policy"
          />
        )}

        {/* Apply Now and Cancel buttons */}
        <div className="flex justify-between">
          <Button onClick={onCancel} variant="outline" className="w-1/3">
            Cancel
          </Button>
          <Button
            onClick={handleApplyNow}
            className="w-1/3 bg-primary text-white hover:bg-primary-dark"
          >
            Apply Now
          </Button>
        </div>
      </div>

      {/* ShadCN Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Incomplete Agreement</AlertDialogTitle>
            <AlertDialogDescription>
              You must agree to both the terms and conditions, as well as the
              privacy policy before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsAlertOpen(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TermsCard;
