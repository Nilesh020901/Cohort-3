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
            { title, description, category, content },
            { new: title, runValidators: true }
        );

        if (!updatedCourse) {
            res.status(404).json({ message: "Course not found" });
        }

        res.status(201).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course' });
    }
});

courseRouter.delete("/delete/:id", authMiddleware, authInstructor, async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true}
        );
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(201).json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course' });
    }
});

courseRouter.get("/list", async (req,res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    try {
        const query = {
            isActive: true,
            $or: [
                { title: { $regex: search, $options: "i" }},
                { category: { $regex: search, $options: "i" }},
            ],
        };

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const courses = await Course.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(Number(limitNumber));

        const totalCourses = await Course.countDocuments(query);

        res.status(201).json({
            message: "Courses retrieved successfully",
            totalCourses,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCourses/limitNumber),
            courses,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching course' });
    }
})

module.exports = {
    courseRouter,
}