import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }
    try {
        const user = await prismaClient.user.create({
           data: {
            email: parsedData.data?.username,
            password: parsedData.data?.password,
            name: parsedData.data?.name,
           },
        });
        
        res.status(201).json({ 
            userId: user.id,
            message: "You are Signed-up"});
    } catch (error) {
        res.status(404).json({ message: "User already exists"});
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }

    

    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token })
})

app.post("/room", middleware, async (req, res) => {
    const data = RoomSchema.safeParse(req.body);
    if(!data) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }
})

app.listen(3001);