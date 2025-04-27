const express = require("express");
const { protect } = require("../middleware/protect");
const userrouter = express.Router();
const blogModel = require("../config/db");
const userModel = require("../config/db");

userrouter.get("/profile", protect, async function () {
    try {
        const userId = req.user._id;

        const user = await userModel.findById(userId).select("-password");

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blogs = await blogModel.find({ user: userId });

        let totalLikes = 0;
        blogs.forEach(blog => {
            totalLikes += blog.likes.length();
        });

        res.status(200).json({
            user,
            totalBlogs: blogs.length,
            totalLikes,
            blogs
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = {
    userrouter
}