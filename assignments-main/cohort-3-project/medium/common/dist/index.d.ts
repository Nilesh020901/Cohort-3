import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const updateUserDetailsInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    password?: string | undefined;
    name?: string | undefined;
}, {
    password?: string | undefined;
    name?: string | undefined;
}>;
export declare const blogCreateInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published?: string | undefined;
}, {
    title: string;
    content: string;
    published?: string | undefined;
}>;
export declare const blogUpdateInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    id: string;
}, {
    title: string;
    content: string;
    published: boolean;
    id: string;
}>;
export type signinInput = z.infer<typeof signinInput>;
export type signupInput = z.infer<typeof signupInput>;
export type updateUserDetailsInput = z.infer<typeof updateUserDetailsInput>;
export type blogCreateInput = z.infer<typeof blogCreateInput>;
export type blogUpdateInput = z.infer<typeof blogUpdateInput>;
