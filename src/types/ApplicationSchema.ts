import { z } from "zod";

export const ApplicationSchema = z.object({
  user_id: z.string().nonempty("User ID is required."),
  profile_photo_url: z
    .string()
    .url("Must be a url")
    .nonempty("Profile photo URL is required."),
  motivation_letter: z
    .string()
    .min(10, "Motivation letter must be at least 10 characters."),
  referred_by_member_id: z.string().optional(),
  specialization_area: z.string().min(2, "Required please"),
  resume_url: z
    .string()
    .url("Must be a url")
    .nonempty("Profile photo URL is required.")
});

export type Application = z.infer<typeof ApplicationSchema>;
