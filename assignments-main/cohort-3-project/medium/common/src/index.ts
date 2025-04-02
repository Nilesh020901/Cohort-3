import { z } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const updateUserDetailsInput = z.object({
    name: z.string().optional(),
    password: z.string().min(6).optional(),
})

export const blogCreateInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.string().optional(),
})

export const blogUpdateInput = z.object({
	title: z.string(),
	content: z.string(),
	id: z.string(),
	published: z.boolean(),
});

export type signinInput = z.infer<typeof signinInput>;
export type signupInput = z.infer<typeof signupInput>;
export type updateUserDetailsInput = z.infer<typeof updateUserDetailsInput>;
export type blogCreateInput = z.infer<typeof blogCreateInput>;
export type blogUpdateInput = z.infer<typeof blogUpdateInput>;