import express from "express";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../authMiddleware";
//import from zod and install moment-timezone
import * as moment from "moment-timezone";

const router = express.Router();
router.use(authMiddleware);
const prisma = new PrismaClient().$extends(withAccelerate());

router.post("/", async (req, res) => {
    const body = req.body;
    const { success } = blogCreateInput.safeParse(body);
    if (!success) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    try {
        const indianTime = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: body.authorId,
                postedOn:  indianTime,
                published: body.published,
            },
        });
        res.status(201).json({ message: "Blog created successfully" + blog.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
});

router.put("/", async (req, res) => {
    const body = req.body;
    const { success } = blogUpdateInput.safeParse(body);
    if (!success) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }
    try {
        const blog = await prisma.post.update({
            where: { id: body.id, authorId: req.userId },
            data: {
                title: body.title,
                content: body.content,
                authorId: body.authorId,
                published: body.published,
            },
        });
        res.status(200).json({ message: "Blog updated succesfully" + blog.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})

router.get("/bulk", async (req, res) => {
    try {
        const blogs = await prisma.post.findMany({
            where: { published: true },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
                postedOn: true,
                published: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/both", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                posts: true,
            }
        });
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                postedOn: true,
                published: true,
                authorId: true,
                author: {
                    select: {
                        name:true,
                    }
                },
            }
        });
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json({ blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id, authorId: req.userId },
        });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }

})

export default router;

