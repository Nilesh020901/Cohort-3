"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateInput = exports.blogCreateInput = exports.updateUserDetailsInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.updateUserDetailsInput = zod_1.z.object({
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6).optional(),
});
exports.blogCreateInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.string().optional(),
});
exports.blogUpdateInput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
    published: zod_1.z.boolean(),
});
