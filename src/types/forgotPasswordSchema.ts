import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().min(10, { message: "Invalid phone number" }).optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Please provide either an email or phone number",
  });
