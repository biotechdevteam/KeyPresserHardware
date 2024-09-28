import { z } from "zod";
import UserSchema from "./userSchema";

const MemberSchema = UserSchema.extend({
  _id: z.string(),
  user_id: UserSchema,
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  social_links: z.array(z.string().url()).optional(),
  specialization: z.string().optional(),
  address: z.string().optional(),
  resume_url: z.string().url().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
export default MemberSchema;
