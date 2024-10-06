import { z } from "zod";

// Define the FAQ Schema
export const FAQSchema = z.object({
  _id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

// Define the response schema for fetching a list of FAQs
export const FAQsSchema = z.array(FAQSchema);

export type FAQ = z.infer<typeof FAQSchema>;
export type FAQs = z.infer<typeof FAQsSchema>;
