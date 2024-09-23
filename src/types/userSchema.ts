import { z } from "zod";

// User Schema for common user details
const UserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  user_type: z.enum(["member", "admin"]), // Enum to specify user type
  profile_photo_url: z.string().url().optional(),
  social_links: z.array(z.string().url()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
export default UserSchema;
