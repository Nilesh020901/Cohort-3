"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
// src/index.ts
const zod_1 = require("zod");
// Signup Schema
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// Signin Schema
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// Create Post Schema
exports.createPostInput = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    content: zod_1.z.string().min(10),
});
// Update Post Schema
exports.updatePostInput = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().min(3).max(100).optional(),
    content: zod_1.z.string().min(10).optional(),
});
