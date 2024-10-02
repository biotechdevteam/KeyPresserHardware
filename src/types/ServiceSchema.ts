import { z } from "zod";
import MemberSchema from "./memberSchema"; // Assuming MemberSchema already exists
import UserSchema from "./userSchema"; // Assuming UserSchema already exists

// Availability schema for service providers
const AvailabilitySchema = z.object({
  day: z.string(),
  start_time: z.string(),
  end_time: z.string(),
});

// Service provider schema
const ServiceProviderSchema = z.object({
  _id: z.string(),
  service_id: z.string(),
  member_id: MemberSchema, // Referencing the member schema
  availability: z.array(AvailabilitySchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Booking schema
const BookingSchema = z.object({
  _id: z.string(),
  user_id: UserSchema, // Referencing the user schema
  service_id: z.string(),
  booking_date: z.string(),
  status: z.enum(["pending", "confirmed", "declined"]),
  created_at: z.string(),
  updated_at: z.string(),
});

// Booking schema
const PricingSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  billing_cycle: z.string().optional()
});

// Main service schema
const ServiceSchema = z.object({
  _id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  service_type: z.enum(["association", "individual", "company"]),
  service_category: z.enum([
    "health",
    "education",
    "business",
    "technology",
    "telemedicine",
    "microbiology",
    "other",
  ]),
  pricing_plans: z.array(PricingSchema),
  is_verified: z.boolean().optional(),
  portfolio_urls: z.array(z.string().url()).optional(),
  service_providers: z.array(ServiceProviderSchema).optional(),
  bookings: z.array(BookingSchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;
export type ServiceProvider = z.infer<typeof ServiceProviderSchema>;
export type Booking = z.infer<typeof BookingSchema>;

export default ServiceSchema;
