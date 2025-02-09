import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, RoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    
    const valid = CreateUserSchema.safeParse(req.body);
    if(!valid.success) {
        res.status(404).json({ message: "Invalid Inputs" });
        return;
    }

    const { username, password, name, photo} = valid.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
           data: {
            username,
            password: hashedPassword,
            name,
            photo: photo || ""
           },
        })
    } catch (error) {
        
    }
})

app.post("/signin", async (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if(!data) {
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