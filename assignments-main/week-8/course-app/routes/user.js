const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const brcypt = require("brcypt");
const { userModel, purchaseModel, courseModel } = require("../db");


const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
    firstName:z.string().min(1, { message: "atleat 1 letters" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
})

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minmum 6 letters hone chaiye hai" }),
})

userRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(404).json({ message: "Account already exists" });
        }

        const hashedPassword = await brcypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = jwt.sign({})
        res.status(201).json({ message: "Signup Succeeded" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

userRouter.post("/signin", async function (req, res) {
    
})

userRouter.get("/purchase", async function (req, res) {
    
})

module.exports = {
    userRouter,
}