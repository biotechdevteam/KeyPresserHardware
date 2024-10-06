import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/(?=.*\d)(?=.*[A-Z])(?=.*\W)/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),
  first_name: z.string().nonempty({ message: "First name cannot be empty" }),
  last_name: z.string().nonempty({ message: "Last name cannot be empty" }),
  profile_photo_url: z.string().optional(),
  user_type: z.enum(["admin", "member", "customer", "applicant"], {
    errorMap: () => ({
      message: "User type must be one of admin, member, customer, or applicant",
    }),
  }),
});
