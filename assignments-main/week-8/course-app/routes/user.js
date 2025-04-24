const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const brcypt = require("brcypt");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
    firstName:z.string().min(1, { message: "atleat 1 letters" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
})