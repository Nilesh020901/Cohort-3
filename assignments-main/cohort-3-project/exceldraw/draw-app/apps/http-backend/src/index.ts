import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

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
});

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.username,
            password: parsedData.data?.password
        }
    })

    if (!user) {
        res.status(404).json({ message: "User doesn't exists" });
        return;
    }
    const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
    res.json({ token })
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = RoomSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }

    //@ts-ignore To fix it
    const userId = req.userId;
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        
        res.status(201).json({
            roomId: room.id
        })
    } catch (error) {
        res.status(411).json({
            message: "Room already exists"
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});