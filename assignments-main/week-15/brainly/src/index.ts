import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcript from "bcrypt";
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
    .regex(/())
})

app.post("/api/v1/signup", (req, res) => {
})

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