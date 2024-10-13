"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/useAuth"; // Import useAuth to get the user
import { useRegisterEvent } from "@/lib/useRegisterEvent"; // A custom hook for registering event

interface EnrollEventFormProps {
  eventId: string;
  eventTitle: string;
  onComplete: () => void;
  onCancel: () => void;
}

const EnrollEventForm: React.FC<EnrollEventFormProps> = ({
  eventId,
  eventTitle,
  onComplete,
  onCancel,
}) => {
  const { user } = useAuth();
  const { loading, error, successMessage, response, handleRegisterEvent } =
    useRegisterEvent();
  
  // State for both fields
  const [heardAboutEvent, setHeardAboutEvent] = useState(""); // For dropdown
  const [expectations, setExpectations] = useState(""); // For text input

  const handleSubmit = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    // Combine the dropdown and expectations into a single string for 'notes'
    const combinedNotes = `
      How did you hear about this event: ${heardAboutEvent}
      Key expectations for the event: ${expectations}
    `;

    // Call the hook's handleRegisterEvent function with combined notes
    await handleRegisterEvent(user._id as string, eventId, combinedNotes);

    // If registration is successful, call onComplete
    if (response) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Enroll in Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Display user name and event title */}
          <div className="text-lg font-semibold">
            Registering as:{" "}
            <span className="text-primary">{user?.first_name}</span>
          </div>
          <div className="text-lg font-semibold">
            Event: <span className="text-primary">{eventTitle}</span>
          </div>

          {/* Error Message */}
          {error && <p className="text-destructive">{error}</p>}

          {/* Success Message */}
          {successMessage && <p className="text-primary">{successMessage}</p>}

          {/* Dropdown: How did you hear about this event? */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              How did you hear about this event?
            </label>
            <select
              value={heardAboutEvent}
              onChange={(e) => setHeardAboutEvent(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select an option</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend or Family">Friend or Family</option>
              <option value="Online Ad">Online Ad</option>
              <option value="Email Newsletter">Email Newsletter</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Text Input: Key expectations for the event */}
          <Input
            label="What are your key expectations for the event?"
            type="text"
            placeholder="Share your expectations"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registering..." : "Enroll in Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollEventForm;
