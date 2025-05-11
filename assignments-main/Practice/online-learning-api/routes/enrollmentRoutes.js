const express = require("express");
const Enrollment = require("../config/db");
const { authMiddleware } = require("../middleware/authMiddleware");
const enrollmentRouter = express.Router();

enrollmentRouter.post("enroll", authMiddleware, async (req, res) => {
    const { courseId } = req.body;
    try {
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.userId,
            course: courseId,
        });

        if (existingEnrollment) {
            return res.status(404).json({ message: "Already Enrolled" });
        }

        const enrollment = await Enrollment.create({
            student: req.user.userId,
            course: courseId,
        });

        res.status(201).json({ message: "Enrolled Successfully", enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Enrollment failed' });
    }
});

enrollmentRouter.patch("/progress/:courseId", authMiddleware, async (req, res) => {
    const { progress } = req.body;
    try {
        const enrollment = await Enrollment.findOneAndUpdate(
            { student: req.user.userId, course: req.params.courseId },
            { progress: Math.min(progress, 100), completed: progress >= 100 },
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        res.status(201).json({ message: "Progress updated successfully", enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress' });
    }
});

enrollmentRouter.get("/my-course", async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user.userId }).populate("course", "title description category").select("-__v");
        res.status(201).json({ message: "Enrolled courses retrived", enrollments });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error: error.message });
    }
});

enrollmentRouter.delete("/leave/:courseId", authMiddleware, async (req, res) => {
    try {
        const enrollment = await Enrollment.findOneAndDelete({
            student: req.user.userId,
            course: courseId,
        });

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(201).json({ message: "Successfully left the course" });
    } catch (error) {
        res.status(500).json({ message: 'Error leaving course' });
    }
});

module.exports = {
    enrollmentRouter
}