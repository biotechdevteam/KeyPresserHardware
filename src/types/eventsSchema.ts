import { z } from "zod";
import MemberSchema from "./memberSchema";
import UserSchema from "./userSchema";

export const SpeakerSchema = z.object({
  _id: z.string(),
  eventId: z.string(),
  memberId: MemberSchema,
  speakerRole: z.string(),
  createdAt: z.date()
})

export const AttendeeSchema = z.object({
  _id: z.string(),
  eventId: z.string(),
  userId: UserSchema,
  attendeeStatus: z.string(),
  createdAt: z.date()
})

export const eventsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  eventType: z.enum(["physical", "hybrid", "online"]),
  eventImageUrl: z.string().url(),
  registrationDeadline: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isRegistrationOpen: z.boolean(),
  speakers: z.array(SpeakerSchema),
  attendees: z.array(AttendeeSchema),
});

export type Event = z.infer<typeof eventsSchema>;
export type Events = Event[];
export type Speakers = z.infer<typeof SpeakerSchema>;
export type Attendees = z.infer<typeof AttendeeSchema>;
