const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    const userId = req.userId;
    const courseId = req.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.status(201).json({ message: "You have successfully bought the course" });
})

courseRouter.get("/preview", async function (req, res) {
    const courses = await courseModel.find({});
    res.status(201).json({ courses });
})

module.exports = {
    courseRouter: courseRouter
}