import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CustomCheckbox from "@/components/ui/mycustomcheckbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Import ShadCN's AlertDialog components
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface TermsModalProps {
  termsAndConditions: string;
  privacyPolicy: string;
}

const TermsModal: React.FC<TermsModalProps> = ({
  termsAndConditions,
  privacyPolicy,
}) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [activeTab, setActiveTab] = useState("terms");
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Alert state

  const router = useRouter();

  const handleApplyNow = () => {
    if (!agreedToTerms || !agreedToPrivacy) {
      // Show alert dialog
      setIsAlertOpen(true);
    } else {
      router.push("/apply");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="py-8 flex justify-center">
        <Link
          href="#"
          className="bg-primary text-foreground p-6 w-40 mx-auto font-bold rounded-lg hover:bg-card transition duration-300 ease-in-out"
        >
          Join Our Team
        </Link>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full flex flex-col flex-1"
          >
            {/* Tabs List */}
            <TabsList className="flex justify-center items-center p-0">
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
        </DialogHeader>

        {/* Fixed footer */}
        <DialogFooter className="p-4 border-t border-muted">
          {/* Apply a grid layout to ensure full-width elements on separate rows */}
          <div className="grid grid-cols-1 gap-4 w-full">
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

            {/* Apply Now button with alert handling */}
            <Button
              onClick={handleApplyNow}
              className="w-auto bg-primary text-foreground hover:bg-card"
            >
              Apply Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

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
    </Dialog>
  );
};

export default TermsModal;
