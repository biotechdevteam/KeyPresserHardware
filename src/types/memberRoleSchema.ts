import { z } from "zod";
import MemberSchema from "./memberSchema";

export const AssociationRole = z.enum([
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "CEO",
  "Director",
  "Manager",
  "Coordinator",
  "Advisor",
  "Chairperson",
  "Board Member",
  "Regular Member",
  "Volunteer",
  "Patron",
  "Auditor",
  "Public Relations Officer",
  "Event Coordinator",
  "Technical Advisor",
  "Legal Advisor",
  "Fundraising Officer",
  "Membership Officer",
  "Project Manager",
  "Webmaster",
  "Archivist",
  "Liaison Officer",
  "Consultant",
  "Intern",
  "Fellow",
  "Honorary Member",
  "Trustee",
  "Delegate",
  "Observer",
  "Associate Member",
  "Working Group Member",
  "Committee Member",
  "Regional Representative",
  "National Representative",
  "International Representative",
  "Spokesperson",
  "Facilitator",
]);

const MemberRoleSchema = z.object({
  _id: z.string(),
  member_id: MemberSchema,
  role: AssociationRole,
  assigned_at: z.string().datetime().optional(),
  assigned_by: z.string().optional(),
});

export type MemberRole = z.infer<typeof MemberRoleSchema>;
export default MemberRoleSchema;
