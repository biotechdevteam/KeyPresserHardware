import { z } from "zod";
import MemberSchema from "./memberSchema";

// Social links schema
export const SocialLinksSchema = z.object({
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  github: z.string().url().optional(),
});

// Leadership team schema
const LeadershipTeamSchema = z.object({
  _id: z.string(),
  member: MemberSchema,
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
  logo_url: z.string().url().optional(),
  cover_photo_url: z.string().url().optional(),
  mission_statement: z.string(),
  vision_statement: z.string(),
  history: z.string().optional(),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  address: z.string().optional(),
  leadership_team: z.array(LeadershipTeamSchema),
  achievements: z.array(AchievementsSchema).optional(),
  partnerships: z.array(PartnershipsSchema).optional(),
  social_links: SocialLinksSchema.optional(),
  appendices: z.array(FileSchema).optional(),
  videos: z.array(FileSchema).optional(),
  images: z.array(FileSchema).optional(),
  documents: z.array(FileSchema).optional(),
  terms_and_conditions: z.string().optional(),
  privacy_policy: z.string().optional(),
});

export type About = z.infer<typeof AboutSchema>;
export type LeadershipTeam = z.infer<typeof LeadershipTeamSchema>;
export default AboutSchema;
