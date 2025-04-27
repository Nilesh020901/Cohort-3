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
        const blogs = await blogModel.find().populate("user", "username email");
        res.status(200).json({ message: "All blog fetched", blogs });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = {
    blogrouter
}