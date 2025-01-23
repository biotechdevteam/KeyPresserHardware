import { z } from "zod";
import MemberSchema from "./memberSchema"; // Assuming this already includes the nested structure for user_id and other details

const ProjectSchema = z.object({
  _id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.enum(["ongoing", "completed", "upcoming"]),
  category: z.string(),
  projectImageUrl: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  __v: z.number().optional(),
  members: z.array(
    z.object({
      _id: z.string(),
      projectId: z.string(),
      memberId: MemberSchema, // Reusing MemberSchema for detailed member info
      roleInProject: z.string(),
      joinedAt: z.string().datetime(),
      __v: z.number().optional(),
    })
  ),
  collaborationOpportunities: z
    .array(
      z.object({
        _id: z.string(),
        expertise: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  milestones: z
    .array(
      z.object({
        _id: z.string(),
        title: z.string(),
        completed: z.boolean(),
      })
    )
    .optional(),
  multimedia: z
    .array(
      z.object({
        type: z.enum(["image", "video"]),
        url: z.string().url(),
      })
    )
    .optional(),
  documents: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
  partners: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
        logoUrl: z.string().url(),
      })
    )
    .optional(),
  progress: z.number().min(0).max(100), // Progress as a percentage
});

export type Project = z.infer<typeof ProjectSchema>;
export default ProjectSchema;
