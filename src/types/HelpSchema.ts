import { z } from "zod";

export const HelpFormSchema = z.object({
  subject: z.enum(
    [
      "technical_issue",
      "billing_problem",
      "feature_request",
      "account_issue",
      "other",
    ],
    {
      errorMap: () => ({ message: "Please select an issue type" }),
    }
  ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  attachment: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        !file ||
        ["image/png", "image/jpeg", "application/pdf"].includes(file.type),
      "Only PNG, JPEG, or PDF files are allowed"
    ),
});

export type HelpFormData = z.infer<typeof HelpFormSchema>;
