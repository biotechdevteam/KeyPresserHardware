"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/lib/useAuth";
import { useRegisterEvent } from "@/lib/useRegisterEvent";
import { CheckCircle, CalendarClock, AlertCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useRecaptcha, RECAPTCHA_ACTIONS } from "@/lib/useRecaptcha";

interface EnrollEventFormProps {
  eventId: string;
  eventTitle: string;
  onComplete: () => void;
  onCancel: () => void;
}

const sources = [
  { label: "Social Media", value: "Social Media" },
  { label: "Friend or Family", value: "Friend or Family" },
  { label: "Online Ad", value: "Online Ad" },
  { label: "Email Newsletter", value: "Email Newsletter" },
  { label: "Website", value: "Website" },
  { label: "Other", value: "Other" },
];

const EnrollEventForm: React.FC<EnrollEventFormProps> = ({
  eventId,
  eventTitle,
  onComplete,
  onCancel,
}) => {
  const { user } = useAuth();
  const { loading, error, successMessage, response, handleRegisterEvent } =
    useRegisterEvent();
  const { executeRecaptcha, isLoading: recaptchaLoading, error: recaptchaError } = useRecaptcha();

  const [heardAboutEvent, setHeardAboutEvent] = useState("");
  const [expectations, setExpectations] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.REGISTER_EVENT);
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      // Combine the dropdown and expectations into a single string for 'notes'
      const combinedNotes = `
        How did you hear about this event: ${heardAboutEvent}
        Key expectations for the event: ${expectations}
      `;

      // Call the hook's handleRegisterEvent function with combined notes
      await handleRegisterEvent(user._id as string, eventId, combinedNotes);

      // If registration is successful, show success state
      if (response) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } catch (error) {
      console.error("Error during event registration:", error);
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-lg w-full sm:max-w-[425px]">
        {!showSuccess ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Enroll in Event
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Complete the form below to register for this event.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Display user name and event title */}
              <div className="bg-muted/40 p-4 rounded-md">
                <div className="font-medium">
                  Registering as:{" "}
                  <span className="text-primary font-semibold">
                    {user?.first_name} {user?.last_name}
                  </span>
                </div>
                <div className="font-medium mt-1">
                  Event:{" "}
                  <span className="text-primary font-semibold">
                    {eventTitle}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-md text-destructive flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* reCAPTCHA Error */}
              {recaptchaError && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-md text-destructive flex items-center gap-2">
                  <Shield size={16} />
                  {recaptchaError}
                </div>
              )}

              {/* Dropdown: How did you hear about this event? */}
              <div className="space-y-2">
                <Label htmlFor="source" className="font-medium">
                  How did you hear about this event?
                </Label>
                <select
                  id="source"
                  value={heardAboutEvent}
                  onChange={(e) => setHeardAboutEvent(e.target.value)}
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="">Select an option</option>
                  {sources.map((source) => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Input: Key expectations for the event */}
              <div className="space-y-2">
                <Label htmlFor="expectations" className="font-medium">
                  What are your key expectations for the event?
                </Label>
                <Textarea
                  id="expectations"
                  placeholder="Share what you hope to learn or experience..."
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* reCAPTCHA Info */}
              <div className="flex items-center justify-center pt-2">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Shield className="mr-1 h-3 w-3" />
                  This form is protected by reCAPTCHA
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || recaptchaLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Registering...
                  </>
                ) : (
                  "Enroll in Event"
                )}
              </Button>
            </DialogFooter>
          </motion.div>
        ) : (
          <motion.div
            className="py-12 flex flex-col items-center justify-center text-center"
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
          >
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-primary">
              Registration Complete!
            </h3>
            <p className="text-muted-foreground mt-2">
              You've successfully enrolled in {eventTitle}
            </p>
            <Button onClick={onComplete} className="mt-6">
              Close
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrollEventForm;
