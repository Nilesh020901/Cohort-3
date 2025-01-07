import { Router, Request, Response } from "express";
import { adminModel, courseModel  } from "../db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { JWT_ADMIN_PASSWORD } from "../config";
import { adminMiddleware } from "../middleware/admin";
import jwt from "jsonwebtoken";

const adminRouter = Router();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters" }),
    firstName: z.string().min(1, { message: "atleast 1 letter" }),
    lastName: z.string().min(1, { message: "atleast 1 letter" }),
})

const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "atleast 6 letters "}),
})

//Routes
adminRouter.post("/signup", async function (req: Request, res: Response) {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.json({
            message: "Signup Successfully",
        })
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "signup failed",
        })
    }
})

adminRouter.post("/signin", async function(req: Request, res: Response): Promise<any> {
    try {
        const { email, password } = SigninSchema.parse(req.body);
        const admin = await adminModel.findOne({ email });

        if (!admin || (await bcrypt.compare(password, admin.password ))) {
            return res.status(400).json({
                message: "User or Password Invalid",
            })
        }

        const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, { expiresIn: "1h" });

        res.cookie("auth_Admin", token, { httpOnly: true })
        res.status(200).json({ message: "Signin Successfully", token })
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Signin Successfully",
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function (req:Request, res:Response) {
    try {
        const adminId = req.userId; //adminMiddleware se layega userId
        const { title, description, imageUrl, price } = req.body;
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId,
        })

        res.status(200).json({ message: "Course created", courseId: course._id });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Failed to create course" });
    }
});

adminRouter.put("/course", adminMiddleware, async function (req:Request, res:Response): Promise<any> {
    try {
        const adminId = req.userId;
        const { title, description, imageUrl, price, courseId } = req.body;

        const course = await courseModel.updateOne(
            { _id: courseId, creatorId: adminId },
            { title, description, imageUrl, price }
        );

        if (course.modifiedCount === 0) {
            return res.status(404).json({
                message: "course not found or not authorized to update",
            });
        }

        res.status(200).json({ message: "Course Updated", courseId });
    } catch (error:any) {
        res.status(500).json({
            message: error.message || "Failed to update the course"
        })
    }    
});

adminRouter.get("/coursebulk", adminMiddleware, async function (req:Request, res:Response) {
    try {
        const adminId = req.body
        const courses = await courseModel.find({ creatorId: adminId })

        res.status(200).json({ message: "courses fetched", courses })
    } catch (error:any) {
        res.status(500).json({
            message: error.message || "Failed to fetch courses",
        })
    }
})

export { adminRouter };