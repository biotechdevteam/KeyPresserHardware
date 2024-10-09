import { z } from "zod";
import UserSchema from "./userSchema";
import MemberSchema from "./memberSchema";

// Define the reaction schema for comments
const commentReactionSchema = z.object({
  _id: z.string().nonempty(),
  commentId: z.string().nonempty(),
  userId: UserSchema,
  reactionType: z.enum(["like", "dislike"]), // Reaction type is now an enum
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Define the reaction schema for posts
const postReactionSchema = z.object({
  _id: z.string().nonempty(),
  postId: z.string().nonempty(),
  userId: UserSchema,
  reactionType: z.enum(["like", "dislike"]), // Reaction type is now an enum
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Define the comment schema with likes/dislikes counts
export const commentSchema = z.object({
  _id: z.string().nonempty(),
  postId: z.string().nonempty(),
  userId: UserSchema,
  commentText: z.string().nonempty(),
  createdAt: z.date(),
  updatedAt: z.date(),
  reactions: z.array(commentReactionSchema).optional(),
});

// Define the comment schema with likes/dislikes counts
export const newCommentSchema = z.object({
  postId: z.string().nonempty(),
  userId: z.string().nonempty(),
  commentText: z.string().nonempty(),
});

// Define the blog schema with likes/dislikes counts
export const blogSchema = z.object({
  _id: z.string().nonempty(),
  authorId: MemberSchema,
  title: z.string().nonempty(),
  summary: z.string().nonempty(),
  content: z.string().nonempty(),
  category: z.string().nonempty(),
  featuredImageUrl: z.string().url().nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  comments: z.array(commentSchema).optional(),
  reactions: z.array(postReactionSchema).optional(),
});

export type Blog = z.infer<typeof blogSchema>;
export type Comment = z.infer<typeof commentSchema>;
export type NewComment = z.infer<typeof newCommentSchema>;
