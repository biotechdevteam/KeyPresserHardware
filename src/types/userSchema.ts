import { z } from "zod";
import { SocialLinksSchema } from "./aboutSchema";

// User Schema for common user details
const UserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  user_type: z.enum(["member", "client", "admin", "applicant"]), // Enum to specify user type
  user_category: z
    .enum(["student", "professional", "institutional", "organizational"])
    .default("student"), // Enum to specify user category
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
export default UserSchema;
