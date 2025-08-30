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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CheckCircle, Loader2, Shield } from "lucide-react";
import useAuth from "@/lib/useAuth";
import { useBookService } from "@/lib/useBookService";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRecaptcha, RECAPTCHA_ACTIONS } from "@/lib/useRecaptcha";

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
  const { executeRecaptcha, isLoading: recaptchaLoading, error: recaptchaError } = useRecaptcha();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    if (!date) {
      return;
    }

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.BOOK_SERVICE);
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      const formattedDate = format(date, "yyyy-MM-dd");

      // Call the hook's handleBookService function
      await handleBookService(
        user._id as string,
        serviceId,
        formattedDate,
        description
      );

      // If booking is successful, call onComplete
      if (response) {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } catch (error) {
      console.error("Error during service booking:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Book Service
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Complete the form below to book this service.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Display user name and service title */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/20 rounded-lg">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                BOOKING AS
              </Label>
              <div className="font-medium text-foreground">
                {user?.first_name} {user?.last_name}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">
                SERVICE
              </Label>
              <div className="font-medium text-primary">{serviceTitle}</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="error" className="animate-in fade-in-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-700 animate-in fade-in-50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* reCAPTCHA Error */}
          {recaptchaError && (
            <Alert variant="error" className="animate-in fade-in-50">
              <Shield className="h-4 w-4" />
              <AlertDescription>{recaptchaError}</AlertDescription>
            </Alert>
          )}

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">
              When will you be needing this service?
            </Label>

            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Input
                    id="date"
                    readOnly
                    value={date ? format(date, "EEEE, MMMM d, yyyy") : ""}
                    placeholder="Select a date"
                    className="w-full pl-3 pr-10 cursor-pointer hover:border-primary/50 focus:border-primary"
                    onClick={() => setShowCalendar(true)}
                  />
                  <CalendarIcon
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                    onClick={() => setShowCalendar(true)}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setShowCalendar(false);
                  }}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  minimal
                  size="sm"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Additional Details
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide any specific requirements or questions"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
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

        <DialogFooter className="flex space-x-2 justify-end border-t pt-4">
          <Button variant="outline" onClick={onCancel} size="sm">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || recaptchaLoading || !date}
            className="min-w-[100px]"
            size="sm"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookServiceForm;
