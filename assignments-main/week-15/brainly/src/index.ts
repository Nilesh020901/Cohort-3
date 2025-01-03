import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "./db";

const app = express();
app.use(express.json());

// Define Zod schema for validation
const signupSchema = z.object({
    username: z.string()
    .min(3, { message: "Username should be at least 3 characters." })
    .max(10, { message:"Username should not exceed 10 characters." }),
    password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(16, { message: "Password must not exceed 16 characters."})
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter.")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
    .regex(/(?=.*\d)/, "Password must contain at least one number.")
    .regex(/(?=.*[!@#$%&*])/,"Password must contain at least one special character."),
});

//Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.post("/api/v1/signup", async (req: Request, res: Response): Promise<any> => {
    try {
       // Validate input with Zod
       const { username, password } = signupSchema.parse(req.body);

       // Check if user already exists
       const existingUser = await User.findOne({ username });
       if (existingUser) {
        return res.status(403).json({ message: "User already exists with this username."});
       }

       // Hash password and create user
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({ username, password: hashedPassword });
       await newUser.save();

       // Generate JWT token
       const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {expiresIn: "1h"});
       return res.status(200).json({ message: "Signed up successfully.", token });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(411).json({ errors: error.errors });
        }

        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Server error." });
    }
});

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.post("/api/v1/brain/:shareLink", (req, res) => {

})