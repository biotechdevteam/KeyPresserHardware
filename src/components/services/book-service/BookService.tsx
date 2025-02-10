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
import useAuth from "@/lib/useAuth";
import { useBookService } from "@/lib/useBookService";

interface BookServiceFormProps {
  serviceId: string;
  serviceTitle: string;
  onComplete: () => void;
  onCancel: () => void;
}

const BookServiceForm: React.FC<BookServiceFormProps> = ({
  serviceId,
  serviceTitle,
  onComplete,
  onCancel,
}) => {
  const { user } = useAuth();
  const { loading, error, success, response, handleBookService } =
    useBookService();
  const [bookingDate, setBookingDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    // Call the hook's handleBookService function
    await handleBookService(
      user._id as string,
      serviceId,
      bookingDate,
      description
    );

    // If booking is successful, call onComplete
    if (response) {
      setTimeout(() => {
        onComplete();
      }, 2000)
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Book Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Display user name and service title */}
          <div className="text-lg font-semibold">
            Booking as: <span className="text-accent">{user?.first_name}</span>
          </div>
          <div className="text-lg font-semibold">
            Service: <span className="text-accent">{serviceTitle}</span>
          </div>

          {/* Error Message */}
          {error && <p className="text-destructive">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-primary">{success}</p>}

          {/* Booking Date Input */}
          <Input
            label="Booking Date"
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />

          {/* Description Input */}
          <Input
            label="Description"
            type="text"
            placeholder="Add any additional details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Booking..." : "Book Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookServiceForm;
