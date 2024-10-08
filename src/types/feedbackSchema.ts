import { z } from "zod";
import UserSchema from "./userSchema";
import ServiceSchema from "./ServiceSchema";
import { eventsSchema } from "./eventsSchema";

const FeedbackSchema = z
  .object({
    _id: z.string(),
    type: z.enum(["testimonial", "review"]),
    serviceId: ServiceSchema.optional(),
    eventId: eventsSchema.optional(),
    userId: UserSchema,
    rating: z.number().min(1).max(5),
    comment: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

export type Feedback = z.infer<typeof FeedbackSchema>;
export default FeedbackSchema;
