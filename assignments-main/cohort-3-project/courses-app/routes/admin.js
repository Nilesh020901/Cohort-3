const { Router } = require("express");
const adminRouter = Router();
const { adminRouter } = require("../middleware/adminMiddleware");
const { z } = require("zod");
const brcypt = require("brcypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminModel, courseModel } = require("../db");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z.string().min(3, { message: "First name must be at least 3 character long" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 character long" })
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

adminRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);

        const hashedPassword = await brcypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({
            message: "Signup succeeded"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Signup failed"
        });
    }
});


module.exports = {
    adminRouter,
}