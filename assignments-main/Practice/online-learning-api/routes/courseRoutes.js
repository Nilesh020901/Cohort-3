const express = require("express");
const courseRouter = express.Router();
const Course = require("../config/db");
const { authMiddleware, authInstructor } = require("../middleware/authMiddleware");

courseRouter.post("/create", authMiddleware, authInstructor, async (req, res) => {
    const { title, description, content, category } = req.body;
    try {
        const newCourse = await Course.create({
            title,
            description,
            content,
            category,
            createdBy: req.user.userId,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course' });
    }
});

courseRouter.put("/update/:id", authMiddleware, authInstructor, async (req, res) => {
    const { title, description, content, category } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, category, content })
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
})