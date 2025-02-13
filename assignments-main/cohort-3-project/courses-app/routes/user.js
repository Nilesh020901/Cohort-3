const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const brcypt = require("brcypt");
const { userModel } = require("../../../week-8/course-selling-app/db");
const { JWT_USER_PASSWORD } = require("../../../week-8/course-selling-app/config");
const { userMiddleware } = require("../../../week-8/course-selling-app/middleware/user");


const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "minimum 6 letters require"}),
    firstName: z.string().min(3, { message: "Atleast 3 letter require"}),
    lastName: z.string().min(3, { message: "Atleast 3 letters require"})
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {message: "Atleast 3 letter require"})
});

userRouter.post("/sigup", async (req, res) => {
    try {
        const {email, password, firstName, lastName} = signupSchema.parse(req.body);

        const hashedPassword = await brcypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        })

        res.json({
            message: "Signup Succeeded",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Signup failed"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    try {
        const {email, password} = signinSchema.parse(req.body);

        const user = await userModel.findOne({email});
        if (!user || !(await brcypt.compare(password, user.hashedPassword))) {
            return res.status(403).json({
                message: "Incorrect credentials or user not found",
            })
        }

        const token = jwt.sign({id: user._id}, JWT_USER_PASSWORD, {expiresIn: "1h"});

        res.cookie("auth_token", token, {httpOnly: true});
        res.json({
            message: "signin successfull",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Signin failed",
        })
    }
})

userRouter.get("/purchase", userMiddleware, async (req, res) => {
    try {
        res.json({
            message: "Purchase successfull",
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || "Purchase failed",
        })
    }
})

module.exports = {
    userRouter,
}