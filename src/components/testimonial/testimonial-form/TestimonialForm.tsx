"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  testimonialFormSchema,
  TestimonialFormValues,
} from "@/types/testimonialFormSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Send, Loader2, Star, Shield } from "lucide-react";
import { useFeedback } from "@/lib/useFeedback";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import useAuth from "@/lib/useAuth";
import { Service } from "@/types/ServiceSchema";
import { Event } from "@/types/eventsSchema";
import { useRecaptcha, RECAPTCHA_ACTIONS } from "@/lib/useRecaptcha";

interface TestimonialFormProps {
  events: Event[];
  services: Service[];
  onSuccess?: () => void;
  className?: string;
  serviceId?: string;
  eventId?: string;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  events,
  services,
  onSuccess,
  className,
  serviceId,
  eventId,
}) => {
  const t = useTranslations("testimonialform");
  const { handleCreateReview, loading, error, successMessage } = useFeedback();
  const { user } = useAuth();
  const { executeRecaptcha, isLoading: recaptchaLoading, error: recaptchaError } = useRecaptcha();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<
    "testimonial" | "review" | ""
  >("");
  const [loadingData, setLoadingData] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    mode: "onBlur",
  });

  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false);
  };

  const handleTypeChange = (value: "testimonial" | "review") => {
    setSelectedType(value);
    setValue("type", value);
    // Clear service/event selection when type changes
    setValue("serviceId", "");
    setValue("eventId", "");
  };

  const onSubmit = async (data: TestimonialFormValues) => {
    if (!user) {
      setIsRegisterDialogOpen(true);
      return;
    }

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.TESTIMONIAL_FORM);
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed. Please try again.');
      }

      await handleCreateReview(
        user._id as string,
        data.type,
        data.rating,
        data.comment,
        data.serviceId || serviceId,
        data.eventId || eventId
      );

      if (successMessage) {
        reset();
        setRating(0);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue("rating", value);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      {/* Register Dialog */}
      {isRegisterDialogOpen && (
        <RegisterDialog
          open={isRegisterDialogOpen}
          onComplete={handleRegisterComplete}
          onCancel={() => setIsRegisterDialogOpen(false)}
        />
      )}

      <Card className={className}>
        <CardHeader>
          <CardTitle>Share Your Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={formVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Type Selection */}
            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">Type</Label>
              <Select onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="testimonial">Testimonial</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  Please select a type
                </p>
              )}
            </motion.div>

            {/* Service Selection (only show for testimonial) */}
            {selectedType === "testimonial" && (
              <motion.div variants={itemVariants}>
                <Label className="block mb-2 text-sm font-medium">
                  Service
                </Label>
                <Select
                  onValueChange={(value) => setValue("serviceId", value)}
                  disabled={loadingData}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingData ? "Loading services..." : "Select a service"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service._id} value={service._id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceId && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">
                    Please select a service
                  </p>
                )}
              </motion.div>
            )}

            {/* Event Selection (only show for review) */}
            {selectedType === "review" && (
              <motion.div variants={itemVariants}>
                <Label className="block mb-2 text-sm font-medium">Event</Label>
                <Select
                  onValueChange={(value) => setValue("eventId", value)}
                  disabled={loadingData}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        loadingData ? "Loading events..." : "Select an event"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event._id} value={event._id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.eventId && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">
                    Please select an event
                  </p>
                )}
              </motion.div>
            )}

            {/* Rating */}
            <motion.div variants={itemVariants}>
              <Label className="block mb-2 text-sm font-medium">Rating</Label>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="default"
                    onClick={() => handleRatingClick(star)}
                    className={`p-1 transition-colors ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    } bg-transparent`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </Button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  Rating is required
                </p>
              )}
            </motion.div>

            {/* Comment */}
            <motion.div variants={itemVariants}>
              <Label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium"
              >
                Your Experience
              </Label>
              <Textarea
                id="comment"
                {...register("comment")}
                placeholder="Share your experience with us..."
                className={`w-full min-h-32 transition-all duration-200 ${
                  errors.comment
                    ? "border-destructive focus:ring-destructive/50"
                    : "focus:ring-primary/50"
                }`}
                disabled={loading}
              />
              {errors.comment && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  {errors.comment.message}
                </p>
              )}
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                variants={itemVariants}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
              >
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                variants={itemVariants}
                className="p-3 bg-green-500/10 border border-green-500/20 rounded-md"
              >
                <p className="text-sm text-green-600">{successMessage}</p>
              </motion.div>
            )}

            {/* reCAPTCHA Error */}
            {recaptchaError && (
              <motion.div
                variants={itemVariants}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
              >
                <p className="text-sm text-destructive flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  {recaptchaError}
                </p>
              </motion.div>
            )}

            {/* reCAPTCHA Info */}
            <motion.div variants={itemVariants}>
              <p className="text-xs text-muted-foreground flex items-center justify-center">
                <Shield className="mr-1 h-3 w-3" />
                This form is protected by reCAPTCHA
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full py-3 transition-all duration-300"
                disabled={loading || recaptchaLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit {rating > 0 && `${rating}-Star`} Experience
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </>
  );
};

export default TestimonialForm;
