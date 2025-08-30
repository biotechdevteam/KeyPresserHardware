import { z } from "zod";

export const testimonialFormSchema = z.object({
  type: z.enum(["testimonial", "review"]),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be 5 or less"),
  comment: z.string().min(10, "Comment must be at least 10 characters long").max(1000, "Comment must be less than 1000 characters"),
  serviceId: z.string().optional(),
  eventId: z.string().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
