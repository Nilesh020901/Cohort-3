const express = require("express");
const { protect } = require("../middleware/protect");
const blogrouter = express.Router();
const { blogModel } = require("../config/db");

blogrouter.post("/create", protect, async function (req, res) {
    try {
        const { title, body } = req.body;

        const blog = new Blog({
            title,
            body,
            user: req.user._id
        });
        await blogModel.save();
        res.status(201).json({ message: "Blog Created", blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

blogrouter.get("/all", async function (req, res) {
    try {
        const pageSize = 5;
        const page = Number(req.query.page) || 1;
        const keyword = req.query.keyword ? {
            title: { $regex: req.query.keyword, $options: "i"},
        } : {};

        const count = await blogModel.countDocuments({ ...keyword });

        const blogs = await blogModel.find({ ...keyword }).populate("user", "username email").limit(pageSize).skip(pageSize * (page-1));

        res.status(200).json({ 
            message: "All blog fetched", 
            blogs,
            page,
            pages: Math.ceil(count / pageSize),
            totalBlogs: count
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

blogrouter.put("/update/:id", protect, async function (req, res) {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this blog' });            
        }

        blog.title = req.body.title || blog.title;
        blog.body = req.body.body || blog.body;

        const updateBlog = await blog.save();
        res.status(200).json({ message: "Updated Blog", updateBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

blogrouter.delete("/delete/:id", protect, async function () {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.user.toString() || req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this blog' });
        }

        await blog.remove();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

blogrouter.put("/like/:id", protect, async function (req, res) {
    try {
        const blog = await blogModel.findById(req.params.id);

        if(!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const userId = req.user._id;

        if(blog.likes.includes(userId)) {
            //unlike
            blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
        } else {
            //like
            blog.likes.push(userId);
        }

        await blog.save();

        res.status(200).json({ message: "Blog liked/unliked", likes: blog.likes.length });
    } catch (error) {
        res.status(500).json({ message: "Server error"})
    }
})

blogModel.post("/comment/:id", protect, async function (req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = {
            user: req.user._id,
            text: req.body.text
        }

        blog.comments.push(comment);
        await blog.save();

        res.status(200).json({ message: "Comment added", comments: blog.comments });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})
module.exports = {
    blogrouter
}