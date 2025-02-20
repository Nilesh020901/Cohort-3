import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {

	const parsedData = CreateUserSchema.safeParse(req.body);
	if (!parsedData.success) {
		res.status(404).json({ message: "Incorrect Input" });
		return;
	}
	try {
		const user = await prismaClient.user.create({
			data: {
				email: parsedData.data?.username,
				// TODO: Hash the pw
				password: parsedData.data.password,
				name: parsedData.data.name
			}
		})
		res.status(201).json({ userId: user.id })
	} catch(e) {
		res.status(404).json({ message: "User already exists with this username" })
	}
})

app.post("/signin", async (req, res) => {

	const parsedData = SigninSchema.safeParse(req.body);
	if (!parsedData.success) {
		res.status(404).json({ message: "Incorrect Input" });
		return;
	}
	try {
		// TODO: Compare the hashed pws here
		const user = await prismaClient.findFirst({
			where: {
				email: parsedData.data.username,
				password: parsedData.data.password,
			}
		})

		if (!user) {
			res.status(404).json({ message: "Not Authorized" });
			return;
		}

		const token = jwt.sign({ userId: user?.id}, JWT_SECRET);
		res.status(201).json({ message: "You are Signin", token })
	} catch(e) {
		res.status(501).json({ message: "Internal Server Error" });
	}
})

app.post("/room", middleware, async (req, res) => {
	const parsedData = CreateRoomSchema.safeParse(req.body);
	if (!parsedData.success) {
		res.status(404).json({ message: "Incorrect Input" });
		return;
	}
	// @ts-ignore: TODO: Fix this
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
	} catch(e) {
		res.status(411).json({ message: "Room already exists with this name" });
	}
})

app.get("/chat:roomId", async (req, res) => {
	try {
		const roomId = Number(req.params.roomId);
		const message = await prismaClient.chat.findMany({
			where: {
				roomId: roomId
			},
			orderBy: {
				id: "desc"
			},
			take: 1000
		});
		res.status(201).json({ messages });
	} catch(e) {
		res.json({
			messages: []
		})
	}
})

app.get("/room/:slug", async (req, res) => {
	try {
		const slug = req.params.slug;
		const room = await prismaClient.room.findFirst({
			where: {
				slug
			}
		});

		res.status(201).json({ room })
	} catch(e) {
		res.status(501).json({ message: "Internal Server Error" })
	}
})

app.listen(3001)