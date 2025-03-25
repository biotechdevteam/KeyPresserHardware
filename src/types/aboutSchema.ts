import { z } from "zod";

// Social links schema
export const SocialLinksSchema = z.object({
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  github: z.string().url().optional(),
});

// Achievements schema
const AchievementsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
});

// Partnerships schema
const PartnershipsSchema = z.object({
  partner: z.string(),
  description: z.string().optional(),
  logo: z.string(),
  website: z.string().optional(),
});

// File schema for videos, images, documents
const FileSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
});

// Main About schema
const AboutSchema = z.object({
  name: z.string(),
  slogan: z.string().optional(),
  logo_url: z.string().url(),
  cover_photo_url: z.string().url().optional(),
  mission_statement: z.string(),
  vision_statement: z.string(),
  history: z.string().optional(),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
  achievements: z.array(AchievementsSchema).optional(),
  partnerships: z.array(PartnershipsSchema).optional(),
  social_links: SocialLinksSchema.optional(),
  appendices: z.array(FileSchema).optional(),
  videos: z.array(FileSchema).optional(),
  images: z.array(FileSchema).optional(),
  documents: z.array(FileSchema).optional(),
});

export type About = z.infer<typeof AboutSchema>;
export default AboutSchema;
