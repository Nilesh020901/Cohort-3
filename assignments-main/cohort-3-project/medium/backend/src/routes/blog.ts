import { Router } from 'express';
import { auth } from '../middleware/auth';
import { prismaClient } from '../prisma';

const router = Router();

//get all blogs
router.get("/bulk", async (req, res) => {
    try {
        const posts = await prismaClient.post.findMany();
        res.status(200).json(posts);
        return;
    } catch (error) {
        console.error("Blog Error:", error);
        res.status(403).json({ error: "Error while fetching blogs" });
        return;
    }
});
//create a blog
router.post("/createblog", auth, async (req, res) => {
    const { title, content } = req.body;
    console.log(title, content);
    const userId = req.userId as string;

    if (!title || !content) {
        res.status(400).json({ error: "Please provide title and content" });
        return;
    }

    try {
        const post = await prismaClient.post.create({
            data: {
                title,
                content,
                authorId: userId,
            },
        });

        res.status(201).json({ id: post.id });
        return;
    } catch (error) {
        console.error("Blog Error:", error);
        res.status(403).json({ error: "Error while creating blog" });
        return;
        
    }});

//update a blog
router.put("/updateblog", auth, async (req, res) => {
    const userId = req.userId as string;
    const { id, title, content } = req.body;

    try {
        const updatedPost = await prismaClient.post.update({
            where: {
                id: id,
                authorId: userId,
            },
            data: {
                title: title,
                content: content,
            }
        });

        res.status(200).json({ message: "Blog updated successfully", post: updatedPost });
        return;
    } catch (error) {
        console.error("Blog Error:", error);
        res.status(403).json({ error: "Error while updating blog" });
        return;
    }});

//get a single blog
router.get("/:id", auth,  async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prismaClient.post.findUnique({
            where: { id },
        });

        if (!post) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }

        res.status(200).json(post);
        return;
    } catch (error) {
        console.error("Blog Error:", error);
        res.status(403).json({ error: "Error while fetching blog" });
        return;
    }});

//get all blogs



export default router;

