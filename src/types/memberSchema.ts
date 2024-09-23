import { z } from "zod";
import UserSchema from "./userSchema";

const MemberSchema = UserSchema.extend({
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  specialization: z.string().optional(),
  address: z.string().optional(),
  resume_url: z.string().url().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
export default MemberSchema;
