import { z } from "zod";

// Schema for booking a service
const BookServiceSchema = z.object({
  user_id: z.string(),
  service_id: z.string(),
  booking_date: z.string(),
  description: z.string().optional(),
});

export type BookService = z.infer<typeof BookServiceSchema>;

export default BookServiceSchema;
