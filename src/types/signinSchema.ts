import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().nonempty({ message: "Password cannot be empty" }),
});
