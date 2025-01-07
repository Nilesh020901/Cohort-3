import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import JWT_USER_PASSWORD from "../config";
import { userMiddleware } from "../middleware/user";
import jwt from "jsonwebtoken";
import { userModel, courseModel, purchaseModel } from "../db";
const userRouter = Router();
import { courseRouter } from "./course"

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters" }),
    firstName: z.string().min(1, { message: "atleat 1 letters" }),
    lastName: z.string().min(1, { message: "atleast 1 letters" }),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters" }),
});

userRouter.post("/signup", async (req:Request, res:Response) => {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        res.status(200).json({
            message: "Successfully Signup",
        })
    } catch (error:any) {
        res.status(500).json({
            message: "Signup Failed",
        })
    }
})

userRouter.post("/signin", async (req:Request, res:Response): Promise<any> => {
    try {
        const { email, password } = signinSchema.parse(req.body)
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                message: "Incorrect Value",
            })
        }

        const token = jwt.sign({ id: user._id}, JWT_USER_PASSWORD, { expiresIn: "1h" });
        res.cookie("auth_token", token, { httpOnly: true }),
        res.status(200).json({
            message: "Succesfully Signin", token
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message || "Succesfully Signin"
        })
    }
})

userRouter.get("/purchase", userMiddleware, async (req:Request, res:Response) => {
    try {
        const userId = req.body
        const purchases = await purchaseModel.find({ userId })

        const purchasedCourseIds = purchases.map((purchase) => purchase.courseId);

        const courseData = await courseModel.find({
            _id: { $in: purchasedCourseIds },
        });
        res.json({
            message: "Purchases fetched successfully",
            purchases,
            courses: courseData
        })
    } catch (error:any) {
        res.status(500).json({
            message: error.message || "Failed to fetch purchases",
        });
    }
});

export { userRouter };