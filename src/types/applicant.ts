import { z } from "zod";
import UserSchema from "./userSchema";
import MemberSchema from "./memberSchema";

const ApplicantSchema = z.object({
  _id: z.string(),
  profile_photo_url: z.string().nullable(),
  user_id: z.string(),
  motivation_letter: z.string(),
  referred_by_member_id: z.string().nullable(),
  application_status: z.enum(["pending", "approved", "rejected"]),
  specialization_area: z.string().optional(),
  resume_url: z.string().url().optional(),
  applied_at: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  reviewed_at: z.string().optional(),
  user: UserSchema,
  referredByMember: MemberSchema.optional(),
});

export type Applicant = z.infer<typeof ApplicantSchema>;
export default ApplicantSchema;
