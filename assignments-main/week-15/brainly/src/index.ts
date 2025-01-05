import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { Content, User } from "./db";
//import middleware

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

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = signupSchema.parse(req.body);

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({ message: "Wrong username or password."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(403).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET,{ expiresIn: "1h" });
        return res.status(200).json({ message:"Signin Successfully", token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error during sign-in", error);
        return res.status(500).json({ message:"Internal server error."})
    }
})

const contentValidationSchema = z.object({
    type: z.enum([
        "image",
        "video",
        "article", 
        "audio", 
        "document", 
        "presentation", 
        "spreadsheet", 
        "code-snippet", 
        "ebook", 
        "podcast", 
        "webpage",
    ]),
    link: z.string().url({message: "Invalid URL format."}),
    title: z.string().min(1, { message: "Title is required." }),
    tags: z.array(z.string()).optional(),
})

app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        //check valid hai ya nahi
        const { type, link, title, tags } = contentValidationSchema.parse(req.body);
        
        //new content banao
        const newContent = await content.create({
            type,
            link,
            title,
            userId: req.userId, //userId is add by middleware
            tags: tags || [], //tags agar empty hai toh []
        });

        res.status(201).json({ message: "Content added successfully.", content: newContent });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }

        console.error("Error adding content:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        //fetch all content
        const content = await Content.find({ userId: req.userID })
        .populate("tags", "name") //populate tags details
        .select("_id type link title tags");

        //Transform content response ke liye
        const responseContent = content.map((item) => ({
            id: item._id,
            type: item.type,
            link: item.link,
            title: item.title,
            tags: item.tags,
        }));

        res.status(200).json({ content: responseContent });
    } catch (error) {
        console.error("Error fetching content:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

app.post("/api/v1/brain/share", userMiddleware, (req: Request, res: Response): Promise<any> => {
    try {
        const { contentId } = req.body;

        //validate
        if(!contentId) {
            return res.status(404).json({ message: "Content not found." })
        }

        //check content user ka hai
        if (content.userId.toString() != req.userId) {
            return res.status(403).json({ message: "You do not have permission to delete this content." });
        }

        await Content.findByIdAndDelete(contentId);
        res.status(200).json({ message: "Content Deleted Succesfully"})
    } catch (error) {
        console.error("Error delete content: ", error);
        return res.status(500).json({ message: "Internal server error." })
    }
})

app.post("/api/v1/brain/:shareLink", (req, res) => {
    
})