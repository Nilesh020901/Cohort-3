// src/index.ts
import { z } from "zod";

// Signup Schema
export const signupInput = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupInput>;

// Signin Schema
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SigninInput = z.infer<typeof signinInput>;

// Create Post Schema
export const createPostInput = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
});

export type CreatePostInput = z.infer<typeof createPostInput>;

// Update Post Schema
export const updatePostInput = z.object({
  id: z.string(),
  title: z.string().min(3).max(100).optional(),
  content: z.string().min(10).optional(),
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;
