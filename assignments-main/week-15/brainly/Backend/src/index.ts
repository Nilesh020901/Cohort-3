import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ContentModel, UserModel, LinkModel } from "./db";
import { userMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Validation Schemas
const signupSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(16)
    .regex(/(?=.*[a-z])/, "Lowercase required.")
    .regex(/(?=.*[A-Z])/, "Uppercase required.")
    .regex(/(?=.*\d)/, "Number required.")
    .regex(/(?=.*[!@#$%&*])/, "Special character required.")
});

const contentSchema = z.object({
  type: z.enum(["image", "video", "article", "audio", "document", "presentation", "spreadsheet", "code-snippet", "ebook", "podcast", "webpage"]),
  link: z.string().url(),
  title: z.string().min(1),
  tags: z.array(z.string()).optional()
});

// Signup Route
app.post("/api/v1/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = signupSchema.parse(req.body);

    if (await UserModel.findOne({ username })) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ username, password: hashedPassword });

    res.json({ message: "User signed up" });
  } catch (error) {
    res.status(400).json({ errors: error instanceof z.ZodError ? error.errors : "Internal server error." });
  }
});

// Signin Route
app.post("/api/v1/signin", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = signupSchema.parse(req.body);
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ errors: error instanceof z.ZodError ? error.errors : "Internal server error." });
  }
});

// Add Content
app.post("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  try {
    const { type, link, title, tags } = contentSchema.parse(req.body);
    const newContent = await ContentModel.create({
      type,
      link,
      title,
      userId: req.userId,
      tags: tags || []
    });

    res.json({ message: "Content added", content: newContent });
  } catch (error) {
    res.status(400).json({ errors: error instanceof z.ZodError ? error.errors : "Internal server error." });
  }
});

// Get User Content
app.get("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  try {
    const content = await ContentModel.find({ userId: req.userId }).populate("userId", "username");
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Delete Content
app.delete("/api/v1/content", userMiddleware, async (req: Request, res: Response) => {
  try {
    const { contentId } = req.body;
    await ContentModel.deleteOne({ _id: contentId, userId: req.userId });
    res.json({ message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Share Link
app.post("/api/v1/brain/share", userMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { share } = req.body;
    if (share) {
      let link = await LinkModel.findOne({ userId: req.userId });
      if (!link) {
        link = await LinkModel.create({ userId: req.userId, hash: Math.random().toString(36).substring(2, 12) });
      }
      return res.json({ hash: link.hash });
    }
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Link removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get Shared Content
app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response): Promise<any> => {
  try {
    const { shareLink } = req.params;
    const link = await LinkModel.findOne({ hash: shareLink });

    if (!link) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    const content = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findById(link.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username: user.username, content });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));