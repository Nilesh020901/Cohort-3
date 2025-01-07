import { Request, Response, Router } from "express";
import { userMiddleware } from "../middleware/user";
import { purchaseModel, courseModel } from "../db";

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req:Request, res:Response) {
    try {
        const userId = req.userId,
        const courseId = req.body.courseId //courseid user pass karega

        await purchaseModel.create({
            userId,
            courseId
        })
        res.status(200).json({
            message: "you have successfully brought the course",
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message || "Failed to buy the course"
        })
    }
})

courseRouter.get("/preview", userMiddleware, async function (_req:Request, res,Response) {
    try {
        const courses = await courseModel.find({});
        res.status(200).json({
            message: "Courses are fetched", courses
        })
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch the courses",
        })
    }
})

export { courseRouter };