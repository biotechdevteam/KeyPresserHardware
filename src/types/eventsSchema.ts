import { z } from "zod";

const eventsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  details: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  eventType: z.string().optional(),
  eventImageUrl: z.string().url().optional(),
  registrationDeadline: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isRegistrationOpen: z.boolean().optional(),
});

export type Events = z.infer<typeof eventsSchema>;
export default eventsSchema;